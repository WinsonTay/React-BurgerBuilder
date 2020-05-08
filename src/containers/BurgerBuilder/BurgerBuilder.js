import React, { Component } from 'react'
import Aux from '../../hoc/auxiliary'
import Burger from '../../components/Burgers/Burgers'
import BuildControls from '../../components/Burgers/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burgers/OrderSummary/OrderSummary'
import classes from './BurgerBuilder.css'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

let INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {
    state ={
        ingredients:null,
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false

    }
    componentDidMount(){
        axios.get('https://react-my-burger-store.firebaseio.com/ingredients.json')
              .then(response => {
                  this.setState({ingredients:response.data})
              }).catch(error => this.setState({error:true}))
    }
    updatePurchaseState = (updatedIngredient) => {
        const tempIngredient = {
            ...updatedIngredient
        }
        const sum = Object.keys(tempIngredient)
                    .map((igKey)=> tempIngredient[igKey])
                    .reduce((sum,el)=> sum + el ,0)
        this.setState({purchasable: sum > 0 })

     }
    purchasingHandler = ()=> {
        this.setState({purchasing:true})
    }

    purchaseCancel = () => {
        this.setState({purchasing:false})
        
    }
    // Purchase Order, POST data to database server
    purchaseContinue =() => {
        // this.setState({loading:true})
        // const orders = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Winson Tay',
        //         address:'Jalan Bumper 3311',
        //         email:'lolo@hotmail.com' ,
        //         country:'Germany'
        //     },
        //     deliveryMethod:'fastest'

        // }
        // axios.post('./orders.json',orders)
        //      .then(response=>{
        //         this.setState({loading:false, purchasing:false})
        //     })
        //     .catch(error=>{
        //         this.setState({loading:false,purchasing:false})
        //     })
        const queryParams=[];
        for (let i in this.state.ingredients ){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice)
        const queryString =queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        })

    }


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        let newCount = oldCount + 1
        let newIngredient = {
            ...this.state.ingredients
        }
        newIngredient[type] = newCount
        let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients: newIngredient , totalPrice:newPrice})
        this.updatePurchaseState(newIngredient)
    }
    
    removeIngredientHandler = (type) =>{
        let newCount = this.state.ingredients[type] - 1
        // Initialize and set temporary state
        let newIngredient ={
            ...this.state.ingredients
        }
        newIngredient[type] = newCount
        let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({ingredients: newIngredient , totalPrice:newPrice})
        this.updatePurchaseState(newIngredient)
    }

   
    
    render(){
        let disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        } // Output {salad: true, meat:true, bacon:false ... }
        let orderSummary =null 
        let burger = this.state.error ? <p> ingredients cant be loaded</p> :  <Spinner />
        if (this.state.ingredients) {
            burger =  (
                <Aux>
                    <div style={{marginTop:'16px', flex:'1'}}>
                            <Burger ingredients = {this.state.ingredients}/>
                        </div>
                    <div style={{flex:'1'}}>
                        <BuildControls added={this.addIngredientHandler}
                                    removed={this.removeIngredientHandler}
                                    disabledInfo={disabledInfo}
                                    price ={this.state.totalPrice}
                                    disabled = {this.state.purchasable}
                                    ordering = {this.purchasingHandler}
                        />
                    </div>
               </Aux>
               
            )
            orderSummary =(<OrderSummary 
                ingredients= {this.state.ingredients}
                purchaseContinue ={this.purchaseContinue}
                purchaseCanceled = {this.purchaseCancel}
                totalPrice = {this.state.totalPrice}/>)
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
    
        return(
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed ={this.purchaseCancel}>
                   {orderSummary}
                </Modal>
                <div className = {classes.BurgerBuilder}>
                   {burger}
                </div>
            </Aux>

        )
    }
}
export default withErrorHandler(BurgerBuilder,axios);

