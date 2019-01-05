import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const Contact = ({ location, input, handleUpdate }) => {
  const { pathname, search, hash } = location;
  const viewLocation = { pathname, search, hash };
  return (
    <div>
      <p>Contact page</p>
      <p>
        {JSON.stringify(viewLocation)}
      </p>
      <input
        type="text"
        value={input}
        onChange={handleUpdate}
      />
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
  input: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  input: state.query.main,
});

const mapDispatchToProps = dispatch => ({
  handleUpdate: (event) => {
    dispatch({ type: 'SET_QUERY', query: { type: 'main', value: event.target.value } });
    dispatch({ type: 'PING' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
