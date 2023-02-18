import NavBar from "../NavBar/NavBar";
import styles from "./styles.css";
import logo from '../../others/logo.png'


function Header ({onLogout}) {
    return(
        <header>
           <div className="nav-area">
            <a href="/" className="logo">
            <img src={logo} alt="company-logo"/>
            </a>
            <NavBar />
            <button onClick={onLogout}>Logout</button>
        </div>
        </header> 
    )
}

export default Header;