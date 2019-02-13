import mongoose, { Schema } from 'mongoose';

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
        enum: ['Assigned', 'Cancelled', 'Completed']
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    }
});

const model = mongoose.model('taskmapping', taskmappingSchema);

export default model;