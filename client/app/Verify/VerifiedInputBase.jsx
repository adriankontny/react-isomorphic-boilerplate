import InputBase from '@material-ui/core/InputBase';

import React from 'react';

const VerifiedInputBase = props => {
  const { placeholder, value, classes, onChange } = props;
  return (
    <InputBase
      placeholder={placeholder}
      value={value}
      classes={classes}
      onChange={onChange}
    />
  )
}

export default VerifiedInputBase;