import { Link } from 'react-router-dom'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>E-Pass opou pas</h1>
            <div className="links">
                <Link to="/">Αρχική</Link>
                <Link to="/login">Σύνδεση</Link>
                <Link to="/create">Εγγραφή</Link>
                <Link to="/data">Διελεύσεις</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;