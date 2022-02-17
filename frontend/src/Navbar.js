import { Link } from 'react-router-dom'
import { LoginContext } from "./Context/LoginContext";
import { useContext } from "react";

const Navbar = () => {
    const {globalUsername, setGlobalUsername,
        globalLoginToken, setGlobalLoginToken} = useContext(LoginContext);
   
    return (  
        <nav className="navbar">
            <h1>E-Pass opou pas</h1>
            <div className="links">
                <Link to="/">Αρχική</Link>
                <Link to="/login">Σύνδεση</Link>
                <Link to="/create">Εγγραφή</Link>
                <Link to="/data">Διελεύσεις</Link>
                <Link to="/logout">Log out</Link>
                
            </div>
            <div>
            {globalUsername && <h3>Hello {globalUsername}</h3>}
            </div>
        </nav>
    );
}
 
export default Navbar;