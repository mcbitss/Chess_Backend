import mongoose, { Schema } from 'mongoose';

const LoginUserSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const model = mongoose.model('Login', LoginUserSchema);

export const schema = model.schema;
export default model;
