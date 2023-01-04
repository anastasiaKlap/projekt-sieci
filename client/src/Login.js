import { useState, useContext } from 'react'
import './login.css'
import axios from 'axios'
import UserContext from './UserContext'
import { Navigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const user = useContext(UserContext)

    function loginUser(e) {
        e.preventDefault()

        const data = { email, password }
        axios
            .post('http://localhost:4000/login', data, {
                withCredentials: true,
            })
            .then((response) => {
                user.setEmail(response.data.email)
                setEmail('')
                setPassword('')
                setLoginError(false)
                setRedirect(true)
            })
            .catch(() => {
                setLoginError(true)
            })
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="drop">
                    <div className="content">
                        <h2>Sing in</h2>
                        <form action="" onSubmit={(e) => loginUser(e)}>
                            {loginError && (
                                <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>
                            )}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="inputBox"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="inputBox"
                            />

                            <button className="btnsLog" type="submit">
                                login
                            </button>
                        </form>
                    </div>
                    <div className="midDrop"></div>
                    <div className="minDrop"></div>
                </div>
            </div>
        </div>
    )
}

export default Login
