import mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide unique type name'],
    unique: [true, 'Type exists'],
  },
  valueType: {
    type: String,
    required: [true, 'Provide type value'],
  },
});

const Type = mongoose.model('Type', TypeSchema);
export default Type;