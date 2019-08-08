import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String,
      required: true,
      minlength: 6
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
    userType: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    }
  },
  {
    timestamps: true
  }
);

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password')) return next();

//   // const rounds = env === 'test' ? 1 : 9;
//   const rounds = 9;

//   bcrypt
//     .hash(this.password, rounds)
//     .then(hash => {
//       this.password = hash;
//       next();
//     })
//     .catch(next);
// });

userSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      country: this.country,
      language: this.language,
      userType: this.userType
    };
    return view;
  },

  // authenticate(password) {
  //   return bcrypt
  //     .compare(password, this.password)
  //     .then(valid => (valid ? this : false))
  //     .catch(err => console.log(err));
  // }
};

const model = mongoose.model('Users', userSchema);

export const schema = model.schema;
export default model;
