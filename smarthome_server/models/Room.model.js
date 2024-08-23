import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide unique room name'],
    unique: [true, 'Room exists'],
  },
  image: {
    type: String,
    required: [true, 'Provide room image'],
  },
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;