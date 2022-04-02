import "./App.css"
import Register from "./Component/Register"
import Login from "./Component/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Component/Dashboard"

function App() {
  const login = <Login />
  const register = <Register />
  const dashboard = <Dashboard />
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/login" exact element={login} />
					<Route
						path="/register"
						exact
						element={register}
					/>
					<Route
						path="/dashboard"
						exact
						element={dashboard}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
