import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { transporter, MailGenerator } from '../utils/mailer.js';

// @desc        Register New User (Create)
// @route       POST /api/auth/register
// @access      Public
export const regiter = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const usernameExists = new Promise((resolve, reject) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'User with this username already exists.' });
        resolve();
      });
    });

    const emailExists = new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'User with this email already exists.' });
        resolve();
      });
    });

    Promise.all([usernameExists, emailExists])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const newUser = new User({
                username: username,
                password: hashedPassword,
                email: email,
              });

              newUser
                .save()
                .then((result) =>
                  res.status(201).send({
                    message: 'User registered successfully!',
                    user: result,
                  })
                )
                .catch((error) => {
                  res.status(500).send({
                    error:
                      'Something went wrong while creating the user: ' + error,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Password hashing went wrong: ' + error,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error: 'User already exists: ' + error });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while registering the user: ' + error,
    });
  }
};

// @desc        Login User
// @route       POST /api/auth/login
// @access      Public
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    User.findOne({ username: username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({
                error: 'Password does not match',
              });
            }

            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '24h',
              }
            );

            return res.status(200).send({
              message: `${user.username} logged in successfully!`,
              username: user.username,
              token: token,
            });
          })
          .catch((error) => {
            return res.status(400).send({
              error: 'Password does not match: ' + error,
            });
          });
      })
      .catch((error) => {
        return res.status(404).send({
          error: 'User not found: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while logging in the user: ' + error,
    });
  }
};

// @desc        Get Users (Read)
// @route       GET /api/auth/users
// @access      Private
export const getUsers = async (req, res) => {
  try {
    User.find((err, users) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching users: ' + err,
        });
      }

      if (!users) {
        return res.status(501).send({
          error: 'Could not find users',
        });
      }

      return res.status(200).send(users);
    });
  } catch (error) {
    return res.status(404).send({
      error: 'Users not found: ' + error,
    });
  }
};

// @desc        Get User By Username (Read)
// @route       GET /api/auth/users/:username
// @access      Private
export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(501).send({
        error: 'Invalid username',
      });
    }

    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the user: ' + err,
        });
      }

      if (!user) {
        return res.status(501).send({
          error: 'Could not find the user',
        });
      }

      const { password, ...rest } = user;

      return res.status(200).send(rest._doc);
    });
  } catch (error) {
    return res.status(404).send({
      error: 'User not found: ' + error,
    });
  }
};

// @desc        Update User Information (Update)
// @route       PUT /api/auth/users
// @access      Authorized
export const updateUserInfo = async (req, res) => {
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;
      User.updateOne({ _id: userId }, body, (err, data) => {
        if (err) throw err;

        return res.status(201).send({
          message: 'User information updated',
          user: data,
        });
      });
    } else {
      return res.status(401).send({
        error: 'No ID provided: ' + error,
      });
    }
  } catch (error) {
    return res.status(401).send({
      error: 'Something went wrong while updating user data: ' + error,
    });
  }
};

// @desc        Update User (Update)
// @route       PUT /api/auth/users/:id
// @access      Private
export const updatUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (userId) {
      const body = req.body;
      User.updateOne({ _id: userId }, body, (err, data) => {
        if (err) throw err;

        return res.status(201).send({
          message: 'User information updated',
          user: data,
        });
      });
    } else {
      return res.status(401).send({
        error: 'No ID provided: ' + error,
      });
    }
  } catch (error) {
    return res.status(401).send({
      error: 'Something went wrong while updating user data: ' + error,
    });
  }
};

// @desc        Generate OTP (Read)
// @route       GET /api/auth/generateOTP
// @access      Private
export const generateOTP = async (req, res) => {
  const code = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  req.app.locals.OTP = code;

  res.status(201).send({ code: code });
};

// @desc        Verify OTP (Read)
// @route       GET /api/auth/verifyOTP
// @access      Private
export const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;

    return res.status(201).send({ message: 'OTP Verified Successfully' });
  }

  return res.status(400).send({
    error: 'Invalid OTP',
  });
};

// @desc        Create Reset Session (Create)
// @route       GET /api/auth/createResetSession
// @access      Public
export const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).send({
      flag: req.app.locals.resetSession,
    });
  }

  return res.status(440).send({
    message: 'Session Expired.',
  });
};

// @desc        Reset Password (Update)
// @route       GET /api/auth/resetPassword
// @access      Private
export const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({
        message: 'Session Expired.',
      });
    }

    const { username, password } = req.body;

    try {
      User.findOne({ username: username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              User.updateOne(
                { username: user.username },
                { password: hashedPassword },
                (error, data) => {
                  if (error) throw error;
                  req.app.locals.resetSession = false;
                  return res.status(201).send({
                    message: 'Password Updated',
                    data: data,
                  });
                }
              );
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Something went wrong while hashing password: ' + error,
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({
            error: 'User not found: ' + error,
          });
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Something went wrong while resetting the password: ' + error,
      });
    }
  } catch (error) {
    return res.status(401).send({
      error: 'Something went wrong: ' + error,
    });
  }
};

// @desc        Sending Mail
// @route       POST /api/auth/mail
// @access      Public
export const sendMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Email Body
  let email = {
    body: {
      name: username || 'SmartHome Assistant',
      intro:
        text ||
        'Welcome to SmartHome Assistant! Your account will be verified in a bit.',
      outro:
        'Need help? Just reply to this email and we will come back to you as soon as possible!',
    },
  };

  let emailBody = MailGenerator.generate(email);
  let message = {
    from: process.env.GMAIL_EMAIL,
    to: userEmail,
    subject: subject || 'SmartHome Assistant',
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).send({
        message: 'You should receive an email.',
      });
    })
    .catch((error) => {
      return res.status(500).send({
        error: 'Something went wrong while sending an email: ' + error,
      });
    });
};