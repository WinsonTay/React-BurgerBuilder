import React from 'react'
import classes from './Burgers.css'
import BurgerIngredient from './BurgerIngredients/Burgeringredients'

const burgers = (props) =>
{
    // Get Each keys inside ingredients
    let ingredientsKeys = Object.keys(props.ingredients)
    let transformedIngredient = ingredientsKeys.map(igkey => {
        return [...Array(props.ingredients[igkey])].map( (_ ,i) =>{
            return (
               <BurgerIngredient type= {igkey} key={igkey+i} /> 
            )
        })
    }).reduce((arr,el) =>{
        return arr.concat(el);
    },[])

    return(
        <div className={classes.Burgers}>
            <BurgerIngredient type='bread-top' />
            {(transformedIngredient.length === 0 ? <p>Please Start Adding Ingredient !</p> : transformedIngredient )}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}
export default burgers