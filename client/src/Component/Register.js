import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const registerHandler = async (e) => {
        e.preventDefault()
		try{
            await fetch("http://localhost:3001/api/register", {
            method: 'POST',
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		})
        // const data = respose.json()
        navigate('/login')
        }
        catch(e){
            alert(e.message)
        }
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerHandler}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Enter First name"
				/>
				<br />
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
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

export default Register
