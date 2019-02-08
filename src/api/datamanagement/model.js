import mongoose, { Schema } from 'mongoose'

const datamanagementSchema = new Schema(
  {
    image: {
      type: String,
      trim: true
    },
    question: {
      type: String,
      trim: true
		},
		options: {
			type: Array
		},
		category: {
			type: String,
			trim: true
		},
		country: {
			type: String,
			trim: true
		},
		correctOption: {
			type: String,
			trim: true
		},
		language: {
			type: String,
			trim: true
		},
		explanation: {
			type: String,
			trim: true
		}
  },
  { timestamps: true }
)

datamanagementSchema.methods = {
  view () {
    return {
      // simple view
      id: this.id,
      _id: this.id,
      image: this.image,
      question: this.question,
			options: this.options,
			correctOption: this.correctOption,
			category: this.category,
			country: this.country,
			explanation: this.explanation
    }
  }
}

const model = mongoose.model('datamanagement', datamanagementSchema)

export const schema = model.schema
export default model
