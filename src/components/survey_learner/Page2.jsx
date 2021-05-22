import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
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

  const [errors, setErrors] = useState({ subjectsPlanned: 0, subjectsOther: 0, industryInterested: 0, industryInformed: 0, industryInformedExplain: 0, industryExposed: 0 });
  const { subjectsPlanned, subjectsOther, subjectsOtherCheck, industryInterested, industryInformed, industryInformedExplain, industryExposed } = surveyValues;

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);
  useEffect(() => setValues(surveyValues), [surveyValues]);

  let industryFormedRemaining = 'calc((100% - 16px)*' + (1 - 0.25*Math.max(0, industryInformed - 1)) + ')';

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setSurveyValues({ [name]: value });
  }
  const handlePrevious = () => setPage(1);
  const handleNext = () => {
    let newErrors = Object.assign({}, errors);
    let isError = false;

    for (let field in errors) {
      if (
        (((field === 'subjectsPlanned') || (field === 'industryInterested')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1)) || !otherCheck(surveyValues[field])) ||
        ((field === 'subjectsOther') && !surveyValues[field] && !surveyValues['subjectsOtherCheck']) ||
        ((field === 'industryExposed') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        ((field !== 'subjectsPlanned') && (field !== 'industryInterested') && (field !== 'subjectsOther') && (field !== 'industryExposed') && !surveyValues[field])
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
  const handleSetCheckbox = (fieldCheck, checkState) => {
    let fieldName = fieldCheck.slice(0, -5);
    if (checkState) {
      setSurveyValues({ [fieldName]: '' });
      setErrors(Object.assign({}, errors, { [fieldName]: 0 }));
    }
    setSurveyValues({ [fieldCheck]: checkState });
  };

  const subjectsPlannedOptions = {
    fieldName: 'subjectsPlanned',
    fieldValue: subjectsPlanned,
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
      'name': 'Not Applicable'
    }
  };
  const subjectsOtherCheckOptions = {
    fieldName: 'subjectsOtherCheck',
    fieldValue: subjectsOtherCheck,
    fieldLabel: 'I\'m currently not enrolled in any classes or instructional programs.',
    setFieldValue: handleSetCheckbox,
  };
  const industryInterestedOptions = {
    fieldName: 'industryInterested',
    fieldValue: industryInterested,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Advertising', 'Banking', 'Medicine', 'Financial Services',
      'Technology', 'Marketing', 'Pharmacy', 'Music',
      'Fashion', 'Biochemical', 'Education', 'Management',
      'Administrative', 'Design', 'Aviation', 'Real Estate'
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': 'E.g. Psychology, Performing Arts'
    }
  };
  const industryExposedOptions = {
    fieldName: 'industryExposed',
    fieldValue: industryExposed,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const industryInformedOptions = {
    fieldName: 'industryInformed',
    fieldValue: industryInformed,
    sliderLabels: ['Not confident', 'Somewhat confident', 'Very confident'],
    setFieldValue: handleChange
  };

  return (
    <div className='learner-page-2-container'>
      <h1>Educational Goals</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['subjectsPlanned'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What subjects are you currently taking or planning on taking?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={subjectsPlannedOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['subjectsOther'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in any subjects that are currently not available at your school or academic institution? If yes, please specify.</h2>
            <input className={'w-full' + (subjectsOtherCheck ? ' disabled' : '')}
              disabled={subjectsOtherCheck} type='text' name='subjectsOther' value={subjectsOther || ''} placeholder='E.g. Business, fashion design' onChange={e => handleChange(e)} />
            <Checkbox options={subjectsOtherCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['industryInterested'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is your industry of interest or what are you interested in doing career-wise?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={industryInterestedOptions} />
          </div>
        </Tooltip>
        <div className='question-container'>
          <Tooltip arrow={true} open={errors['industryInformed'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
            <div className='wrapper'>
              <h2>How informed are you about your job, career or industry?</h2>
              <Radio options={industryInformedOptions} />
            </div>
          </Tooltip>
          <Tooltip arrow={true} open={errors['industryInformedExplain'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
            <label className='txt-specify w-full'>Please explain your answer:
              <input type='text' name='industryInformedExplain' value={industryInformedExplain || ''} placeholder={'E.g. I haven\'t had much guidance; Taking over family business'}
                onChange={e => handleChange(e)} />
            </label>
          </Tooltip>
        </div>
        <Tooltip arrow={true} open={errors['industryExposed'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Have you already been exposed to or are working in your choice of job, career or industry?</h2>
            <BlockSelection options={industryExposedOptions} />
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
