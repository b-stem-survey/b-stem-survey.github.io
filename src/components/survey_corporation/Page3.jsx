import React, { useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import Checkbox from '../Checkbox';
import BlockSelection from '../BlockSelection';

export default props => {
  const isTabletorMobile = useMediaQuery({ maxWidth: 767.98 });
  const { setSurvey, setPage, setLogo, setValues } = props;
  const initialState = props.values;

  const [surveyValues, setSurveyValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  const [errors, setErrors] = useState({ interestSponsor: 0, interestSponsorSpecify: 0, interestHost: 0, interestHostFrequency: 0, interestVolunteer: 0, interestVolunteerRole: 0, interestDonate: 0, interestDonateType: 0, interestTIV: 0 });
  const { interestSponsor, interestSponsorSpecify, interestHost, interestHostFrequencyAmount, interestHostFrequencyTime, interestVolunteer, interestVolunteerRole, interestDonate, interestDonateType, interestTIV, interestTIVCheck } = surveyValues;

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
        (((field === 'interestSponsor') || (field === 'interestHost') || (field === 'interestVolunteer') || (field === 'interestDonate') || (field === 'interestTIV')) && ((typeof surveyValues[field] === 'object') && (surveyValues[field] !== null)) && (!Object.values(surveyValues[field]).length > 0)) ||
        (
          (field === 'interestSponsorSpecify') &&
          ((typeof surveyValues['interestSponsor'] === 'object') && (surveyValues['interestSponsor'] !== null)) &&
          Object.values(surveyValues['interestSponsor'])[0] === 'Specific Program' &&
          !surveyValues[field]
        ) ||
        (
          (field === 'interestHostFrequency') &&
          ((typeof surveyValues['interestHost'] === 'object') && (surveyValues['interestHost'] !== null)) &&
          Object.values(surveyValues['interestHost'])[0] === 'Yes' &&
          (!surveyValues['interestHostFrequencyAmount'] || !Object.values(surveyValues['interestHostFrequencyTime']).length > 0)
        ) ||
        (
          (field === 'interestVolunteerRole') &&
          ((typeof surveyValues['interestVolunteer'] === 'object') && (surveyValues['interestVolunteer'] !== null)) &&
          Object.values(surveyValues['interestVolunteer'])[0] === 'Yes' &&
          ((typeof surveyValues['interestVolunteerRole'] === 'object') && (surveyValues['interestVolunteerRole'] !== null)) &&
          !Object.values(surveyValues[field]).includes(1)
        ) ||
        (
          (field === 'interestDonateType') &&
          ((typeof surveyValues['interestDonate'] === 'object') && (surveyValues['interestDonate'] !== null)) &&
          Object.values(surveyValues['interestDonate'])[0] === 'Yes' &&
          ((typeof surveyValues['interestDonateType'] === 'object') && (surveyValues['interestDonateType'] !== null)) &&
          !Object.values(surveyValues[field]).includes(1) || !otherCheck(surveyValues[field])
        )
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

  const interestSponsorOptions = {
    fieldName: 'interestSponsor',
    fieldValue: interestSponsor,
    setFieldValue: handleSetBlocks,
    blocks: [
      'TIV', 'Specific Program', 'School', 'Organization'
    ],
    exclusive: true,
    noneOptions: {
      'name': 'None'
    }
  };
  const interestHostOptions = {
    fieldName: 'interestHost',
    fieldValue: interestHost,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const interestHostFrequencyTimeOptions = {
    fieldName: 'interestHostFrequencyTime',
    fieldValue: interestHostFrequencyTime,
    setFieldValue: handleSetBlocks,
    blocks: [
      'month', 'year'
    ],
    exclusive: true,
    merge: true
  };
  const interestVolunteerOptions = {
    fieldName: 'interestVolunteer',
    fieldValue: interestVolunteer,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const interestVolunteerRoleOptions = {
    fieldName: 'interestVolunteerRole',
    fieldValue: interestVolunteerRole,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Instructor', 'Mentor', 'Speaker', 'Curriculum Design'
    ]
  }
  const interestDonateOptions = {
    fieldName: 'interestDonate',
    fieldValue: interestDonate,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Yes', 'No'
    ],
    exclusive: true
  };
  const interestDonateTypeOptions = {
    fieldName: 'interestDonateType',
    fieldValue: interestDonateType,
    setFieldValue: handleSetBlocks,
    blocks: [
      'Space', 'Technology', 'Printing', 'Sponsorship'
    ],
    otherOptions: {
      'name': 'Other',
      'placeholder': ''
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
    setFieldValue: handleSetCheckbox
  };

  return (
    <div className='corporation-page-3-container'>
      <h1>Providing Resources</h1>
      <h3>All fields required unless marked as "Optional".</h3>
      <div className='field-container'>
        <Tooltip arrow={true} open={errors['interestSponsor'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in sponsoring TIV, a specific program, school or organization?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestSponsorOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['interestSponsor'] === 'object') && (surveyValues['interestSponsor'] !== null)) && Object.values(surveyValues['interestSponsor'])[0] === 'Specific Program' ? <Tooltip arrow={true} open={errors['interestSponsorSpecify'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>What is the name of the specific program, school or organization?</h2>
            <label className='w-full'>Please specify:
              <input type='text' name='interestSponsorSpecify' value={interestSponsorSpecify || ''}
                onChange={e => handleChange(e)} />
            </label>
          </div>
        </Tooltip> : ''}
        <Tooltip arrow={true} open={errors['interestHost'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in hosting a TIV experience at your company?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestHostOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['interestHost'] === 'object') && (surveyValues['interestHost'] !== null)) && Object.values(surveyValues['interestHost'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['interestHostFrequency'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>About how many times a month or year would you be interested in hosting?</h2>
            <h3 className='txt-clarify'>Please provide your best estimate:</h3>
            <p className='inline-input'>
              Students can attend about <input type='number' min='0' max='30' name='interestHostFrequencyAmount' value={interestHostFrequencyAmount || ''} onChange={e => handleChange(e)} /> days a <BlockSelection options={interestHostFrequencyTimeOptions} />
            </p>
          </div>
        </Tooltip> : ''}
        <Tooltip arrow={true} open={errors['interestVolunteer'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Are you interested in your colleagues/employees volunteering their time and expertise to TIV?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestVolunteerOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['interestVolunteer'] === 'object') && (surveyValues['interestVolunteer'] !== null)) && Object.values(surveyValues['interestVolunteer'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['interestVolunteerRole'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>What would they be interested in volunteering as?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={interestVolunteerRoleOptions} />
          </div>
        </Tooltip> : ''}
        <Tooltip arrow={true} open={errors['interestDonate'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container'>
            <h2>Would you be interested in possibly donating resources to a TIV program?</h2>
            <h3 className='txt-block-select'>Please select one:</h3>
            <BlockSelection options={interestDonateOptions} />
          </div>
        </Tooltip>
        {((typeof surveyValues['interestDonate'] === 'object') && (surveyValues['interestDonate'] !== null)) && Object.values(surveyValues['interestDonate'])[0] === 'Yes' ? <Tooltip arrow={true} open={errors['interestDonateType'] ? true : false} placement={isTabletorMobile ? 'top-start' : 'left-start'} title='Required'>
          <div className='question-container conditional'>
            <h2>What resources would you be donating?</h2>
            <h3 className='txt-block-select'>Please select all that apply:</h3>
            <BlockSelection options={interestDonateTypeOptions} />
          </div>
        </Tooltip> : ''}
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
