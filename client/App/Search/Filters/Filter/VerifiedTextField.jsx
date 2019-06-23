import TextField from '@material-ui/core/TextField';

import React from 'react';

const VerifiedTextField = props => {
  const { fullWidth, variant, className, label, value, error, onChange } = props;
  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      className={className}
      label={label}
      value={value}
      error={!!error}
      helperText={error}
      onChange={onChange}
    />
  )
}

export default VerifiedTextField;