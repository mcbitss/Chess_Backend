import mongoose, { Schema } from 'mongoose'

const questionTranslationSchema = new Schema({
    ref: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    languages: [{
        sortname: {
            type: String
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Questions'
        },
        status: {
            type: String,
            default: 'Active',
            enum: ['Active', 'inActive']
        },
        isValid: {
            type: Boolean
        }
    }],
    country: {
        type: String
    }
}, {
    timestamps: true
});

questionTranslationSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        ref: this.ref,
        languages: this.languages,
        country: this.country
      }
      return view;
    }
  }

const model = mongoose.model('QuestionTranslations', questionTranslationSchema)

export const schema = model.schema
export default model