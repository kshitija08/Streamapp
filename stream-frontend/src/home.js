import { Redirect } from 'react-router'
var React = require('react')
class Logout extends React.Component{
	render(){
		return(
			<button onClick={this.props.logout}>Logout</button>
			)
	}
}
class Home extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {token: localStorage.token};
    }
	logout = () => {
		delete localStorage.token
		this.setState({token:localStorage.token});
	}
	render(){
	if(this.state.token){
		return(
			<Logout logout={this.logout}/>
			)
	}
	else{
        return(
            <Redirect to='/login'/>
            )
	}
}
}
export default Home;