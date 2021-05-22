import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import BlockSelection from '../BlockSelection';
import Checkbox from '../Checkbox';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setSurvey, setPage, setLogo, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ interestAttend: 0, attendMeetPref: 0, attendTimePref: 0, participateFrequency: 0, interestTIV: 0 });
  const { interestAttend, attendMeetPref, attendTimePref, participateFrequency, additionalComments, charRemain, interestTIV, interestTIVCheck } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value })
  };
  const handlePrevious = () => setPage(3);
  const handleSubmit = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        (((field === 'interestAttend') || (field === 'attendMeetPref') || (field === 'interestTIV')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (((field === 'attendTimePref') || (field === 'participateFrequency')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1))) ||
        ((field !== 'interestAttend') && (field !== 'attendMeetPref') && (field !== 'attendTimePref') && (field !== 'participateFrequency') && (field !== 'interestTIV') && !surveyValues[field])
      ) {
        newErrors = Object.assign({}, newErrors, { [field]: 1 });
        isError = true;
      } else {
        newErrors = Object.assign({}, newErrors, { [field]: 0 });
      }
    }

    setErrors(newErrors);
    if (!isError) {
      props.submit();
      setLogo('img/logo_only.png');
      setSurvey('thanks');
    }
  };

  const handleSetBlocks = (fieldName, blockValues) => setSurveyValues({ [fieldName]: blockValues });
  const handleTextArea = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ ['additionalComments']: value })
    setSurveyValues({ ['charRemain']: 400 - value.length })
  };
  const handleSetCheckbox = (fieldCheck, checkState) => setSurveyValues({ [fieldCheck]: checkState })
  const handleSetCheckboxDisabler = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      setSurveyValues({ [fieldName]: '' });
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

  const interestAttendOptions = {
    className: 'interest-attend',
    fieldName: 'interestAttend',
    fieldValue: interestAttend,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No', 'I already attend instructional programs'
    ],
    exclusive: true
  };
  const attendMeetPrefOptions = {
    fieldName: 'attendMeetPref',
    fieldValue: attendMeetPref,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Face-to-face', 'Online', 'Both/Hybrid'
    ],
    exclusive: true
  };
  const attendTimePrefOptions = {
    fieldName: 'attendTimePref',
    fieldValue: attendTimePref,
    setFieldValue: handleSetBlocks,
    blocks: [
      'School Hours', 'Afterschool', 'Weekends', 'Summer Semester'
    ],
    noneOptions: {
      'name': 'None'
    }
  };
  const participateFrequencyOptions = {
    fieldName: 'participateFrequency',
    fieldValue: participateFrequency,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Daily', 'Weekly', 'Monthly'
    ],
    noneOptions: {
      'name': 'None'
    }
  };
  const interestTIVOptions = {
    fieldName: 'interestTIV',
    fieldValue: interestTIV,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const interestTIVCheckOptions = {
    className: 'interest-tiv-check',
    fieldName: 'interestTIVCheck',
    fieldValue: interestTIVCheck,
    fieldLabel: 'I would like to receive updates regarding TIV.',
    setFieldValue: handleSetCheckbox,
  };

  return (
    <div className='learner-page-4-container'>
      <h1>Programs</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['interestAttend'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in or would you be willing to attend instructional programs outside of your typical school schedule to enhance your educational or career opportunities?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestAttendOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['attendMeetPref'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Which would you prefer when attending these instructional programs?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={attendMeetPrefOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['attendTimePref'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What times would you prefer when attending these programs?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={attendTimePrefOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['participateFrequency'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How often would you prefer to participate in these programs?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={participateFrequencyOptions} />
          </div>
        </Tooltip>
        <div className='question-container'>
          <h2>Is there anything else about you would like to have access to or participate in regarding your education or professional development?</h2>
          <div className='textarea-container'>
            <textarea maxLength='400' name='additionalComments' wrap='soft' rows='5' value={additionalComments} onChange={e => handleTextArea(e)} />
            <span className='char-remain'>{charRemain}</span>
          </div>
        </div>
        <Tooltip arrow={true} open={errors['interestTIV'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Would you be interested in learning more about TIV and how our company can help make an impact?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestTIVOptions} />
          </div>
        </Tooltip>
        <div className='question-container'>
          <Checkbox options={interestTIVCheckOptions} />
        </div>
      </div>
      <div className='btn-container'>
        <button className='btn-prev' type='button'
          onClick={() => handlePrevious()}>
          Previous
        </button>
        <button className='btn-submit' type='button'
          onClick={() => handleSubmit()}>
          SUBMIT
        </button>
      </div>
    </div>
  )
}
