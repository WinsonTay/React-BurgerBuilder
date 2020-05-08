import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './SideDrawer.css'
import Navigationitems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'
    
const sideDrawer = (props) => {
    
    let attachedClass = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClass =[classes.SideDrawer,classes.Open]
    }

    return (
        <Aux>
            <Backdrop show = {props.open} clicked ={props.clicked}/>
            <div className ={attachedClass.join(' ')}>
                    <div className ={classes.Logo}>
                        <Logo/>
                    </div>
                <nav>
                <Navigationitems/> 
                </nav>
            </div>
        </Aux>)
}
export default sideDrawer