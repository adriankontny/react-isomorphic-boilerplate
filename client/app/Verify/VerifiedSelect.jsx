import Select from '@material-ui/core/Select';

import React from 'react';

const VerifiedSelect = props => {
  const { multiple, renderValue, fullWidth, label, value, onChange, component } = props;
  return (
    <Select
      multiple={multiple}
      renderValue={renderValue}
      fullWidth={fullWidth}
      //variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
    >
      {component ? component(value) : null}
    </Select>
  )
}

export default VerifiedSelect