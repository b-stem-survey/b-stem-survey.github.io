import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import BlockSelection from '../BlockSelection';
import Checkbox from '../Checkbox';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setPage, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ interestPrograms: 0, learnerAmount: 0, learnerAge: 0, learnerGrade: 0, ethnicityDistribution: 0, genderDistribution: 0, learnerSubjects: 0 , learnerAttendFrequency: 0 })
  const { interestPrograms, learnerAmount, learnerAge, learnerGrade, ethnicityDistribution, ethnicityDistributionCheck, genderDistribution, genderDistributionCheck, learnerSubjects, learnerAttendFrequency, learnerAttendFrequencyCheck } = surveyValues;

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
        ((field === 'interestPrograms') && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (((field === 'learnerGrade') || (field === 'learnerSubjects')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).includes(1))) ||
        (((field === 'learnerAmount') || (field === 'learnerAge')) && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0) || !otherCheck(surveyValues[field]) ||
        ((field === 'ethnicityDistribution') && !surveyValues['ethnicityDistributionCheck'] && (!ethnicityDistribution || (Object.values(ethnicityDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) !== 100))) ||
        ((field === 'genderDistribution') && !surveyValues['genderDistributionCheck'] && (!genderDistribution || (Object.values(genderDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) !== 100))) ||
        ((field === 'learnerAttendFrequency') && !surveyValues[field] && !surveyValues['learnerAttendFrequencyCheck'])
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
  const handleSetGroupInput = (e, fieldName) => {
    const { name, value } = e.currentTarget;

    if (surveyValues[fieldName]) {
      let fieldCopy = Object.assign({}, surveyValues[fieldName], { [name]: value });
      setSurveyValues({ [fieldName]: fieldCopy })
    } else {
      setSurveyValues({ [fieldName]: { [name]: value }})
    }
  }

  const interestProgramsOptions = {
    fieldName: 'interestPrograms',
    fieldValue: interestPrograms,
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
  const ethnicityDistributionCheckOptions = {
    className: 'group-check',
    fieldName: 'ethnicityDistributionCheck',
    fieldValue: ethnicityDistributionCheck,
    fieldLabel: 'No Preference',
    setFieldValue: handleSetCheckbox
  };
  const genderDistributionCheckOptions = {
    className: 'group-check',
    fieldName: 'genderDistributionCheck',
    fieldValue: genderDistributionCheck,
    fieldLabel: 'No Preference',
    setFieldValue: handleSetCheckbox
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
  const learnerAttendFrequencyCheckOptions = {
    className: 'inline-disabler',
    fieldName: 'learnerAttendFrequencyCheck',
    fieldValue: learnerAttendFrequencyCheck,
    fieldLabel: 'I\'m not interested in a partnership.',
    setFieldValue: handleSetCheckbox
  };

  return (
    <div className='corporation-page-2-container'>
      <h1>Developing Talent</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['interestPrograms'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Would you be interested in helping to create educational and professional development programs if you had the resources required (i.e. curriculum, access to potential students, other professionals, etc.)?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestProgramsOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerAmount'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>How many learners, students, and emerging talent do you want to impact?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={learnerAmountOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerAge'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is the age-range of the students you would like to impact?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={learnerAgeOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerGrade'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What is the grade-level of the students you would like to impact?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={learnerGradeOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['ethnicityDistribution'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required: Total is 100'>
          <div className='question-container'>
            <h2>What are the percentages of race/ethnicity of your students?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <div className={'group-wrapper' + (ethnicityDistributionCheck ? ' disabled' : '')}>
              <label onClick={e => e.preventDefault()}>Black/African-American
                <input type='number' min='0' max='100' name='black/african-american'
                  value={ethnicityDistribution ? ethnicityDistribution['black/african-american'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Hispanic/Non-Black
                <input type='number' min='0' max='100' name='hispanic/non-black'
                  value={ethnicityDistribution ? ethnicityDistribution['hispanic/non-black'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Asian
                <input type='number' min='0' max='100' name='asian'
                  value={ethnicityDistribution ? ethnicityDistribution['asian'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Native American
                <input type='number' min='0' max='100' name='native american'
                  value={ethnicityDistribution ? ethnicityDistribution['native american'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Pacific Islander
                <input type='number' min='0' max='100' name='pacific islander'
                  value={ethnicityDistribution ? ethnicityDistribution['pacific islander'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>White
                <input type='number' min='0' max='100' name='white'
                  value={ethnicityDistribution ? ethnicityDistribution['white'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Other
                <input type='number' min='0' max='100' name='other'
                  value={ethnicityDistribution ? ethnicityDistribution['other'] : ''}
                  onChange={e => handleSetGroupInput(e, 'ethnicityDistribution')}
                  disabled={ethnicityDistributionCheck} />
              </label>
              <label className='group-total' onClick={e => e.preventDefault()}>Total
                <input type='number' name='Total'
                  value={ethnicityDistribution ? Object.values(ethnicityDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) : 0}
                  disabled={ethnicityDistributionCheck} />
              </label>
            </div>
            <Checkbox options={ethnicityDistributionCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['genderDistribution'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required: Total is 100'>
          <div className='question-container'>
            <h2>What are the percentages of gender of your students you would like to impact?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <div className={'group-wrapper' + (genderDistributionCheck ? ' disabled' : '')}>
              <label onClick={e => e.preventDefault()}>Female
                <input type='number' min='0' max='100' name='female'
                  value={genderDistribution ? genderDistribution['female'] : ''}
                  onChange={e => handleSetGroupInput(e, 'genderDistribution')}
                  disabled={genderDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Male
                <input type='number' min='0' max='100' name='male'
                  value={genderDistribution ? genderDistribution['male'] : ''}
                  onChange={e => handleSetGroupInput(e, 'genderDistribution')}
                  disabled={genderDistributionCheck} />
              </label>
              <label onClick={e => e.preventDefault()}>Non-Binary
                <input type='number' min='0' max='100' name='non-binary'
                  value={genderDistribution ? genderDistribution['non-binary'] : ''}
                  onChange={e => handleSetGroupInput(e, 'genderDistribution')}
                  disabled={genderDistributionCheck} />
              </label>
              <label className='group-total' onClick={e => e.preventDefault()}>Total
                <input type='number' name='Total'
                  value={genderDistribution ? Object.values(genderDistribution).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0) : 0}
                  disabled={genderDistributionCheck} />
              </label>
            </div>
            <Checkbox options={genderDistributionCheckOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerSubjects'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>What subject(s) or fields would you like your students to learn and engage in at TIV?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={learnerSubjectsOptions} />
          </div>
        </Tooltip>
        <Tooltip arrow={true} open={errors['learnerAttendFrequency'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>About how many days per month would you like students to attend TIV programs?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <p className={'inline-input' + (learnerAttendFrequencyCheck ? ' disabled' : '')}>
              Students would attend about <input type='number' min='0' max='30' name='learnerAttendFrequency' value={learnerAttendFrequency || ''} onChange={e => handleChange(e)} disabled={learnerAttendFrequencyCheck} /> times per month.
            </p>
            <Checkbox options={learnerAttendFrequencyCheckOptions} />
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
