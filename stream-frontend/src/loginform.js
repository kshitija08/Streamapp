import { Grid , Header, Form, Segment , Icon, Input , Message, Button } from 'semantic-ui-react' 
import {  Link } from 'react-router-dom';
import './index.css';

var React = require('react')
export default class loginform extends React.Component {

    render(){
        return(
            <Grid className="center aligned login-grid" verticalAlign='middle' >
                <Grid.Column width = {5} className="ui raised card">
                    <Header as='h2'>
                        <div className = 'content'>
                            Log-in to your account
                        </div>
                    </Header>

            <Form size='large' onSubmit={this.props.handleSubmit}>
                <Segment secondary stacked>
                    <div className="field">
                        <Input iconPosition='left' placeholder='username' name='username' onChange = {(e) => this.props.handleChange(e )}>
                            <Icon name='user' />
                            <input />
                        </Input>
                        {this.props.usererror ?
                            <Message visible negative>
                            {this.props.usererror}
                            </Message> : ''
                        }
                    </div>
                    <div className="field">
                        <Input type='password' iconPosition='left' placeholder='password' name='password' onChange = {(e) => this.props.handleChange(e )}>
                            <Icon name='lock' />
                            <input />
                        </Input>
                        {this.props.passerror ?
                            <Message visible negative>
                            {this.props.passerror}
                            </Message> : ''
                        }
                    </div> 
                    <Button fluid type='submit' color='teal'>Login</Button>
                </Segment>
                {this.props.nonerror ?
                    <Message visible negative>
                    {this.props.nonerror}
                    </Message> : ''
                    }
            </Form>
            <Message visible>
                 New to us?&nbsp;
                 <Link to='/signup'>
                 Register
                 </Link>
            </Message>
                </Grid.Column>
            </Grid>

    )}
}