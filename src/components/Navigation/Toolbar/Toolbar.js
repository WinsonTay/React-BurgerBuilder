import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
const toolBar = (props) =>
{
    return (
    <header className={classes.Toolbar}>
        <div className ={classes.MobileOnly} onClick={props.menuClick}>Menu</div>
        <div className = {classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
    )

}

export default toolBar