import React from 'react'

class CustomerOrderHistory extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <h1>Welcome to the Orders History {this.props.match.params.id}</h1>
        )
    }

}

export default CustomerOrderHistory