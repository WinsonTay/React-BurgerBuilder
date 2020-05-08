import React from 'react'
import Aux from '../../../hoc/auxiliary'
import Button from '../../UI/Button/Button'
const orderSummary = (props) =>
{
    const ingredientslist = Object.keys(props.ingredients)
                            .map(igKey=> <li key={igKey}><span style={{ textTransform:'capitalize', fontWeight:'bold'}}>{igKey} : </span> 
                             {props.ingredients[igKey]}</li>)
    
    return(
        <Aux>
            <h3>Your Orders Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientslist}
            </ul>
            <hr></hr>
            <p><strong>Total Price :$ {props.totalPrice.toFixed(2)} </strong></p>
            
            <p>Continue to checkout?</p>
            <Button clicked = {props.purchaseContinue} btnType='Success'> Continue </Button>
            <Button clicked = {props.purchaseCanceled} btnType='Danger'>Cancel</Button>

        </Aux>
    )
}

export default orderSummary