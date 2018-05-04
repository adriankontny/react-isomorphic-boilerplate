import React, { Component } from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';
import Home from './routes/Home.jsx';
import Contact from './routes/Contact.jsx';
import NotFound from './routes/NotFound.jsx';

const RouteStatus = props => (
    <Route
      render={({ staticContext }) => {
        // we have to check if staticContext exists
        // because it will be undefined if rendered through a BrowserRouter
        if (staticContext) {
          staticContext.statusCode = props.statusCode;
        }
  
        return <div>{props.children}</div>;
      }}
    />
  );
class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log()
        return (
            <div>
                <Link to="/">Home</Link>
                {' | '}
                <Link to="/contact">Contact</Link>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route exact path={"/contact"} component={Contact} />
                    <RouteStatus statusCode={404}>
                        <NotFound/>
                    </RouteStatus>
                </Switch>
                <p>
                    {JSON.stringify(this.props.initialData)}
                </p>
            </div>
        );
    }
}

export default App;