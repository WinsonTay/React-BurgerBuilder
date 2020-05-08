import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
// Showing a List of Orders from Customer
class Orders extends Component {
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        // Axios logic here. .
        const fetchOrders = []
        axios.get('/orders.json')
             .then(res =>{
                for (let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
               
                this.setState({loading:false, orders:fetchOrders})
                console.log(fetchOrders)
            }).catch( err =>{this.setState({loading:false})})
    }
    render(){
        return(
            <div>
               {this.state.orders.map(order =>{
                   return(
                       <Order key = {order.id} 
                              ingredients ={order.ingredients} 
                              price = {+order.price} />
                   )
               })}

            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);