import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(){
        super();
        this.state = {
            BookID : "",
            Title : "",
            Author : ""
            // addBookFlag : ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.addBook = this.addBook.bind(this)
    }
    //  //Call the Will Mount to set the addBook to false
    //  componentWillMount(){
    //     this.setState({
    //         addBookFlag : ''
    //     })
    // }   

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    addBook(event){
        var headers = new Headers();
        //prevent page from refresh
        event.preventDefault();
        const bookData = {
            BookID : this.state.BookID,
            Title : this.state.Title,
            Author : this.state.Author,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the book Data
        axios.post("http://localhost:3001/create",bookData)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("Create success")
                    this.props.history.replace('/home');
                }
            })
            .catch(error=>{
                console.log(error.response.data.msg)
                alert(error.response.data.msg)
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
                <br/>
                <div class="container">
                    <form>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.handleChange} type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChange} type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChange} type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.addBook} class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;