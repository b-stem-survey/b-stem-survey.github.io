import React, { useState, useEffect } from 'react';

export default props => {
  const { className, fieldName, fieldValue, fieldLabel, setFieldValue } = props.options;
  const [check, setCheck] = useState(fieldValue);

  const handleToggle = () => setCheck(check ? 0 : 1);

  useEffect(() => setFieldValue(fieldName, check), [check])

  return <div className={'checkbox-container' + (className ? ' ' + className : '')}>
    <input type='checkbox' name={fieldName} checked={check || ''} onChange={() => handleToggle()} />
    <label>{fieldLabel}</label>
  </div>
}
