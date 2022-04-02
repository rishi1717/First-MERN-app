import React, { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"

function Dashboard() {
	const navigate = useNavigate()
	const [quote, setQuote] = useState("")
	const [tempQuote, setTempQuote] = useState("")

	async function populateQuote() {
		const req = await fetch("http://localhost:3001/api/quote", {
			method: 'GET',
			headers: {
				"x-access-token": localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === "ok") {
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			const user = jwtDecode(token)
			if (!user) {
				localStorage.removeItem("token")
				navigate("/login")
			} else {
				populateQuote()
			}
		}
	}, [navigate])

	const quoteHandler = async (e) => {
		e.preventDefault()
		const req = await fetch("http://localhost:3001/api/quote", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-access-token": localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})
		console.log(req);
		const data = await req.json()
		console.log(data.quote);
		if (data.status === "ok") {
			setTempQuote('')
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}

	return (
		<div>
			<div>Dashboard</div>
			<div>Your Quote: {quote || "No quotes found"}</div>
			<form onSubmit={quoteHandler}>
				<input
					type="text"
					placeholder="Enter a quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<button type="sumbit">Update Quote </button>
			</form>
		</div>
	)
}

export default Dashboard
