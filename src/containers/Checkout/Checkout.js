import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import  {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import classes from './Checkout.css'


class Checkout extends Component {
    state ={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0
        },
        totalPrice:0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0]=== 'price'){
                price = param[1]
            }else {
                ingredients[param[0]] = +param[1]
            }
            
        }
        if (Object.keys(ingredients).length === 0) {this.props.history.replace('/')}
       
        this.setState({ingredients:ingredients, totalPrice: price});
    }
    checkoutContinuedHandler =() =>{
        this.props.history.replace('/checkout/contact-data')

    }
    checkoutCancelledHandler =() =>{
        this.props.history.goBack()
    }
    render() {
        

     
        return(
            
            <React.Fragment>
            <div className={classes.Checkout}>
                <CheckoutSummary checkoutCancelled = {this.checkoutCancelledHandler} 
                                 checkoutContinue ={this.checkoutContinuedHandler}
                                 ingredients ={this.state.ingredients}/>
            
           
            <Route path={this.props.match.url+'/contact-data'} 
                // Passing this props to Contact Data props , which include
                // Route information such as history, location.search .. etc
                render= {(props)=><ContactData  ingredients={this.state.ingredients} 
                                    price ={+this.state.totalPrice}
                                    {...props}/>} />
            </div>
            </React.Fragment>
        
     )

    }
}

export default Checkout