import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String
    },
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
    userType:{
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, {
    timestamps: true
});

userSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone,
        country: this.country,
        language: this.language,
        userType: this.userType
      }
      return view;
    }
  }

const model = mongoose.model('Users', userSchema)

export const schema = model.schema
export default model