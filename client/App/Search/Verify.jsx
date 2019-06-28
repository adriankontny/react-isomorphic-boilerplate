import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';

const Verify = props => {
  const { value, onChange } = props;

  const debouncedHandleUpdateInput = useCallback(
    debounce(
      newValue => {
        if (JSON.stringify(flatten([value])) !== JSON.stringify(flatten([newValue]))) {
          onChange(newValue);
        }
      },
      300,
      { trailing: true }
    ), [props.value])

  useEffect(() => {
    return debouncedHandleUpdateInput.cancel();
  }, [])

  const [controlledError, setControlledError] = useState('');
  const [controlledValue, setControlledValue] = useState(value);

  const handleOnChange = event => {
    const validator = { validate: () => true };
    const { target } = event;
    const { value } = target;
    if (true || validator.validate(value)) {
      debouncedHandleUpdateInput(value);
      setControlledError('')
      setControlledValue(value)
    } else {
      setControlledError('failed')
      setControlledValue(value)
    }
  };

  return (
    React.cloneElement(props.children, props = {
      ...props,
      value: controlledValue,
      error: controlledError,
      onChange: handleOnChange,
    })
  )
}

export default Verify;
