import mongoose, { Schema } from 'mongoose'

const languagesSchema = new Schema({
	languages: [
		{
			language: {
				type: String
			},
			native: {
				type: String
			},
			sortname: {
				type: String
			}
		}
	],
	country: {
		type: String,
	}
}, {
		timestamps: true
	});

languagesSchema.methods = {
	view(full) {
		const view = {
			id: this.id,
			language: this.language,
			country: this.country,
			languages: this.languages,
			country: this.country
		}
		return view;
	}
}

const model = mongoose.model('Languages', languagesSchema)

export const schema = model.schema
export default model