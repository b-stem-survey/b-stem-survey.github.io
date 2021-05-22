import React, { useState } from 'react';
import $ from 'jquery';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import ProgressBar from '../ProgressBar';
import {} from './corporation.scss';

export default props => {
  const { setSurvey, setLogo } = props;
  const [page, setPage] = useState(1);
  const [values1, setValues1] = useState({});
  const [values2, setValues2] = useState({});
  const [values3, setValues3] = useState({});

  const submit = () => {
    const data = {
      'Name': values1['name'],
      'Email': values1['email'],
      'Company Name': values1['companyName'],
      'Affiliation/Title': values1['affiliation'],
      'Industry': values1['industry'],
      'City': values1['city'],
      'State': values1['state'],
      'Company Website URL': values1['url'],

      'Would you be interested in helping to create educational and professional development programs if you had the resources required (i.e. curriculum, access to potential students, other professionals, etc.)?': stringifyBlock(values2['interestPrograms']),
      'How many learners, students, and emerging talent do you want to impact?': stringifyBlock(values2['learnerAmount']),
      'What is the age-range of the students you would like to impact?': stringifyBlock(values2['learnerAge']),
      'What is the grade-level of the students you would like to impact?': stringifyBlock(values2['learnerGrade']),
      'What are the percentages of race/ethnicity of your students?': (values2['ethnicityDistributionCheck'] ? 'No Preference' : stringifyGroup(values2['ethnicityDistribution'])),
      'What are the percentages of gender of your students you would like to impact?': (values2['genderDistributionCheck'] ? 'No Preference' : stringifyGroup(values2['genderDistribution'])),
      'What subject(s) or fields would you like your students to learn and engage in at TIV?': stringifyBlock(values2['learnerSubjects']),
      'About how many days per month would you like students to attend TIV programs?': (values2['learnerAttendFrequencyCheck'] ? 'I\'m not interested in a partnership.' : values2['learnerAttendFrequency']),

      'Are you interested in sponsoring TIV, a specific program, school or organization?': stringifyBlock(values3['interestSponsor']),
      'What is the name of the specific program, school or organization?': values3['interestSponsorSpecify'],
      'Are you interested in hosting a TIV experience at your company?': stringifyBlock(values3['interestHost']),
      'About how many times a month or year would you be interested in hosting?': values3['interestHostFrequencyAmount'] + ' days a ' + stringifyBlock(values3['interestHostFrequencyTime']),
      'Are you interested in your colleagues/employees volunteering their time and expertise to TIV?': stringifyBlock(values3['interestVolunteer']),
      'What would they be interested in volunteering as?': stringifyBlock(values3['interestVolunteerRole']),
      'Would you be interested in possibly donating resources to a TIV program?': stringifyBlock(values3['interestDonate']),
      'What resources would you be donating?': stringifyBlock(values3['interestDonateType']),
      'Would you be interested in learning more about TIV and how our company can help make an impact?': stringifyBlock(values3['interestTIV']),
      'I would like to receive updates regarding TIV.': (values3['interestTIVCheck'] ? 'True' : 'False')
    }

    console.log(data)

    $.ajax({
      url: process.env.REACT_APP_CORPORATION_SURVEY_URL,
      method: 'GET',
      dataType: 'json',
      data: data
    })
  };

  const stringifyBlock = blockData => {
    if (!blockData) return '';
    let labels = Object.keys(blockData);
    let stringOutput = '';

    if (labels.includes('exclusive')) {
      stringOutput += blockData['exclusive'];
      if (labels.includes('Other-Text') && blockData['Other-Text']) stringOutput += ': ' + blockData['Other-Text'];
    } else {
      for (let label in blockData) {
        if (blockData[label] === 1) {
          stringOutput += (stringOutput ? ', ' : '') + label;
          if (label === 'Other') stringOutput += ': ' + blockData['Other-Text'];
        }
      }
    }

    return stringOutput;
  };
  const stringifyGroup = groupData => {
    let groupArr = [];
    for (let key in groupData) groupArr.push(key + ': ' + groupData[key]);
    return groupArr.join(', ');
  };

  return <>
    <ProgressBar survey='corporation' page={page} />
    {page === 1 ? <Page1 setSurvey={setSurvey} setPage={setPage} values={values1} setValues={setValues1} /> : ''}
    {page === 2 ? <Page2 setPage={setPage} values={values2} setValues={setValues2} /> : ''}
    {page === 3 ? <Page3 setSurvey={setSurvey} setPage={setPage} setLogo={setLogo} values={values3} setValues={setValues3} submit={submit} /> : ''}
  </>
}
