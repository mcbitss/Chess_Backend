import mongoose, { Schema } from 'mongoose';
var CounterSchema = Schema({
  collectionName: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  },
  id: {
    type: Schema.Types.ObjectId
  }
});
export default mongoose.model('Counters', CounterSchema);
