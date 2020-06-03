import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../design/navbar.css';
import logo from '../images/cystg-logo.png';

class Navbar extends Component{
    render(){
        return(
            <div>
                <div className="navbar-container">
                    <Link to="/" className="logo"><img src={logo} alt="Logo"/></Link>
                    
                </div>  
            </div>
        );
    }
}

export default Navbar;