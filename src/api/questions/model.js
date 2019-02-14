import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    explanation: {
        type: String
    },
    correctAnswer: {
        type: String
    },
    question: {
        type: String
    },
    options: [
        {
          label: {
              type: String
          },
          value: {
            type: String
          }
        }
    ]
}, { timestamps: true });

const model = mongoose.model('Quetions', questionSchema);

export default model;