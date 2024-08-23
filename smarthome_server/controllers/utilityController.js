import Utility from '../models/Utility.model.js';

// @desc        Create New Utility (Create)
// @route       POST /api/utilities
// @access      Private
export const createUtility = async (req, res) => {
  try {
    const { type, room, value } = req.body;

    const newUtility = new Utility({
      type: type,
      room: room,
      value: value,
    });

    newUtility
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Utility created successfully!',
          utility: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the utility: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createUtility: ' + error,
    });
  }
};

// @desc        Get All Utilities (Read)
// @route       GET /api/utilities
// @access      Private
export const getUtilities = async (req, res) => {
  try {
    const utilities = await Utility.find({})
      .populate('type')
      .populate('room')
      .exec();

    if (!utilities) {
      return res.status(404).send({
        message: 'No utilities found',
      });
    }

    return res.status(200).send(utilities);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getUtilities: ' + error,
    });
  }
};

// @desc        Get All Utilities (Read)
// @route       GET /api/utilities/byType/:typeId
// @access      Private
export const getUtilitiesByType = async (req, res) => {
  const { typeId } = req.params;

  try {
    const utilities = await Utility.find({ type: typeId })
      .populate('type')
      .populate('room')
      .exec();

    if (!utilities) {
      return res.status(404).send({
        message: 'No utilities found',
      });
    }

    return res.status(200).send(utilities);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getUtilitiesByType: ' + error,
    });
  }
};

// @desc        Get All Utilities (Read)
// @route       GET /api/utilities/byRoom/:roomId
// @access      Private
export const getUtilitiesByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const utilities = await Utility.find({ room: roomId })
      .populate('type')
      .populate('room')
      .exec();

    if (!utilities) {
      return res.status(404).send({
        message: 'No utilities found',
      });
    }

    return res.status(200).send(utilities);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getUtilitiesByRoom: ' + error,
    });
  }
};

// @desc        Get Single Utility (Read)
// @route       GET /api/utilities/:id
// @access      Private
export const getUtility = async (req, res) => {
  const { id } = req.params;

  try {
    Utility.findOne({ _id: id }, (err, utility) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the utility: ' + err,
        });
      }

      if (!utility) {
        return res.status(404).send({
          error: 'No utility found',
        });
      }

      return res.status(200).send(utility);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getUtility: ' + error,
    });
  }
};

// @desc        Update Utility (Update)
// @route       PUT /api/utilities/:id
// @access      Private
export const updateUtility = async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;
    Utility.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Utility information updated',
        utility: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while updating updateUtility: ' + error,
    });
  }
};

// @desc        Delete Utility (Delete)
// @route       DELETE /api/utilities/:id
// @access      Private
export const deleteUtility = async (req, res) => {
  try {
    await Utility.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Utility deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while deleteUtility: ' + error,
    });
  }
};