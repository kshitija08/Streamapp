import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './login'
import home from './home'
import signup from './signup'
import 'semantic-ui-css/semantic.min.css';

render(
    <Router>
    	<Switch>
    	    <Route exact={true} path="/" component={ home}/>
        	<Route path="/login" component={ login }/>
        	<Route path="/signup" component={ signup }/>
        </Switch>
    </Router>, document.getElementById('root')
);