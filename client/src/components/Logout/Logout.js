import Login from "../Login/Login";

function Logout ({handleLogin}) {
    return (
        <div>
            <h2>You have been successfully logout!</h2>
            <Login onLogin={handleLogin}/>
        </div>
        
    )
}

export default Logout;