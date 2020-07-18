import React from 'react';
import classes from './Navbar.module.css';

const NavBar = () => {
    return (
        <div className={[classes.NavBar, classes.Flex].join(' ')}>
            <div><span className={classes.Heading}>Movie</span></div>
            <div></div>
        </div>

    );
}

export default NavBar;