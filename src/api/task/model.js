import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    number: {
        type: Number
    },
    name: {
        type: String,
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

const model = mongoose.model('task', taskSchema);

export default model;