import { Link } from 'react-router-dom'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>E-Pass opou pas</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to="https://github.com/ntua/TL21-64">GitHub</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;