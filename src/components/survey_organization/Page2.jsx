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

  const [errors, setErrors] = useState({ partnerInterest: 0, partnerCurrent: 0, learnerAmount: 0, learnerAge: 0, learnerGrade: 0, learnerGradeAccess: 0, ethnicityDistribution: 0, instructionDistribution: 0, learnerSubjects: 0, learnerInstructLevel: 0 })
  const { partnerInterest, partnerCurrent, learnerAmount, learnerAge, learnerGrade, learnerGradeAccess, ethnicityDistribution, instructionDistribution, learnerSubjects, learnerInstructLevel } = surveyValues;

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
        (((field === 'partnerInterest') || (field === 'partnerCurrent') || (field === 'learnerGradeAccess')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (((field === 'learnerGrade') || (field === 'learnerInstructLevel')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1))) ||
        (((field === 'learnerAmount') || (field === 'learnerAge')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0) || !otherCheck(surveyValues[field])) ||
        ((field === 'learnerSubjects') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1)) || !otherCheck(surveyValues[field])) ||
        ((field === 'ethnicityDistribution') && (!ethnicityDistribution || (Object.values(ethnicityDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) !== 100))) ||
        ((field === 'instructionDistribution') && (!instructionDistribution || (Object.values(instructionDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) !== 100)))
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
  const handleSetGroupInput = (e, fieldName) => {
    const { name, value } = e.currentTarget;

    if (surveyValues[fieldName]) {
      let fieldCopy = Object.assign({}, surveyValues[fieldName], { [name]: value });
      setSurveyValues({ [fieldName]: fieldCopy })
    } else {
      setSurveyValues({ [fieldName]: { [name]: value }})
    }
  };

  const partnerInterestOptions = {
    fieldName: 'partnerInterest',
    fieldValue: partnerInterest,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const partnerCurrentOptions = {
    fieldName: 'partnerCurrent',
    fieldValue: partnerCurrent,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const learnerAmountOptions = {
    className: 'learner-amount',
    fieldName: 'learnerAmount',
    fieldValue: learnerAmount,
    setFieldValue: handleSetBlocks,
    blocks: [
      '1-50', '51-75', '76-120'
    ],
    exclusive: true,
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
    }
  };
  const learnerAgeOptions = {
    className: 'learner-age',
    fieldName: 'learnerAge',
    fieldValue: learnerAge,
    setFieldValue: handleSetBlocks,
    blocks: [
      '9-13', '14-25'
    ],
    exclusive: true,
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
    }
  };
  const learnerGradeOptions = {
    fieldName: 'learnerGrade',
    fieldValue: learnerGrade,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Elementary School', 'Middle School', 'High School', 'College'
    ],
    noneOptions: {
      'name': 'Not Applicable'
    }
  };
  const learnerGradeAccessOptions = {
    fieldName: 'learnerGradeAccess',
    fieldValue: learnerGradeAccess,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Elementary School', 'Middle School', 'High School', 'College'
    ],
    exclusive: true,
    noneOptions: {
      'name': 'Not Applicable'
    }
  };
  const learnerSubjectsOptions = {
    fieldName: 'learnerSubjects',
    fieldValue: learnerSubjects,
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
  const learnerInstructLevelOptions = {
    fieldName: 'learnerInstructLevel',
    fieldValue: learnerInstructLevel,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Introductory', 'Intermediate', 'Advanced'
    ]
  };

  return (
    <div className='organization-page-2-container'>
      <h1>Institution Info</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['partnerInterest'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in a partnership that will allow your students to attend TIV programs?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={partnerInterestOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['partnerCurrent'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you already partnering with other educational or professional development providers?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={partnerCurrentOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerAmount'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How many learners/students do you represent?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={learnerAmountOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerAge'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is the age-range of your students?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={learnerAgeOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerGrade'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is the grade-level of your students?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={learnerGradeOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerGradeAccess'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What grade-level of students would you like to access TIV programs?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={learnerGradeAccessOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['ethnicityDistribution'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required: Total is 100'>
          <div className='question-container'>
            <h2>What are the percentages of race/ethnicity of your students?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <div className='group-wrapper'>
              <label onClick={e => e.preventDefault()}>Black/African-American
                <input type='number' min='0' max='100' name='black/african-american' value={ethnicityDistribution ? ethnicityDistribution['black/african-american'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Hispanic/Non-Black
                <input type='number' min='0' max='100' name='hispanic/non-black' value={ethnicityDistribution ? ethnicityDistribution['hispanic/non-black'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Asian
                <input type='number' min='0' max='100' name='asian' value={ethnicityDistribution ? ethnicityDistribution['asian'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Native American
                <input type='number' min='0' max='100' name='native american' value={ethnicityDistribution ? ethnicityDistribution['native american'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Pacific Islander
                <input type='number' min='0' max='100' name='pacific islander' value={ethnicityDistribution ? ethnicityDistribution['pacific islander'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>White
                <input type='number' min='0' max='100' name='white' value={ethnicityDistribution ? ethnicityDistribution['white'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Other
                <input type='number' min='0' max='100' name='other' value={ethnicityDistribution ? ethnicityDistribution['other'] : ''} onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')} />
              </label>
              <label className='group-total' onClick={e => e.preventDefault()}>Total
                <input type='number' name='Total' value={ethnicityDistribution ? Object.values(ethnicityDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) : 0} />
              </label>
            </div>
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['instructionDistribution'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required: Total is 100'>
          <div className='question-container'>
            <h2>What percentages of instruction time are related to business, tech, STEM, STEAM, and professional development?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <div className='group-wrapper'>
              <label onClick={e => e.preventDefault()}>Business-based
                <input type='number' min='0' max='100' name='business-based' value={instructionDistribution ? instructionDistribution['business-based'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Tech-based
                <input type='number' min='0' max='100' name='tech-based' value={instructionDistribution ? instructionDistribution['tech-based'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>STEM/STEAM
                <input type='number' min='0' max='100' name='stem/steam' value={instructionDistribution ? instructionDistribution['stem/steam'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Professional Development
                <input type='number' min='0' max='100' name='professional development' value={instructionDistribution ? instructionDistribution['professional development'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Project-based Learning
                <input type='number' min='0' max='100' name='project-based learning' value={instructionDistribution ? instructionDistribution['project-based learning'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label onClick={e => e.preventDefault()}>Other Subjects
                <input type='number' min='0' max='100' name='other subjects' value={instructionDistribution ? instructionDistribution['other subjects'] : ''} onChange={e => handleSetGroupInput(e, 'instructionDistribution')} />
              </label>
              <label className='group-total' onClick={e => e.preventDefault()}>Total
                <input type='number' name='Total' value={instructionDistribution ? Object.values(instructionDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) : 0} />
              </label>
            </div>
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerSubjects'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What subject(s) or fields would you like your students to learn and engage in at TIV?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={learnerSubjectsOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerInstructLevel'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What level of instruction would you like your students to receive?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={learnerInstructLevelOptions} />
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
