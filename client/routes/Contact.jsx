import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { location } = this.props;
    delete location.key;
    return (
      <div>
        <p>Contact page</p>
        <p>
          {JSON.stringify(location)}
        </p>
      </div>
    );
  }
}
Contact.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
};

export default Contact;
