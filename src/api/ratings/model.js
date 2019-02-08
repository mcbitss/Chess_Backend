import mongoose, { Schema } from 'mongoose'

const ratingSchema = new Schema({
    user: {
        type: Object
    },
    rating: {
        type: Number
    },
}, {
    timestamps: true
});

ratingSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        user: this.user,
        rating: this.rating
      }
      return view;
    }
  }

const model = mongoose.model('Rating', ratingSchema)

export const schema = model.schema
export default model