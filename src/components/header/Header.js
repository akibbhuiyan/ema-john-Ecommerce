import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="logo" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <span>{loggedInUser.email}</span>
                {loggedInUser.email ? <button onClick={() => setLoggedInUser({})}>Sign Out</button> :
                    <Link to='/login'><button>Sign In</button></Link>
                }
            </nav>
        </div>
    );
};

export default Header;