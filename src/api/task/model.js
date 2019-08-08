import mongoose, { Schema } from 'mongoose';
import Counters from '../counter/model';

const taskSchema = new Schema({
  number: {
    type: Number
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  taskType: {
    type: String
  },
  content: {
    type: String
  },
  quizAvailable: {
    type: String,
    enum: ['Yes', 'No']
  },
  status: {
    type: String,
    enum: ['Active', 'inActive'],
    default: 'Active'
  }
});

taskSchema.pre('save', function(next) {
  Counters.findOneAndUpdate(
    {
      collectionName: 'tasks'
    },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    (err, counter) => {
      if (err) {
        return next(err);
      } else {
        this.number = counter.seq;
      }
      next();
    }
  );
});

const model = mongoose.model('task', taskSchema);

export default model;
