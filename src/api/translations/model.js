import mongoose, { Schema } from 'mongoose'

const translationSchema = new Schema({
    translation: {
        type : Object
    }
}, {
    timestamps: true
});

translationSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        translation: this.translation
      }
      return view;
    }
  }

const model = mongoose.model('Translations', translationSchema)

export const schema = model.schema
export default model