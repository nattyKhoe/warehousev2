import {useNavigate } from "react-router-dom";
import styles from './styles.css'

// function navback(){
//     return <Navigate to= '/'/>
// }

export default function NotFound() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/');
    };

    return (
        <div id="container">
            <h1>Oops! You seem to be lost.</h1>
            <button id="navback_button" onClick={handleClick}>Back to the Main Page </button>
        </div>
    )
}