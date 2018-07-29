import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react'

var React = require('react')
export default class signupform extends React.Component {
	render() {
		return (<div className="ui middle aligned center aligned grid">
			<div className="six wide column ui piled segment">
				<div className="ui center aligned grid">

					<div className="ui large header">
						Create Stream Account
	  				</div>

					<div className="ui hidden divider"></div>
					<Form className="ui large left aligned form" onSubmit={this.props.handleSubmit}>
						<div className="field">
							<label>Username</label>
							<div className="ui left icon input">
								<i className="user icon"></i>
								<input name="username" id="id_username" placeholder="username" type="text" onChange={(e) => this.props.handleChange(e)} />
							</div>
							{this.props.usererror ?
								<Message visible negative>
									{this.props.usererror}
								</Message> : ''
							}
						</div>
						<div className="two fields">
							<div className="field">
								<label>First Name</label>
								<input name="first_name" id="id_first_name" placeholder="First name" type="text" onChange={(e) => this.props.handleChange(e)} />
								{this.props.first_name ?
									<Message visible negative>
										{this.props.first_name}
									</Message> : ''
								}
							</div>
							<div className="field">
								<label>Last Name</label>
								<input name="last_name" id="id_last_name" placeholder="Last name" type="text" onChange={(e) => this.props.handleChange(e)} />
								{this.props.last_name ?
									<Message visible negative>
										{this.props.last_name}
									</Message> : ''
								}
							</div>
						</div>
						<div className="field">
							<label>Email Address</label>
							<div className="ui left icon input">
								<i className="user icon"></i>
								<input name="email" id="id_email" placeholder="Email Address" type="text" onChange={(e) => this.props.handleChange(e)} />
							</div>
							{this.props.email ?
								<Message visible negative>
									{this.props.email}
								</Message> : ''
							}
						</div>
						<div className="field">
							<label>Password</label>
							<div className="ui left icon input">
								<i className="lock icon"></i>
								<input name="password" id="id_password1" placeholder="Password" type="Password" onChange={(e) => this.props.handleChange(e)} />
							</div>
							{this.props.passerror ?
								<Message visible negative>
									{this.props.passerror}
								</Message> : ''
							}
						</div>
						<button type='submit' className="ui fluid large teal submit button">Sign up</button>
						{this.props.nonerror ?
							<Message visible negative>
								{this.props.nonerror}
							</Message> : ''
						}
					</Form>

					<div className="ui message">
						{this.props.success ? <span>{this.props.success}</span> : 'Already registered? '}
						<Link to='/login'>
							Login
      </Link>
					</div>
				</div>
			</div>
		</div>)
	}
}