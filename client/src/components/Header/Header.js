import NavBar from "../NavBar/NavBar";
import styles from "./styles.css";


function Header ({onLogout}) {
    return(
        <header>
           <div className="nav-area">
            <a href="/" className="logo">
            WarehouseV2
            </a>
            <NavBar />
            <button onClick={onLogout}>Logout</button>
        </div>
        </header> 
    )
}

export default Header;