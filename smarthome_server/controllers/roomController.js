import Room from '../models/Room.model.js';

// @desc        Create New Room (Create)
// @route       POST /api/rooms
// @access      Private
export const createRoom = async (req, res) => {
  try {
    const { name, image } = req.body;

    const newRoom = new Room({
      name: name,
      image: image,
    });

    newRoom
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Room created successfully!',
          room: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the room: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createRoom: ' + error,
    });
  }
};

// @desc        Get All Rooms (Read)
// @route       GET /api/rooms
// @access      Private
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});

    if (!rooms) {
      return res.status(404).send({
        message: 'No rooms found',
      });
    }

    return res.status(200).send(rooms);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getRooms: ' + error,
    });
  }
};

// @desc        Get Single Room (Read)
// @route       GET /api/rooms/:id
// @access      Private
export const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    Room.findOne({ _id: id }, (err, room) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the room: ' + err,
        });
      }

      if (!room) {
        return res.status(404).send({
          error: 'No room found',
        });
      }

      return res.status(200).send(room);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getRoom: ' + error,
    });
  }
};

// @desc        Update Room (Update)
// @route       PUT /api/rooms/:id
// @access      Private
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;
    Room.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Room information updated',
        room: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while updating updateRoom: ' + error,
    });
  }
};

// @desc        Delete Room (Delete)
// @route       DELETE /api/rooms/:id
// @access      Private
export const deleteRoom = async (req, res) => {
  try {
    await Room.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Room deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while deleteRoom: ' + error,
    });
  }
};