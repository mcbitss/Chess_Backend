import mongoose, { Schema } from 'mongoose'

const drivingSchoolSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    distance: {
        type: String
    },
    latitude:{
        type: Number
    },
    longitude: {
        type: Number
    }
}, {
    timestamps: true
});

drivingSchoolSchema.methods = {
    view (full) {
      const view = {
        _id: this._id,
        id: this.id,
        name: this.name,
        description: this.description,
        email: this.email,
        phone: this.phone,
        address: this.address,
        distance: this.distance,
        latitude: this.latitude,
        longitude: this.longitude
      }
      return view;
    }
  }

const model = mongoose.model('DrivingSchool', drivingSchoolSchema)

export const schema = model.schema
export default model