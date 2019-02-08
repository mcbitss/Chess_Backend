import mongoose, { Schema } from 'mongoose'

const frequentlyAskedQuestionSchema = new Schema({
    question: {
        type: String
    },
    answer: {
        type : String
    }
}, {
    timestamps: true
});

frequentlyAskedQuestionSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        question: this.question,
        answer: this.answer
      }
      return view;
    }
  }

const model = mongoose.model('FrequentlyAskedQuestions', frequentlyAskedQuestionSchema)

export const schema = model.schema
export default model