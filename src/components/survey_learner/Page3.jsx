import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Slider } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import BlockSelection from '../BlockSelection';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setPage, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ classToBusiness: 0, classToTechnology: 0, collaborateWithPeers: 0, professionalMentorship: 0, collaboratingContact: 0, timeRemote: 0, activitiesEnjoy: 0 });
  const { classToBusiness, classToBusinessCheck, classToTechnology, classToTechnologyCheck, collaborateWithPeers, collaborateWithPeersCheck, professionalMentorship, professionalMentorshipCheck, collaboratingContact, timeRemote, timeRemoteCheck, activitiesEnjoy } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value })
  };
  const handlePrevious = () => setPage(2);
  const handleNext = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        ((field === 'classToBusiness') && !surveyValues[field] && !surveyValues['classToBusinessCheck']) ||
        ((field === 'classToTechnology') && !surveyValues[field] && !surveyValues['classToTechnologyCheck']) ||
        ((field === 'collaborateWithPeers') && !surveyValues[field] && !surveyValues['collaborateWithPeersCheck']) ||
        ((field === 'professionalMentorship') && !surveyValues[field] && !surveyValues['professionalMentorshipCheck']) ||
        ((field === 'collaboratingContact') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        ((field === 'timeRemote') && !surveyValues[field] && !surveyValues['timeRemoteCheck']) ||
        ((field === 'activitiesEnjoy') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1)) || !otherCheck(surveyValues[field])) ||
        ((field !== 'classToBusiness') && (field !== 'classToTechnology') && (field !== 'collaborateWithPeers') && (field !== 'professionalMentorship') && (field !== 'collaboratingContact') && (field !== 'timeRemote') && (field !== 'activitiesEnjoy') && !surveyValues[field])
      ) {
        newErrors = Object.assign({}, newErrors, { [field]: 1 });
        isError = true;
      } else {
        newErrors = Object.assign({}, newErrors, { [field]: 0 });
      }
    }

    setErrors(newErrors);
    if (!isError) setPage(4);
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
  const handleSetCheckbox = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      setSurveyValues({ [fieldName]: '' });
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

  const classToBusinessOptions = {
    fieldName: 'classToBusiness',
    fieldValue: classToBusiness,
    sliderLabels: ['Not related', 'Somewhat related', 'Strongly related'],
    setFieldValue: handleChange,
    disabled: classToBusinessCheck
  };
  const classToBusinessCheckOptions = {
    fieldName: 'classToBusinessCheck',
    fieldValue: classToBusinessCheck,
    fieldLabel: 'I\'m currently not enrolled in any classes or instructional programs.',
    setFieldValue: handleSetCheckbox,
  };
  const classToTechnologyOptions = {
    fieldName: 'classToTechnology',
    fieldValue: classToTechnology,
    sliderLabels: ['Not related', 'Somewhat related', 'Strongly related'],
    setFieldValue: handleChange,
    disabled: classToTechnologyCheck
  };
  const classToTechnologyCheckOptions = {
    fieldName: 'classToTechnologyCheck',
    fieldValue: classToTechnologyCheck,
    fieldLabel: 'I\'m currently not enrolled in any classes or instructional programs.',
    setFieldValue: handleSetCheckbox,
  };
  const collaborateWithPeersOptions = {
    fieldName: 'collaborateWithPeers',
    fieldValue: collaborateWithPeers,
    sliderLabels: ['Rarely', 'Sometimes', 'Frequently'],
    setFieldValue: handleChange,
    disabled: collaborateWithPeersCheck
  };
  const collaborateWithPeersCheckOptions = {
    fieldName: 'collaborateWithPeersCheck',
    fieldValue: collaborateWithPeersCheck,
    fieldLabel: 'I do not currently collaborate with anyone.',
    setFieldValue: handleSetCheckbox,
  };
  const professionalMentorshipOptions = {
    fieldName: 'professionalMentorship',
    fieldValue: professionalMentorship,
    sliderLabels: ['Rarely', 'Sometimes', 'Frequently'],
    setFieldValue: handleChange,
    disabled: professionalMentorshipCheck
  };
  const professionalMentorshipCheckOptions = {
    fieldName: 'professionalMentorshipCheck',
    fieldValue: professionalMentorshipCheck,
    fieldLabel: 'I do not currently have a mentor.',
    setFieldValue: handleSetCheckbox,
  };
  const collaboratingContactOptions = {
    fieldName: 'collaboratingContact',
    fieldValue: collaboratingContact,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Face-to-face', 'Online', 'Both/Hybrid'
    ],
    exclusive: true,
    noneOptions: {
      'name': 'None'
    }
  };
  const timeRemoteOptions = {
    max: 100,
    min: 1,
    onChange: (e, val) => setSurveyValues({ ['timeRemote']: val }),
    value: timeRemote || 1,
    valueLabelDisplay: 'on',
    valueLabelFormat: num => num + '%',
  };
  const timeRemoteCheckOptions = {
    fieldName: 'timeRemoteCheck',
    fieldValue: timeRemoteCheck,
    fieldLabel: 'I do not work online.',
    setFieldValue: handleSetCheckbox,
  };
  const activitiesEnjoyOptions = {
    fieldName: 'activitiesEnjoy',
    fieldValue: activitiesEnjoy,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Interactive', 'Project-Based', 'Lecture',
      'Panel Discussions', 'Presentations', 'Independent Assignments'
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
    }
  };

  const sliderLabelEndStyle = () =>
    timeRemote >= (isTabletorMobile ? 96 : 98) ? {'color': 'transparent', 'user-select': 'none'} : {};

  return (
    <div className='learner-page-3-container'>
      <h1>Business and Technology</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['classToBusiness'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How much are your classes related to business?</h2>
            <h3 className='txt-clarify'>E.g. Standard business practices, business plans, pitch presentations, market research, data analysis, surveys, etc.</h3>
            <Radio options={classToBusinessOptions} />
            <Checkbox options={classToBusinessCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['classToTechnology'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How much are your classes related to technology?</h2>
            <h3 className='txt-clarify'>E.g. Coding, app development, technology platforms, digital marketing, fashion 3D printing, etc</h3>
            <Radio options={classToTechnologyOptions} />
            <Checkbox options={classToTechnologyCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['collaborateWithPeers'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How often do you collaborate with your peers on assignments or projects?</h2>
            <h3 className='txt-clarify'>E.g. Online or in-person</h3>
            <Radio options={collaborateWithPeersOptions} />
            <Checkbox options={collaborateWithPeersCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['professionalMentorship'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How often have you had an industry professional mentor you?</h2>
            <h3 className='txt-clarify'>E.g. Industry veterans, specific domain experts, entrepreneurs, etc.</h3>
            <Radio options={professionalMentorshipOptions} />
            <Checkbox options={professionalMentorshipCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['collaboratingContact'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Which do you prefer when learning or collaborating with others?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={collaboratingContactOptions} />
          </div>
        </Tooltip>
        <div className='question-container'>
          <h2>How much time do you spend working online/remotely?</h2>
          <div className={'wrapper' + (timeRemoteCheck ? ' disabled' : '')}>
            <div className='slider-value-labels'>
              <span>1%</span>
              <span style={sliderLabelEndStyle()}>100%</span>
            </div>
            <Slider max={timeRemoteOptions['max']} min={timeRemoteOptions['min']}
              onChange={timeRemoteOptions['onChange']}
              value={timeRemoteOptions['value'] || 1}
              valueLabelDisplay={timeRemoteOptions['valueLabelDisplay']}
              valueLabelFormat={timeRemoteOptions['valueLabelFormat']}
              disabled={timeRemoteCheck ? true : false} />
            <div className='slider-labels'>
              <span>Almost never</span>
              <span>Somewhat frequently</span>
              <span>Fully online</span>
            </div>
          </div>
          <Checkbox options={timeRemoteCheckOptions} />
        </div>
        <Tooltip arrow={true} open={errors['activitiesEnjoy'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What kinds of activities do you like most?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={activitiesEnjoyOptions} />
          </div>
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
