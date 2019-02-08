import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number
    },
    country: {
        type: String
    },
    language: {
        type: String
    },
}, {
    timestamps: true
});

userSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        email: this.email,
        password: this.password,
        phone: this.phone,
        country: this.country,
        language: this.language
      }
      return view;
    }
  }

const model = mongoose.model('Users', userSchema)

export const schema = model.schema
export default model