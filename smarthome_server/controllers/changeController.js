import Change from '../models/Change.model.js';

// @desc        Create New Change (Create)
// @route       POST /api/changes
// @access      Private
export const createChange = async (req, res) => {
  try {
    const { text, utility, user, date } = req.body;

    const newChange = new Change({
      text: text,
      utility: utility,
      user: user,
      date: date,
    });

    newChange
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Change created successfully!',
          change: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the change: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createChange: ' + error,
    });
  }
};

// @desc        Get All Changes (Read)
// @route       GET /api/changes
// @access      Private
export const getChanges = async (req, res) => {
  try {
    const changes = await Change.find({});

    if (!changes) {
      return res.status(404).send({
        message: 'No changes found',
      });
    }

    return res.status(200).send(changes);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getChanges: ' + error,
    });
  }
};

// @desc        Delete Change (Delete)
// @route       DELETE /api/changes/:id
// @access      Private
export const deleteChange = async (req, res) => {
  try {
    await Change.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Change deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while deleteChange: ' + error,
    });
  }
};