import mongoose from 'mongoose';

const ChangeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  utility: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Utility',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
  },
});

const Change = mongoose.model('Change', ChangeSchema);
export default Change;