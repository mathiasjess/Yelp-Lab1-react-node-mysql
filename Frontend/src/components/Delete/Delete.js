import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{
    constructor(){
        super()
        this.state = {
            BookID :""
        }
        this.handleChange = this.handleChange.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })

    }
    deleteBook(event){
        event.preventDefault();
        const bookID = {
            BookID : this.state.BookID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the bookID to delete Book
        axios.post("http://localhost:3001/delete",bookID)
        .then(response=>{
            console.log("Status Code:", response.status)
            if(response.status === 200){
                this.props.history.replace('/home')
            }
        })
        .catch(err=>{
            alert(err.response.data.msg)
        })
    

    }
    render(){
         //redirect based on successful login
         let redirectVar = null;
         if(!cookie.load('cookie')){
             redirectVar = <Redirect to= "/login"/>
         }
        return(
        <div>
            {redirectVar}
            <div class="container">
                <form>
                    <div onChange={this.handleChange} style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div onClick={this.deleteBook} style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        </div>
        )
    }
}

export default Delete;