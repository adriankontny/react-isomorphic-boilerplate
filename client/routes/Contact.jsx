import React, {Component} from 'react';

class Contact extends Component {

    render() {
        return (
            <div>
                <p>Contact page</p>
                <p>
                    {JSON.stringify(this.props.location)}
                </p>
            </div>
        );
    }
}

export default Contact;