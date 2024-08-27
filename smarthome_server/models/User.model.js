import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Provide unique username'],
    unique: [true, 'Username exists'],
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
  },
  email: {
    type: String,
    required: [true, 'Provide unique email address'],
    unique: [true, 'Email exists'],
  },
  firstName: { type: String },
  lastName: { type: String },
  profileImg: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Profile_placeholder.png',
  },
  role: {
    type: String,
    default: 'parent',
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;