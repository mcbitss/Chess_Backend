import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    sequenceNumber: {
        type: Number
    },
    status: {
        type: String,
        enum: ['assigned', 'cancelled', 'completed']
    },
    taskType: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
});

const model = mongoose.model('task', taskSchema);

export default model;