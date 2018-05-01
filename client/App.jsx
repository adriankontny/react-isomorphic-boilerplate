import React, { Component } from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';
import Home from './routes/Home.jsx';
import Contact from './routes/Contact.jsx';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                {' | '}
                <Link to="/contact">Contact</Link>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route exact path={"/contact"} component={Contact} />
                </Switch>
                <p>
                    {JSON.stringify(this.props.initialData)}
                </p>
            </div>
        );
    }
}

export default App;