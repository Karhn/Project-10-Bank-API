import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import logo from "../assets/img/argentBankLogo.png";

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only"> Argent Bank </h1>
            </Link>

            <div>
                { user ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                                {user.firstName}
                        </Link>

                        <button className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                                Sign Out
                        </button>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                            Sign In 
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Header