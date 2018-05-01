import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (
            <div>
                <p>Home page</p>
                <p>
                    {JSON.stringify(this.props.location)}
                </p>
            </div>
        );
    }
}

export default Home;