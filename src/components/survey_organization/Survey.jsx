import React, { useState } from 'react';
import $ from 'jquery';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import ProgressBar from '../ProgressBar';
import {} from './organization.scss';

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
      'Phone Number': values1['phone'],
      'City': values1['city'],
      'State': values1['state'],
      'Gender (Optional)': values1['gender'],
      'Ethnicity (Optional)': values1['ethnicity'],
      'School/Organization Name': values1['orgName'],
      'Affiliation/Title': values1['affiliation'],
      'School/Organization Website URL': values1['url'],

      'Are you interested in a partnership that will allow your students to attend TIV programs?': stringifyBlock(values2['partnerInterest']),
      'Are you already partnering with other educational or professional development providers?': stringifyBlock(values2['partnerCurrent']),
      'How many learners/students do you represent?': stringifyBlock(values2['learnerAmount']),
      'What is the age-range of your students?': stringifyBlock(values2['learnerAge']),
      'What is the grade-level of your students?': stringifyBlock(values2['learnerGrade']),
      'What grade-level of students would you like to access TIV programs?': stringifyBlock(values2['learnerGradeAccess']),
      'What are the percentages of race/ethnicity of your students?': stringifyGroup(values2['ethnicityDistribution']),
      'What percentages of instruction time are related to business, tech, STEM, STEAM, and professional development?': stringifyGroup(values2['instructionDistribution']),
      'What subject(s) or fields would you like your students to learn and engage in at TIV?': stringifyBlock(values2['learnerSubjects']),
      'What level of instruction would you like your students to receive?': stringifyBlock(values2['learnerInstructLevel']),

      'Does the school/organization provide business, tech, STEM/STEAM or other programs?': stringifyBlock(values3['programProvide']),
      'Which programs?': stringifyBlock(values3['programProvideSpecify']),
      'What tech-based subject-matters or industries are of the most interest to your students?': stringifyBlock(values3['studentInterest']),
      'About how many days per month can students attend TIV programs?': (values3['studentAttendFrequencyCheck'] ? 'I\'m not interested in a partnership.' : values3['studentAttendFrequency']),
      'What day(s) and time(s) would your students be able to attend a TIV program?': stringifyBlock(values3['studentAttendTimes']),
      'Are you able to provide transportation (i.e. bus, van, car, etc.) for students?': stringifyBlock(values3['studentTransportation']),
      'What types of activities would your students benefit from?': stringifyBlock(values3['studentActivities']),
      'Would you be interested in learning more about TIV and how our company can help make an impact?': stringifyBlock(values3['interestTIV']),
      'I would like to receive updates regarding TIV.': (values3['interestTIVCheck'] ? 'True' : 'False')
    }

    console.log(process.env.REACT_APP_ORGANIZATION_SURVEY_URL)

    $.ajax({
      url: process.env.REACT_APP_ORGANIZATION_SURVEY_URL,
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
    <ProgressBar survey='organization/academic institution' page={page} />
    {page === 1 ? <Page1 setSurvey={setSurvey} setPage={setPage} values={values1} setValues={setValues1} /> : ''}
    {page === 2 ? <Page2 setPage={setPage} values={values2} setValues={setValues2} /> : ''}
    {page === 3 ? <Page3 setSurvey={setSurvey} setPage={setPage} setLogo={setLogo} values={values3} setValues={setValues3} submit={submit} /> : ''}
  </>
}
