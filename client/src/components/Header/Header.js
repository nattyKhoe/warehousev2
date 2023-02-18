import NavBar from "../NavBar/NavBar";
import styles from "./styles.css";


function Header () {
    return(
        <header>
           <div className="nav-area">
            <a href="/" className="logo">
            Logo
            </a>
            <NavBar />
        </div>
        </header> 
    )
}

export default Header;