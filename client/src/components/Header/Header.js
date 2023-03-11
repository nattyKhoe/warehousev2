import NavBar from "../NavBar/NavBar";
import styles from "./styles.css";
import logo from '../../others/logo.png'
import { useEffect, useState } from "react";
import { wait } from "../../helpers/helpers";


function Header ({onLogout, first_name, account_type}) {

    return(
        <header>
            <div>
                <h5>Hello {first_name}!</h5>
                <div className="nav-area">
                <a href="/" className="logo">
                <img src={logo} alt="company-logo"/>
                </a>
                <NavBar acc_type={account_type}/>
                <button onClick={onLogout}>Logout</button>
                </div>
            </div>
        </header> 
    )
}

export default Header;