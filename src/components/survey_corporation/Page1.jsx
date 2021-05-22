import React, { useState, useReducer, useEffect } from 'react';
import Select from 'react-select';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';

export default props => {
  const { setSurvey, setPage, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  )
  const [errors, setErrors] = useState({ name: 0, email: 0, companyName: 0, affiliation: 0, industry: 0, city: 0, state: 0, url: 0 })
  const { name, email, companyName, affiliation, industry, city, state, url } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value });
  };
  const handlePrevious = () => setSurvey('Landing');
  const handleNext = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (!surveyValues[field]) {
        newErrors = Object.assign({}, newErrors, { [field]: 1 });
        isError = true;
      } else {
        newErrors = Object.assign({}, newErrors, { [field]: 0 });
      }
    }

    setErrors(newErrors);
    if (!isError) setPage(2);
  };

  const handleSelect = (opt, field) => setSurveyValues({ [field]: opt['value'] });

  const stateOptions = [
    {value: 'Alabama', label: 'Alabama'}, {value: 'Alaska', label: 'Alaska'}, {value: 'Arizona', label: 'Arizona'}, {value: 'Arkansas', label: 'Arkansas'}, {value: 'California', label: 'California'},
    {value: 'Colorado', label: 'Colorado'}, {value: 'Connecticut', label: 'Connecticut'}, {value: 'Delaware', label: 'Delaware'}, {value: 'Florida', label: 'Florida'}, {value: 'Georgia', label: 'Georgia'},
    {value: 'Hawaii', label: 'Hawaii'}, {value: 'Idaho', label: 'Idaho'}, {value: 'Illinois', label: 'Illinois'}, {value: 'Indiana', label: 'Indiana'}, {value: 'Iowa', label: 'Iowa'},
    {value: 'Kansas', label: 'Kansas'}, {value: 'Kentucky', label: 'Kentucky'}, {value: 'Louisiana', label: 'Louisiana'}, {value: 'Maine', label: 'Maine'}, {value: 'Maryland', label: 'Maryland'},
    {value: 'Massachusetts', label: 'Massachusetts'}, {value: 'Michigan', label: 'Michigan'}, {value: 'Minnesota', label: 'Minnesota'}, {value: 'Mississippi', label: 'Mississippi'}, {value: 'Missouri', label: 'Missouri'},
    {value: 'Montana', label: 'Montana'}, {value: 'Nebraska', label: 'Nebraska'}, {value: 'Nevada', label: 'Nevada'}, {value: 'New Hampshire', label: 'New Hampshire'}, {value: 'New Jersey', label: 'New Jersey'},
    {value: 'New Mexico', label: 'New Mexico'}, {value: 'New York', label: 'New York'}, {value: 'North Carolina', label: 'North Carolina'}, {value: 'North Dakota', label: 'North Dakota'}, {value: 'Ohio', label: 'Ohio'},
    {value: 'Oklahoma', label: 'Oklahoma'}, {value: 'Oregon', label: 'Oregon'}, {value: 'Pennsylvania', label: 'Pennsylvania'}, {value: 'Rhode Island', label: 'Rhode Island'}, {value: 'South Carolina', label: 'South Carolina'},
    {value: 'South Dakota', label: 'South Dakota'}, {value: 'Tennessee', label: 'Tennessee'}, {value: 'Texas', label: 'Texas'}, {value: 'Utah', label: 'Utah'}, {value: 'Vermont', label: 'Vermont'},
    {value: 'Virginia', label: 'Virginia'}, {value: 'Washington', label: 'Washington'}, {value: 'West Virginia', label: 'West Virginia'}, {value: 'Wisconsin', label: 'Wisconsin'}, {value: 'Wyoming', label: 'Wyoming'}
  ];

  return (
    <div className='corporation-page-1-container'>
      <h1>Tell us about yourself</h1>
      <h2>Basic information</h2>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['name'] ? true : false} placement='top-start' title='Required'>
          <label>Name
            <input type='text' name='name' value={name || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['email'] ? true : false} placement='top-start' title='Required'>
          <label>Email
            <input className={errors['email'] ? 'error' : ''} type='text' name='email' value={email || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['companyName'] ? true : false} placement='top-start' title='Required'>
          <label>Company Name
            <input className={errors['companyName'] ? 'error' : ''} type='text' name='companyName' value={companyName || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['affiliation'] ? true : false} placement='top-start' title='Required'>
          <label>Affiliation/Title
            <input className={errors['affiliation'] ? 'error' : ''} type='text' name='affiliation' value={affiliation || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['industry'] ? true : false} placement='top-start' title='Required'>
          <label>Industry
            <input className={errors['industry'] ? 'error' : ''} type='text' name='industry' value={industry || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['city'] ? true : false} placement='top-start' title='Required'>
          <label>City
            <input className={errors['city'] ? 'error' : ''} type='text' name='city' value={city || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['state'] ? true : false} placement='top-start' title='Required'>
          <label>State
            <Select className='select-container' classNamePrefix='react-select'
              options={stateOptions}
              placeholder='Please Select' value={state ? { value: state, label: state } : ''}
              onChange={opt => handleSelect(opt, 'state')}/>
          </label>
        </Tooltip>
        <Tooltip arrow={true} open={errors['url'] ? true : false} placement='top-start' title='Required'>
          <label>Company Website URL
            <input className={errors['url'] ? 'error' : ''} type='text' name='url' value={url || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
      </div>
      <div className='btn-container'>
        <button className='btn-prev' type='button'
          onClick={() => handlePrevious()}>
          Previous
        </button>
        <button className='btn-next' type='button'
          onClick={() => handleNext()}>
          Next
        </button>
      </div>
    </div>
  )
}
