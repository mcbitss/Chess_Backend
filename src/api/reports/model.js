import mongoose, { Schema } from 'mongoose'

const reportSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type : String
    },
    date: {
        type: Date
    },
    user: {
        type: Object
    },
    status:{
        type: String
    }
}, {
    timestamps: true
});

reportSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        title: this.title,
        description: this.description,
        date: this.date,
        user: this.user,
        status: this.status
      }
      return view;
    }
  }

const model = mongoose.model('Reports', reportSchema)

export const schema = model.schema
export default model