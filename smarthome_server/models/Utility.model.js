import mongoose from 'mongoose';

const UtilitySchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Type',
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  value: {
    type: String,
    required: true,
  },
  childrenAllowed: {
    type: Boolean,
    default: false,
  },
});

const Utility = mongoose.model('Utility', UtilitySchema);
export default Utility;