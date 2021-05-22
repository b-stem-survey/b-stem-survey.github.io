import React, { useState, useReducer, useEffect } from 'react';
import Select from 'react-select';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import Checkbox from '../Checkbox';

export default props => {
  const { setSurvey, setPage, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  )
  const [errors, setErrors] = useState({ name: 0, email: 0, city: 0, state: 0, age: 0, school: 0, educationLevel: 0 });
  const { name, email, city, state, age, gender, ethnicity, school, schoolCheck, educationLevel } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value });
  };
  const handlePrevious = () => setSurvey('Landing');
  const handleNext = exclusions => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        ((field === 'age') && (!surveyValues[field] || (surveyValues[field] < 1 || surveyValues[field] > 100))) ||
        ((field === 'school') && !surveyValues[field] && !surveyValues['schoolCheck']) ||
        ((field !== 'age') && (field !== 'school') && !surveyValues[field])
      ) {
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
  const handleSetCheckbox = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      setSurveyValues({ [fieldName]: '' });
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

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
  const genderOptions = [
    {value: 'Female', label: 'Female'}, {value: 'Male', label: 'Male'},
    {value: 'Non-binary', label: 'Non-binary'}, {value: 'Transgender', label: 'Transgender'},
    {value: 'Intersex', label: 'Intersex'}, {value: 'I prefer not to say', label: 'I prefer not to say'}
  ];
  const ethnicityOptions = [
    {value: 'Asian or Pacific Islander', label: 'Asian or Pacific Islander'},
    {value: 'Black or African American', label: 'Black or African American'},
    {value: 'Hispanic or Latino', label: 'Hispanic or Latino'},
    {value: 'Native American or Alaskan Native', label: 'Native American or Alaskan Native'},
    {value: 'White or Caucasian', label: 'White or Caucasian'},
    {value: 'Multiracial or Biracial', label: 'Multiracial or Biracial'},
    {value: 'A race/ethnicity not listed here', label: 'A race/ethnicity not listed here'}
  ];
  const schoolOptions= {
    fieldName: 'schoolCheck',
    fieldValue: schoolCheck,
    fieldLabel: 'I\'m not in school or part of an academic institution',
    setFieldValue: handleSetCheckbox,
  };
  const educationLevelOptions = [
    {value: 'No schooling completed', label: 'No schooling completed'},
    {value: 'Nursery school to 8th grade', label: 'Nursery school to 8th grade'},
    {value: 'Some high school, no diploma', label: 'Some high school, no diploma'},
    {value: 'High school graduate or equivalent', label: 'High school graduate or equivalent'},
    {value: 'Some college credit, no degree', label: 'Some college credit, no degree'},
    {value: 'Trade/technical/vocational training', label: 'Trade/technical/vocational training'},
    {value: 'Associate degree', label: 'Associate degree'},
    {value: 'Bachelor’s degree', label: 'Bachelor’s degree'},
    {value: 'Master’s degree', label: 'Master’s degree'},
    {value: 'Professional degree', label: 'Professional degree'},
    {value: 'Doctorate degree', label: 'Doctorate degree'},
  ];

  return (
    <div className='learner-page-1-container'>
      <h1>Tell us about yourself</h1>
      <h2>Basic information</h2>
      <h3>This form must be filled out by a parent or guardian if the Participant is underage.</h3>
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
        <Tooltip arrow={true} open={errors['age'] ? true : false} placement='top-start' title='Required'>
          <label>Age
            <input className={errors['age'] ? 'error' : ''} type='number' min='1' max='100' name='age' value={age || ''} onChange={e => handleChange(e)} />
          </label>
        </Tooltip>
        <label>Gender (Optional)
          <Select className='select-container' classNamePrefix='react-select'
            options={genderOptions}
            placeholder='Please Select' value={gender ? { value: gender, label: gender } : ''}
            onChange={opt => handleSelect(opt, 'gender')}/>
        </label>
        <label>Ethnicity (Optional)
          <Select className='select-container' classNamePrefix='react-select'
            options={ethnicityOptions}
            placeholder='Please Select' value={ethnicity ? { value: ethnicity, label: ethnicity } : ''}
            onChange={opt => handleSelect(opt, 'ethnicity')}/>
        </label>
        <div className='checkbox-wrapper'>
          <Tooltip arrow={true} open={errors['school'] ? true : false} placement='top-start' title='Required'>
            <label>School or Academic Institution
              <input className={schoolCheck ? 'disabled' : ''}
                disabled={schoolCheck} type='text' name='school' value={school || ''} onChange={e => handleChange(e)} />
            </label>
          </Tooltip>
          <Checkbox options={schoolOptions} />
        </div>
        <Tooltip arrow={true} open={errors['educationLevel'] ? true : false} placement='top-start' title='Required'>
          <label>Education Level
            <Select className='select-container' classNamePrefix='react-select'
              options={educationLevelOptions}
              placeholder='Please Select' value={educationLevel ? { value: educationLevel, label: educationLevel } : ''}
              onChange={opt => handleSelect(opt, 'educationLevel')}/>
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
