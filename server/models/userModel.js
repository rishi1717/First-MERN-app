const mongoose = require("mongoose")

const user = new mongoose.Schema(
	{
		name: {
			type: "string",
			required: true,
		},
		email: {
			type: "string",
			required: true,
			unique: true,
		},
		password: {
			type: "string",
			required: true,
		},
		quote: {
			type: "string",
		},
	},
	{ collection: "userData" }
)

const userModel = mongoose.model("userData", user)

module.exports = userModel
