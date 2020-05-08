import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state ={
        loading:false,
        price:0,
        formIsValid:false,
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name..'
                },
                value:'',
                validation :{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Email..'
                },
                value:'',
                validation :{
                    required:true,
                    minLength:2,
                    maxLength:30
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street..'
                },
                value:'',
                validation :{
                    required:true
                },
                valid:false,
                touched:false

            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country..'
                },
                value:'',
                validation :{
                    required:true
                },
                valid:false,
                touched:false

            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    type:'select',
                    options:[{value:'fastest', displayValue:'Fastest'},
                             {value:'cheapest', displayValue:'Cheapest'}
                            ]
                },
                value:'fastest',
                valid:true
            },
            
        }
        
    }

    componentDidMount(){

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
    checkValidity(value,rules){
        let isValid = true;
        if (rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid = value.length < rules.maxLength && isValid;
            }
            return isValid
        }
        return isValid
    }
 
    formInputChangeHandler = (event,InputIdentifier) =>{
        // Clone the State first..
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedOrderForm[InputIdentifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[InputIdentifier] = updatedFormElement

        // Check Whether Overall inputs from the form is Valid , 
        // if valid , then enable Order button to be click
        let formValid = true
        for (let elem in updatedOrderForm) {
            formValid = updatedOrderForm[elem].valid && formValid
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:formValid})
    }
    orderHandler = (event) =>{
 
        event.preventDefault();
        this.setState({loading:true})
        const formData= {}
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }

        const orders = {
            price: this.props.price,
            ingredients: this.props.ingredients,
            orderData : formData
           }
        //    Post and add to the server
           axios.post('./orders.json',orders)
                .then(response=>{
                   this.setState({loading:false})
                //    Redirect to Main Page
                   this.props.history.push('/')
               })
               .catch(error=>{
                   this.setState({loading:false})
               })

    }

    render (){
        let form = null
        let formElementArray= []
        if (this.state.loading ){
            form = <Spinner/>
        }else {
            for (let key in this.state.orderForm){
                formElementArray.push({
                    id : key,
                    elementType:this.state.orderForm[key].elementType,
                    config:this.state.orderForm[key].elementConfig,
                    value:this.state.orderForm[key].value,
                    valid:this.state.orderForm[key].valid,
                    validation:this.state.orderForm[key].validation,
                    touched: this.state.orderForm[key].touched
                })
            }
            form = ( 
                <div>
                    <h4>Enter Contact Details..</h4>   
                <form>
                   {formElementArray.map(key =>{
                       return(
                           <Input key={key.id} 
                           elementType ={key.elementType}
                           elementConfig={key.config}
                           value ={key.value}
                           invalid = {!key.valid}
                           shouldValidate = {key.validation}
                           touched = {key.touched}
                           changed={(event) => this.formInputChangeHandler(event,key.id)}/>
                       )
                   })} 
                    <Button disabled ={!this.state.formIsValid} clicked={this.orderHandler} btnType='Success'>ORDER</Button>
                </form>
                </div>)
        }
        return(
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData