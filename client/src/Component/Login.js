import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const navigate = useNavigate()
	const loginHandler = async (e) => {
		e.preventDefault()
		try {
			const respose = await fetch("http://localhost:3001/api/login", {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})
			const data = await respose.json()

			if (data.user) {
				localStorage.setItem('token',data.user)
				navigate('/dashboard')
			} else {
				alert("Please check your username or password")
			}
		} catch (e) {
			alert(e.message)
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginHandler}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Enter Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Enter Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login
