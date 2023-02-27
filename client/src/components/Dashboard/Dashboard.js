import React from "react";
import Header from "../Header/Header";
import styles from './styles.css';
import InvoiceInForm from "../Invoice/Invoice";

function Dashboard({user, onLogout}) {

    return (
        <React.Fragment>
            <Header onLogout={onLogout} user={user}/>
            <InvoiceInForm user={user}/>
        </React.Fragment>

    );
}

export default Dashboard;