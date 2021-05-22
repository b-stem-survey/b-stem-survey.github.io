import React from 'react';

export default props => {
  const { fieldName, fieldValue, sliderLabels, setFieldValue, disabled } = props.options;

  let radioWidth = 'calc((100% - 16px)*' + (1 - 0.25*Math.max(0, fieldValue - 1)) + ')';

  const handleChange = e => setFieldValue(e);

  return <div className='radio-container'>
    <div className={'radio-buttons' + (disabled ? ' disabled' : '')}>
      <div className='radio-group gfirst'>
        <span className='radio-label gfirst'>1</span>
        <div className='radio'>
          <input id={fieldName + '-1'} type='radio' name={fieldName} value='1' checked={fieldValue === '1'} disabled={disabled}
            onChange={e => handleChange(e)} />
          <label htmlFor={fieldName + '-1'}></label>
        </div>
      </div>
      <div className='radio-group'>
        <span className='radio-label'>2</span>
        <div className='radio'>
          <input id={fieldName + '-2'} type='radio' name={fieldName} value='2' checked={fieldValue === '2'} disabled={disabled}
            onChange={e => handleChange(e)} />
          <label htmlFor={fieldName + '-2'}></label>
        </div>
      </div>
      <div className='radio-group'>
        <span className='radio-label'>3</span>
        <div className='radio'>
          <input id={fieldName + '-3'} type='radio' name={fieldName} value='3' checked={fieldValue === '3'} disabled={disabled}
            onChange={e => handleChange(e)} />
          <label htmlFor={fieldName + '-3'}></label>
        </div>
      </div>
      <div className='radio-group'>
        <span className='radio-label'>4</span>
        <div className='radio'>
          <input id={fieldName + '-4'} type='radio' name={fieldName} value='4' checked={fieldValue === '4'} disabled={disabled}
            onChange={e => handleChange(e)} />
          <label htmlFor={fieldName + '-4'}></label>
        </div>
      </div>
      <div className='radio-group glast'>
        <span className='radio-label glast'>5</span>
        <div className='radio'>
          <input id={fieldName + '-5'} type='radio' name={fieldName} value='5' checked={fieldValue === '5'} disabled={disabled}
            onChange={e => handleChange(e)} />
          <label htmlFor={fieldName + '-5'}></label>
        </div>
      </div>
    </div>
    <div className={'radio-auxiliary' + (disabled ? ' disabled' : '')}>
      <div className='radio-progress'></div>
      <div className='radio-remaining' style={{width: radioWidth}}></div>
      <div className='slider-labels'>
        <span>{sliderLabels[0]}</span>
        <span>{sliderLabels[1]}</span>
        <span>{sliderLabels[2]}</span>
      </div>
    </div>
  </div>
}
