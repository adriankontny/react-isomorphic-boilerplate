import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import React from 'react';;

const styles = theme => ({
  marginTopBottom: {
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
  },
});

const VerifiedSelect = props => {
  const { multiple, renderValue, fullWidth, label, items, value, onChange, component, classes } = props;
  return (
    <FormControl
      fullWidth className={classes.marginTopBottom} >
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple={multiple}
        renderValue={renderValue}
        fullWidth={fullWidth}
        //variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      >
        {component(items, value)}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles, { withTheme: true })(VerifiedSelect)