import mongoose, { Schema } from 'mongoose'

const registerationSchema = new Schema(
    {
      userId: {
        type: String,
        trim: true,
        unique: true
        // required: true
      },
      password: {
        type: String,
        trim: true,
        // required: true,
        minlength: 6
      },
      email: {
        type: String,
        trim: true
      },
      phoneNumber: {
        type: String,
        trim: true
      },
      country: {
        type: String,
        trim: true
      },
      language: {
        type: String,
        trim: true
      },
      isActive: {
        type: Boolean,
        trim: true,
        default: false
      },
      token: String
    },
    { timestamps: true }
  )

  registerationSchema.methods = {
    view () {
      return {
        // simple view
        id: this.id,
        _id: this.id,
        userId: this.userId,
        password: this.password,
        email: this.email,
        phoneNumber: this.phoneNumber,
        country: this.country,
        language: this.language,
        status: this.status
      }
    }
  }
  
  const model = mongoose.model('Register', registerationSchema)
  
  export const schema = model.schema
  export default model