import React, { Component } from 'react'
import Aux from '../../hoc/auxiliary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSide:false
    }
    closeSideHandler = ()=>{
        this.setState({showSide:false})

    }
    openSideHandler = () => {
        this.setState({showSide:true})
    }
    render (){
        return (
            <Aux>
                <Toolbar menuClick = {this.openSideHandler}/>
                <SideDrawer open = {this.state.showSide} clicked = {this.closeSideHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )

    }


}
export default Layout