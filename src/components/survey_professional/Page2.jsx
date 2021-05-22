import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import BlockSelection from '../BlockSelection';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setPage, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ industryWork: 0, yourProfession: 0, professionalUrl: 0, areasExpertise: 0, volunteer: 0, volunteerLevel: 0, volunteerFrequency: 0 })
  const { industryWork, yourProfession, professionalUrl, areasExpertise, volunteer, volunteerLevel, volunteerFrequencyAmount, volunteerFrequencyTime } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value });
  };
  const handlePrevious = () => setPage(1);
  const handleNext = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        (
          (field === 'industryWork') &&
          ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) &&
          (Object.values(surveyValues[field]).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) !== 3) ||
          ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null) && !otherCheck(surveyValues[field]))
        ) ||
        ((field === 'volunteer') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (
          (field === 'volunteerLevel') &&
          ((typeof surveyValues['volunteer'] === 'object') && (surveyValues['volunteer'] !== null)) &&
          Object.values(surveyValues['volunteer'])[0] === 'Yes' &&
          !Object.values(surveyValues[field]).includes(1)
        ) ||
        (
          (field === 'volunteerFrequency') &&
          ((typeof surveyValues['volunteer'] === 'object') && (surveyValues['volunteer'] !== null)) &&
          Object.values(surveyValues['volunteer'])[0] === 'Yes' &&
          (!surveyValues['volunteerFrequencyAmount'] || !Object.values(surveyValues['volunteerFrequencyTime']).length > 0)
        ) ||
        ((field !== 'industryWork') && (field !== 'subjectsPlanned') && (field !== 'industryInterested') && (field !== 'subjectsOther') && (field !== 'industryExposed') && (field !== 'volunteer') && (field !== 'volunteerLevel') && (field !== 'volunteerFrequency') && !surveyValues[field])
      ) {
        newErrors = Object.assign({}, newErrors, { [field]: 1 });
        isError = true;
      } else {
        newErrors = Object.assign({}, newErrors, { [field]: 0 });
      }
    }

    setErrors(newErrors);
    if (!isError) setPage(3);
  };

  const handleSetBlocks = (fieldName, blockValues) => setSurveyValues({ [fieldName]: blockValues });
  const otherCheck = surveyBlockValue => {
    // return true if (Other is NOT selected) or if (Other IS selected and Other-Text IS filled)
    // return false if (Other IS selected and Other-Text is NOT filled)
    if (!((typeof surveyBlockValue === 'object') && (surveyBlockValue !== null))) {
      return true
    }
    let keys = Object.keys(surveyBlockValue);
    if (
      (keys.includes('Other') && surveyBlockValue['Other']) ||
      (keys.includes('exclusive') && (surveyBlockValue['exclusive'] === 'Other'))
    ) {
      return keys.includes('Other-Text') && (surveyBlockValue['Other-Text'] !== '')
    }
    return true
  };

  const industryWorkOptions = {
    fieldName: 'industryWork',
    fieldValue: industryWork,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Business', 'Science', 'Technology', 'Engineering',
      'Math', 'Art', 'Music', 'History',
      'Leadership', 'Literature', 'Education', 'Computer Programming',
      'Marketing', 'Foreign Language', 'Health', 'Design'
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': 'E.g. Psychology, Performing Arts'
    }
  };
  const volunteerOptions = {
    fieldName: 'volunteer',
    fieldValue: volunteer,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const volunteerLevelOptions = {
    fieldName: 'volunteerLevel',
    fieldValue: volunteerLevel,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Introductory', 'Intermediate', 'Advanced'
    ]
  };
  const volunteerFrequencyTimeOptions = {
    fieldName: 'volunteerFrequencyTime',
    fieldValue: volunteerFrequencyTime,
    setFieldValue: handleSetBlocks,
    blocks: [
      'week', 'month', 'year'
    ],
    exclusive: true,
    merge: true
  };


  return (
    <div className='professional-page-2-container'>
      <h1>Professional Info</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['industryWork'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What industry(s) do you work in?</h2>
            <h3 className='txt-block-select'>Please select the top three choices that apply:</h3>
            <BlockSelection options={industryWorkOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['yourProfession'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is your profession?</h2>
            <input className='w-full'
              type='text' name='yourProfession' value={yourProfession || ''} placeholder='E.g. Business, fashion design' onChange={e => handleChange(e)} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['professionalUrl'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is your Linkedin or professional URL?</h2>
            <input className='w-full'
              type='text' name='professionalUrl' value={professionalUrl || ''} placeholder='' onChange={e => handleChange(e)} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['areasExpertise'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What are your areas of expertise?</h2>
            <h3>Please list up to six:</h3>
            <div className='textarea-container'>
              <textarea maxLength='200' name='areasExpertise' wrap='soft' rows='2' value={areasExpertise || ''} onChange={e => handleChange(e)} />
            </div>
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['volunteer'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Do you currently volunteer your time or expertise to help develop emerging youth, such as by being an instructor, mentor, speaker, etc.?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={volunteerOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['volunteer'] === 'object') && (surveyValues['volunteer'] !== null)) && Object.values(surveyValues['volunteer'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['volunteerLevel'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>What level of instruction do you volunteer for?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={volunteerLevelOptions} />
          </div>
        </Tooltip> : ''}
        {((typeof surveyValues['volunteer'] === 'object') && (surveyValues['volunteer'] !== null)) && Object.values(surveyValues['volunteer'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['volunteerFrequency'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>About how many times per week, month, or year?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <p className='inline-input'>
              I volunteer about <input type='number' min='0' name='volunteerFrequencyAmount' value={volunteerFrequencyAmount || ''} onChange={e => handleChange(e)} /> times per <BlockSelection options={volunteerFrequencyTimeOptions} />
            </p>
          </div>
        </Tooltip> : ''}
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
