import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import BlockSelection from '../BlockSelection';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setSurvey, setPage, setLogo, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ volunteerInterest: 0, volunteerWay: 0, subjectsInterested: 0, levelInstruction: 0, volunteerAmount: 0, timesAvailable: 0, ageGroups: 0, importanceTeach: 0, interestTIV: 0 });
  const { volunteerInterest, volunteerWay, subjectsInterested, levelInstruction, volunteerAmountMonth, volunteerAmountWeek, volunteerAmountCheck, timesAvailable, ageGroups, importanceTeach, importanceTeachComments, charRemain, interestTIV, interestTIVCheck } = surveyValues;

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
        (((field === 'volunteerInterest') || (field === 'interestTIV')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (((field === 'levelInstruction') || (field === 'timesAvailable') || (field === 'ageGroups')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1))) ||
        ((field === 'volunteerWay') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0) || !otherCheck(surveyValues[field])) ||
        ((field === 'subjectsInterested') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1)) || !otherCheck(surveyValues[field])) ||
        ((field === 'volunteerAmount') && (!surveyValues['volunteerAmountMonth'] || !surveyValues['volunteerAmountWeek']) && !surveyValues['volunteerAmountCheck']) ||
        ((field !== 'volunteerInterest') && (field !== 'volunteerWay') && (field !== 'subjectsInterested') && (field !== 'levelInstruction') && (field !== 'volunteerAmount') && (field !== 'interestTIV') && !surveyValues[field])
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
  const handleTextArea = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ ['importanceTeachComments']: value })
    setSurveyValues({ ['charRemain']: 400 - value.length })
  };
  const handleSetCheckbox = (fieldCheck, checkState) => setSurveyValues({ [fieldCheck]: checkState });
  const handleSetCheckboxDisabler = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      if (fieldCheck === 'volunteerAmountCheck') {
        setSurveyValues({ ['volunteerAmountMonth']: '' });
        setSurveyValues({ ['volunteerAmountWeek']: '' });
      } else {
        setSurveyValues({ [fieldName]: '' });
      }
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

  const volunteerInterestOptions = {
    className: 'volunteer-interest',
    fieldName: 'volunteerInterest',
    fieldValue: volunteerInterest,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No', 'I already volunteer to develop emerging youth'
    ],
    exclusive: true
  };
  const volunteerWayOptions = {
    className: 'volunteer-way',
    fieldName: 'volunteerWay',
    fieldValue: volunteerWay,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Creating Instructional Programs', 'Designing Curriculum for Programs',
      'Instructor for Programs', 'Mentor During Programs',
      'Speaker During Programs', 'Lecturer During Programs'
    ],
    exclusive: true,
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
    },
    noneOptions: {
      'name': 'None'
    }
  };
  const subjectsInterestedOptions = {
    fieldName: 'subjectsInterested',
    fieldValue: subjectsInterested,
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
    },
    noneOptions: {
      'name': 'None'
    }
  };
  const levelInstructionOptions = {
    fieldName: 'levelInstruction',
    fieldValue: levelInstruction,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Introductory', 'Intermediate', 'Advanced'
    ]
  };
  const volunteerAmountCheckOptions = {
    fieldName: 'volunteerAmountCheck',
    fieldValue: volunteerAmountCheck,
    fieldLabel: 'I\'m not interested in volunteering.',
    setFieldValue: handleSetCheckboxDisabler,
  };
  const timesAvailableOptions = {
    className: 'times-available',
    fieldName: 'timesAvailable',
    fieldValue: timesAvailable,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri',
      'Morning', 'Noon', 'Early Evening',
      'I\'m Flexible', 'Unsure'
    ],
    noneOptions: {
      'name': 'None'
    }
  };
  const ageGroupsOptions = {
    className: 'age-groups',
    fieldName: 'ageGroups',
    fieldValue: ageGroups,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Middle School (10-13)', 'High School (14-17)', 'College (18-21)',
      'Young Adults (22-26)'
    ],
    noneOptions: {
      'name': 'None'
    }
  };
  const importanceTeachOptions = {
    fieldName: 'importanceTeach',
    fieldValue: importanceTeach,
    sliderLabels: ['Not important', 'Somewhat important', 'Very important'],
    setFieldValue: handleChange
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
    <div className='professional-page-3-container'>
      <h1>Volunteering</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['volunteerInterest'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Would you be interested in volunteering your time and expertise to help develop emerging youth?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={volunteerInterestOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['volunteerWay'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>In what way are you interested in volunteering your time and expertise?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={volunteerWayOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['subjectsInterested'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What subject(s) are you interested in instructing, mentoring or speaking about?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={subjectsInterestedOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['levelInstruction'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What level of instruction would you like your students to receive?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={levelInstructionOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['volunteerAmount'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>About how many times per month are you able to volunteer? About how many hours per week?</h2>
            <h3>Please provide your best estimate:</h3>
            <p className={'inline-input' + (volunteerAmountCheck ? ' disabled' : '')}>
              I am able to volunteer about <input type='number' min='0' max='30' name='volunteerAmountMonth' value={volunteerAmountMonth || ''} onChange={e => handleChange(e)} disabled={volunteerAmountCheck} /> times per month and about <input type='number' min='0' max='168' name='volunteerAmountWeek' value={volunteerAmountWeek || ''} onChange={e => handleChange(e)} disabled={volunteerAmountCheck} /> hours per week.
            </p>
            <Checkbox options={volunteerAmountCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['timesAvailable'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What day(s) of the week and time(s) would you most likely be available?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={timesAvailableOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['ageGroups'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What age group(s) are you interested in working with?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={ageGroupsOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['importanceTeach'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How important do you believe it is for professionals to teach what they know to emerging talent?</h2>
            <Radio options={importanceTeachOptions} />
            <div className='textarea-container'>
              <h3>Comments (Optional)</h3>
              <textarea maxLength='400' name='importanceTeachComments' wrap='soft' rows='5' value={importanceTeachComments || ''} onChange={e => handleTextArea(e)} />
              <span className='char-remain'>{charRemain}</span>
            </div>
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
          onClick={() => handleSubmit()}>
          SUBMIT
        </button>
      </div>
    </div>
  )
}
