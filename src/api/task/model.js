import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
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
    }
});

const model = mongoose.model('task', taskSchema);

export default model;