import React from "react";
import Header from "../Header/Header";
import InvoiceOutForm from "../Invoice/Invoice";
import styles from './styles.css';


function Dashboard({user, onLogout}) {

    return (
        <React.Fragment>
            <Header onLogout={onLogout} user={user}/>
            <InvoiceOutForm user={user}/>
        </React.Fragment>
    );
}

export default Dashboard;