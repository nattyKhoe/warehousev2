import NavBar from "../NavBar/NavBar";
import styles from "./styles.css";
import logo from '../../others/logo.png'


function Header ({onLogout, user}) {
    return(
        <header className={user?"appear":"hidden"}>
            <h5>Hello {user.first_name}!</h5>
           <div className="nav-area">
            <a href="/" className="logo">
            <img src={logo} alt="company-logo"/>
            </a>
            <NavBar acc_type={user.account_type}/>
            <button onClick={onLogout}>Logout</button>
            </div>
        </header> 
    )
}

export default Header;