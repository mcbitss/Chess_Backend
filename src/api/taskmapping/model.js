import mongoose, { Schema } from 'mongoose';
// import Counters from '../counter/model';

const taskmappingSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  sequencenumber: {
    type: Number
  },
  taskStatus: {
    type: String,
    enum: ['Assigned', 'Cancelled', 'Completed', 'Upcoming']
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  completedDate: {
    type: Date
  }
});

// taskmappingSchema.pre('save', function(next) {
//   Counters.findOneAndUpdate(
//     {
//       collectionName: 'taskmappings',
//       id: this.username
//     },
//     { $inc: { seq: 1 }, id: this.username },
//     { upsert: true, new: true },
//     (err, counter) => {
//       if (err) {
//         return next(err);
//       } else {
//         this.sequencenumber = counter.seq;
//       }
//       next();
//     }
//   );
// });

const model = mongoose.model('taskmapping', taskmappingSchema);

export default model;
