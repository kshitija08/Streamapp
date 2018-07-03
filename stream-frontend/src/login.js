import Loginform from './loginform'
var  axios  =require('axios');
var React = require('react')
class login extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		username:'',
    		password:'',
    		usererror : '',
    		passerror : '' ,
    		nonerror : '',
    	};
    };
    handleChange = (event  ) => {
    	this.setState({ [event.target.name] : event.target.value});
    }
    getToken =(username, pass) => {
    let url = 'http://127.0.0.1:8000/streamapp/obtain-auth-token/';
        axios.post( url, {
            username: username,
            password: pass
  })
  .then( (response) => {
  	const { match: { params }, history } = this.props;
    localStorage.token = response.data.token
    history.push('/');
 
  })
  .catch( (error) => {
  	        this.setState({
          usererror: error.response.data.username,
          passerror: error.response.data.password,
          nonerror : error.response.data.non_field_errors,
        });
  });
}
    handleSubmit = (event) =>{
    	    	
        event.preventDefault();
        let username = this.state.username;
        let pass = this.state.password;
        this.getToken(username, pass);
                   
    }

    render(){
		return(
            <Loginform handleSubmit={this.handleSubmit} handleChange = {this.handleChange} usererror={this.state.usererror} passerror={this.state.passerror} nonerror={this.state.nonerror} />
			)

}
}
export default login;