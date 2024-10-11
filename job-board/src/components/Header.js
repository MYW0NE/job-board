import React from 'react';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <h1>Job Board</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Post a Job</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
