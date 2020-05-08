import React, {Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

import Aux from '../auxiliary'

const withErrorHandler = ( WrappedComponent,axios) =>{
    return class extends Component{
        state ={
            error:null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use (req=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error:error.message})
            });
        }

        errorClearHandler= () =>{

            this.setState({error:null})
        }
        componentWillUnmount(){
            // Remove This Request/Response interceptors once the component had unmount
            
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }
        render (){
            return(
                <Aux>
                    <Modal show = {this.state.error}
                           modalClosed ={this.errorClearHandler}>
                      {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler