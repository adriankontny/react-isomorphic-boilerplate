import TextField from '@material-ui/core/TextField';

import React from 'react';

const VerifiedTextField = props => {
  const { fullWidth, cols, key, select, variant, className, label, value, error, onChange, component } = props;
  return (
    <TextField
      fullWidth={fullWidth}
      cols={cols}
      key={key}
      select={select}
      variant={variant}
      className={className}
      label={label}
      value={value}
      error={!!error}
      helperText={error}
      onChange={onChange}
    >
      {component ? component(value) : null}
    </TextField>
  )
}

export default VerifiedTextField;