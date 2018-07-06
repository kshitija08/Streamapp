import Signupform from './signupform'
import {  Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
var React = require('react')
var  axios  =require('axios');
class Signup extends React.Component{
		constructor(props) {
    	super(props)
    	this.state = {
    		username:'',
    		password:'',
    		first_name: '',
    		last_name: '',
    		email:'',
    		usererror : '',
    		passerror : '' ,
    		fnamerr :'',
    		lnamerr:'',
    		emailerr:'',
    		nonerror : '',
    		success:''
    	}
    };
    handleChange = (event) => {
    	this.setState({ [event.target.name] : event.target.value})
    }
	handleSubmit = (event) => {
        event.preventDefault();
		let url = 'http://localhost:8000/streamapp/register/';
		let username = this.state.username;
		let email = this.state.email;
		let password = this.state.password;
		let first_name = this.state.first_name;
		let last_name = this.state.last_name;
axios.post(url, {
    first_name: first_name,
    last_name: last_name,
    username : username,
    password : password,
    email : email
  })
  .then( (response) => {
      	        this.setState({
    		username:'',
    		password:'',
    		first_name: '',
    		last_name: '',
    		email:'',
    		usererror : '',
    		passerror : '' ,
    		fnamerr :'',
    		lnamerr:'',
    		emailerr:'',
    		nonerror:'',
    		success : 'Account created successfully!',
        });
  })
  .catch( (error) => {
      	        this.setState({
    		usererror : error.response.data.username,
    		passerror : error.response.data.password ,
    		fnamerr :error.response.data.first_name,
    		lnamerr:error.response.data.last_name,
    		emailerr:error.response.data.email,
    		nonerror:error.response.data.non_field_errors,
            });
    console.log(error);
  });
	};
	render(){
		return(
		<Signupform handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} nonerror={this.state.nonerror} usererror={this.state.usererror} passerror={this.state.passerror} email={this.state.emailerr} first_name={this.state.fnamerr} last_name={this.state.lnamerr}/>
	)}
}
export default Signup;