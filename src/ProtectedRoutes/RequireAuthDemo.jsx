import React, { Component } from 'react';
import { Link, Route, Switch, withRouter, BrowserRouter as Router, useHistory } from 'react-router-dom';
import RequireAuth from './RequireAuthHOC.jsx';

class RequireAuthDemo extends Component {
    constructor(props) {
        super(props);
        /* Initialize state to false */
        this.state = {
            authenticated: false,
        }
    }

    handleLoginCallback = (loginData) =>{
        this.setState({authenticated: loginData})
    }

    render() {
        const AuthContacts = withRouter(RequireAuth(Contacts));
        const match = this.props
        console.log(match);
        return (
            <Router>
                <div>
                    <ul className="nav navbar-nav">
                        <li><Link to={`${match.url}home/`}>Home</Link></li>
                        <li><Link to={`${match.url}contacts`}>Contacts(Protected Route)
                        </Link></li>
                    </ul>

                    <Switch>
                        <Route exact path={`${match.path}home/`} component={Home} />
                        <Route path={`${match.path}contacts`} render={() => <AuthContacts authenticated={this.state.authenticated} {...this.props} />} />
                        <Route path="/login">
                            <Login loginCallback = {this.handleLoginCallback}/>
                        </Route>
                    </Switch>
                </div>
            </Router >
        );
    }
}
const Home = () => {
    return (<div> Navigating to the protected route gets redirected to /login </div>);
}
const Contacts = () => {
    return (<div> Contacts </div>);
}
const Login = (props) => {
    let history = useHistory();
    return (
        <div>
            <p>You must log in to view the page</p>
            <button onClick={() => {
                props.loginCallback(true);
                history.push({pathname:'/contacts', state:{authenticated:true}});
            }}>Log in</button>
        </div>
    )
}

export default RequireAuthDemo;
