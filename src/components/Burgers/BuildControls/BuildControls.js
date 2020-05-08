import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import Aux from '../../../hoc/auxiliary'

let controls =[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'}
]
const buildControls = (props) =>{ 
    return(
            <Aux>
                <div className={classes.BuildControls}>
                                                {/* Change to deciment point of 2 */}
                    <div>
                        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
                        {controls.map(el=>{
                            return(
                            <BuildControl 
                            key={el.label} 
                            label={el.label} 
                            clickMore={()=>props.added(el.type)}
                            clickLess={()=>props.removed(el.type)}
                            disabled = {props.disabledInfo[el.type]}
                            />
                            )
                        })}
                        </div>
                    <div>
                        <button disabled={!props.disabled} onClick={props.ordering} className={classes.OrderButton}>ORDER NOW</button>      
                    </div>
                </div>
            </Aux>

);
}

export default buildControls