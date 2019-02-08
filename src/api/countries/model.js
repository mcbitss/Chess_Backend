import mongoose, { Schema } from 'mongoose'

const countriesSchema = new Schema({
	sortname: {
		type: String
	},
	country: {
		type: String
	},
	native: {
		type: String
	},
	phone: {
		type: String
	}
}, {
		timestamps: true
	});

countriesSchema.methods = {
	view(full) {
		const view = {
			id: this.id,
			country: this.country,
			sortname:this.sortname,
			native:this.native,
			phone: this.phone
		}
		return view;
	}
}

const model = mongoose.model('Countries', countriesSchema)

export const schema = model.schema
export default model