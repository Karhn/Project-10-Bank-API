import Footer from "../components/Footer";
import Header from "../components/Header";

import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")

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
                console.log("DATA API:", data)
                setUser(data.body)
            } catch (error) {
                console.error("Erreur lors de la récupération des données", error)
            }
        }
        fetchUser()
    }, [])

    if (!user) {
        return <p> Loading ... </p>
    }

    return (
        <>
            <Header />

            <main className="main bg-dark">

                <div className="header">
                    <h1> Welcome back <br /> {user.firstName} {user.lastName} </h1>
                    <button className="edit-button"> Edit Name </button>
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