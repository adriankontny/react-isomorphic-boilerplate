import PropTypes from 'prop-types';
import React from 'react';

const Home = ({ location }) => {
  const { pathname, search, hash } = location;
  const viewLocation = { pathname, search, hash };
  return (
    <div>
      <p>Home page</p>
      <p>
        {JSON.stringify(viewLocation)}
      </p>
    </div>
  );
};
Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
};

export default Home;
