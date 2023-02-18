import React from "react";
import Header from "../Header/Header";
import styles from './styles.css';

function Dashboard({user, onLogout}) {

    return (
        <React.Fragment>
            <Header onLogout={onLogout}/>
        </React.Fragment>

    );
}

export default Dashboard;