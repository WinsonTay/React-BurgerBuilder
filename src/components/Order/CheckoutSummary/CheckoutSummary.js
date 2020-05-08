import React from 'react'
import Burgers from '../../Burgers/Burgers'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) => {
    return(
        <div className ={classes.CheckoutSummary}>
            <h1>We Hope it Tastes well</h1>
            <div className={classes.Burger} style={{width:'100%',textAlign:'center' , margin:'auto'}}>
                <Burgers ingredients={props.ingredients}/>
            </div>
            <Button clicked ={props.checkoutCancelled}  btnType='Danger'>CANCEL</Button>
            <Button clicked ={props.checkoutContinue}  btnType='Success'>CONTINUE</Button>
        </div>
    )

}

export default checkoutSummary