import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice"

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim() || !password.trim()) {
            setError("Veuillez renseigner votre email et votre mot de passe.")
            return
        }

        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError("Email ou mot de passe incorrect.")
                return
            }

            if (data.status === 200) {
                const token = data.body.token
                localStorage.setItem("token", token)
                dispatch(login(token))
                navigate("/profile")
            } 

        } catch (error) {
            console.error("Failed to login", error)
            setError("Email ou mot de passe incorrect.")
        }
    }

    return(
        <>
            <Header />

            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1> Sign In </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label> Email </label>
                            <input 
                                type="text" 
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label> Password </label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-remember">
                            <input 
                                type="checkbox"
                                id="remember-me"
                            />
                            <label> Remember me </label>
                        </div>

                        { error && <p className="error-message"> {error} </p> }

                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </form>

                </section>
            </main>

            <Footer />

        </>
    )
}

export default SignIn