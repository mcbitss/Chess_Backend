import mongoose, { Schema } from 'mongoose'

const questionSchema = new Schema({
    question: {
        type: String
    },
    options: {
        type : [Object]
    },
    image: {
        type: String
    },
    correctAnswer: {
        type: String
    },
    category: {
        type: String
    },
    country: {
        type: String
    },
    language:{
        type: String
    },
    explanation: {
        type: String
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'inActive']
    },
    isValid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

questionSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        question: this.question,
        options: this.options,
        image: this.image,
        correctAnswer: this.correctAnswer,
        category: this.category,
        country: this.country,
        language: this.language,
        explanation: this.explanation,
        status: this.status,
        isValid: this.isValid
      }
      return view;
    }
  }

const model = mongoose.model('Questions', questionSchema)

export const schema = model.schema
export default model