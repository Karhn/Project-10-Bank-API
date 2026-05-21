import Footer from "../components/Footer";
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";


function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!token) return

        const fetchUser = async () => {

            try {
                const response = await fetch(
                    "http://localhost:3001/api/v1/user/profile",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )

                const data = await response.json()
                dispatch(setUser(data.body))
            } catch (error) {
                console.error("Erreur lors de la récupération des données", error)
            }
        }
        fetchUser()
    }, [dispatch, token])

    if (!user) {
        return <p> Loading ... </p>
    }

    const validateProfileFrom = () => {
        const trimFirstName = firstName.trim()
        const trimLastName = lastName.trim()

        const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/

        if (!trimFirstName || !trimLastName) {
            return "Le prénom et le nom ne peuvent pas être vides."
        }

        if (trimFirstName.length < 2 || trimLastName.length < 2) {
            return "Le prénom et le nom doivent contenir au moins 2 caractères."
        }

        if (!nameRegex.test(trimFirstName) || !nameRegex.test(trimLastName)) {
            return "Le prénom et le nom ne doivent contenir que des lettres, espaces."
        }

        return ""
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setError("")

        const validationError = validateProfileFrom()

        if (validationError) {
            setError(validationError)
            return
        }

        try {
            await fetch(
                "http://localhost:3001/api/v1/user/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim()
                    })
                }
            )

            dispatch(setUser({
                ...user,
                firstName: firstName.trim(),
                lastName: lastName.trim()
            }))

            setIsEditing(false)

        } catch (error) {
            console.error("Failed to update user profile", error)
            setError("Une erreur est survenue lors de la modification du profil")
        }
    }

    return (
        <>
            <Header />

            <main className="main bg-dark">

                <div className="header">
                    <h1> Welcome back </h1>

                    {!isEditing && (
                        <>

                            <h2> {user.firstName} {user.lastName} ! </h2>

                            <button className="edit-button" 
                                onClick={() => {
                                    setIsEditing(true)
                                    setFirstName(user.firstName)
                                    setLastName(user.lastName)
                                }}>
                                Edit Name 
                            </button>

                        </>
                    )}
                

                {isEditing && (
                    <form onSubmit={handleUpdate} className="profile-form">
                        <div className="profile-inputs">
                            <input type="text" value={firstName} placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" value={lastName} placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        { error && <p className="error-message"> {error} </p> }

                        <div className="profile-buttons">
                            <button type="submit" className="edit-button"> Save </button>
                            <button type="button" className="edit-button" 
                            onClick={() => { setFirstName(user.firstName)
                            setLastName(user.lastName)
                            setError("")
                            setIsEditing(false)}}> Cancel </button>
                        </div>
                    </form>
                )}

                </div>

                <h2 className="sr-only"> Accounts </h2>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title"> Argent Bank Checking (x8349) </h3> 
                        <p className="account-amount"> $2,082.79 </p>
                        <p className="account-amount-description"> Available Balance </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button"> View transactions </button>
                    </div>
                </section>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title"> Argent Bank Savings (x6712) </h3> 
                        <p className="account-amount"> $10,928.42 </p>
                        <p className="account-amount-description"> Available Balance </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button"> View transactions </button>
                    </div>
                </section>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title"> Argent Bank Credit Card (x8349) </h3> 
                        <p className="account-amount"> $184.30 </p>
                        <p className="account-amount-description"> Current Balance </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button"> View transactions </button>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}

export default Profile