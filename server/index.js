const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./models/usermodel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

mongoose.connect("mongodb://localhost:27017/first-mern-app")

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.post("/api/register", async (req, res) => {
	try {
		const user = await userModel.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: "ok" })
	} catch (err) {
		res.status(400).json({ status: "error", error: err.message })
	}
})

app.post("/api/login", async (req, res) => {
	const user = await userModel.findOne({
		email: req.body.email,
		password: req.body.password,
	})
	if (user) {
		const token = jwt.sign(
			{
				email: user.email,
				name: user.name,
			},
			"secret12345"
		)
		return res.json({ status: "ok", user: token })
	} else {
		return res.status(401).json({ status: "error", user: false })
	}
})

app.get("/api/quote", async (req, res) => {
	const token = req.headers["x-access-token"]
	try {
		const decoded = jwt.verify(token, "secret12345")
		const user = await userModel.findOne({ email: decoded.email })
		return res.json({ status: "ok", quote: user.quote })
	} catch (err) {
		console.log(err.message)
		res.status(400).json({ status: "error", error: "invalid token" })
	}
})

app.post("/api/quote", async (req, res) => {
	const token = req.headers["x-access-token"]
	try {
		const decoded = jwt.verify(token, "secret12345")
		await userModel.updateOne(
			{ email: decoded.email },
			{ $set: { quote: req.body.quote } }
		)
		return res.json({ status: "ok", quote: req.body.quote })
	} catch (err) {
		console.log(err.message)
		res.status(400).json({ status: "error", error: "invalid token" })
	}
})

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
