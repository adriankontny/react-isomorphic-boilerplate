import PropTypes from 'prop-types';
import React from 'react';

const Contact = ({ location }) => {
  const { pathname, search, hash } = location;
  const viewLocation = { pathname, search, hash };
  return (
    <div>
      <p>Contact page</p>
      <p>
        {JSON.stringify(viewLocation)}
      </p>
    </div>
  );
};
Contact.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
};

export default Contact;
