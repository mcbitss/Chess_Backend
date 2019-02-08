import mongoose, { Schema } from 'mongoose'

const testDetailsSchema = new Schema({
    user: {
        type: Object
    },
    date: {
        type : Date
    },
    results: {
        type : [Object]
    }
}, {
    timestamps: true
});

testDetailsSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        user: this.user,
        date: this.date,
        results: this.results
      }
      return view;
    }
  }

const model = mongoose.model('TestDetails', testDetailsSchema)

export const schema = model.schema
export default model