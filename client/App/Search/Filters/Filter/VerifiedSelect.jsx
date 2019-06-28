
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import React from 'react';;

const VerifiedSelect = props => {
  const { multiple, renderValue, fullWidth, label, value, onChange, items } = props;
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
      {items.map((item, index) =>
        <MenuItem key={index} value={item.label}>
          <Checkbox
            checked={value.indexOf(item.label) >= 0}
          />
          {item.label}
        </MenuItem>
      )}
    </Select>
  )
}

export default VerifiedSelect