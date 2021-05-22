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

  const [errors, setErrors] = useState({ programProvide: 0, programProvideSpecify: 0, studentInterest: 0, studentAttendFrequency: 0, studentAttendTimes: 0, studentTransportation: 0, studentActivities: 0, interestTIV: 0 });
  const { programProvide, programProvideSpecify, studentInterest, studentAttendFrequency, studentAttendFrequencyCheck, studentAttendTimes, studentTransportation, studentActivities, interestTIV, interestTIVCheck } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value })
  };
  const handlePrevious = () => setPage(2);
  const handleSubmit = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        (((field === 'studentTransportation') || (field === 'interestTIV')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (((field === 'studentAttendTimes') || (field === 'studentActivities')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1))) ||
        ((field === 'programProvide') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0) || !otherCheck(surveyValues[field])) ||
        (
          (field === 'programProvideSpecify') &&
          ((typeof surveyValues['programProvide'] === 'object') && (surveyValues['programProvide'] !== null)) &&
          Object.values(surveyValues['programProvide'])[0] === 'Yes' &&
          !Object.values(surveyValues[field]).includes(1)
        ) ||
        ((field === 'studentInterest') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1)) || !otherCheck(surveyValues[field])) ||
        ((field === 'studentAttendFrequency') && !surveyValues[field] && !surveyValues['studentAttendFrequencyCheck'])
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
  const handleSetCheckbox = (fieldCheck, checkState) => setSurveyValues({ [fieldCheck]: checkState });
  const handleSetCheckboxDisabler = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      setSurveyValues({ [fieldName]: '' });
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

  const programProvideOptions = {
    fieldName: 'programProvide',
    fieldValue: programProvide,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true,
    otherOptions: {
      'name': 'Other',
      'placeholder': 'E.g. Psychology, Performing Arts'
    }
  };
  const programProvideSpecifyOptions = {
    fieldName: 'programProvideSpecify',
    fieldValue: programProvideSpecify,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Business', 'Tech', 'STEM/STEAM'
    ]
  };
  const studentInterestOptions = {
    className: 'student-interest',
    fieldName: 'studentInterest',
    fieldValue: studentInterest,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Computer Programming', 'Design', 'Robotics', 'Engineering',
      'Artificial Intelligence', 'Cyber Security', 'Nanotechnology', 'Nanoscience'
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': 'E.g. Psychology, Performing Arts'
    }
  };
  const studentAttendFrequencyCheckOptions = {
    className: 'inline-disabler',
    fieldName: 'studentAttendFrequencyCheck',
    fieldValue: studentAttendFrequencyCheck,
    fieldLabel: 'I\'m not interested in a partnership.',
    setFieldValue: handleSetCheckboxDisabler
  };
  const studentAttendTimesOptions = {
    className: 'student-attend-times',
    fieldName: 'studentAttendTimes',
    fieldValue: studentAttendTimes,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      '8:30 AM - 11:30 AM', '12:00 PM - 3:00 PM', '3:30 PM - 6:30 PM'
    ],
    noneOptions: {
      'name': 'None'
    }
  };
  const studentTransportationOptions = {
    fieldName: 'studentTransportation',
    fieldValue: studentTransportation,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No', 'Sometimes'
    ],
    exclusive: true
  };
  const studentActivitiesOptions = {
    fieldName: 'studentActivities',
    fieldValue: studentActivities,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Project Collaborations', 'Panel Discussions', 'Competitions',
      'Lectures', 'Mentoring', 'Training', 'Tours',
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
    },
    noneOptions: {
      'name': 'I\'m Unsure'
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
    <div className='organization-page-3-container'>
      <h1>Partnership</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['programProvide'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Does the school/organization provide business, tech, STEM/STEAM or other programs?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={programProvideOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['programProvide'] === 'object') && (surveyValues['programProvide'] !== null)) && Object.values(surveyValues['programProvide'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['programProvideSpecify'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>Which programs?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={programProvideSpecifyOptions} />
          </div>
        </Tooltip> : ''}
        <Tooltip arrow={true} open={errors['studentInterest'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What tech-based subject-matters or industries are of the most interest to your students?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={studentInterestOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['studentAttendFrequency'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>About how many days per month can students attend TIV programs?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <p className={'inline-input' + (studentAttendFrequencyCheck ? ' disabled' : '')}>
              Students can attend about <input type='number' min='0' max='30' name='studentAttendFrequency' value={studentAttendFrequency || ''} onChange={e => handleChange(e)} disabled={studentAttendFrequencyCheck} /> days per month.
            </p>
            <Checkbox options={studentAttendFrequencyCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['studentAttendTimes'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What day(s) and time(s) would your students be able to attend a TIV program?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={studentAttendTimesOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['studentTransportation'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you able to provide transportation (i.e. bus, van, car, etc.) for students?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={studentTransportationOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['studentActivities'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What types of activities would your students benefit from?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={studentActivitiesOptions} />
          </div>
        </Tooltip>
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
          onClick={() => handleSubmit([])}>
          SUBMIT
        </button>
      </div>
    </div>
  )
}
