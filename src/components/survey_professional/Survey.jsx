import React, { useState } from 'react';
import $ from 'jquery';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import ProgressBar from '../ProgressBar';
import {} from './professional.scss';

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
      'Age': values1['age'],
      'Gender (Optional)': values1['gender'],
      'Ethnicity (Optional)': values1['ethnicity'],

      'What industry(s) do you work in?': stringifyBlock(values2['industryWork']),
      'What is your profession?': values2['yourProfession'],
      'What is your Linkedin or professional URL?': values2['professionalUrl'],
      'What are your areas of expertise?': values2['areasExpertise'],
      'Do you currently volunteer your time or expertise to help develop emerging youth, such as by being an instructor, mentor, speaker, etc.?': stringifyBlock(values2['volunteer']),
      'What level of instruction do you volunteer for?': stringifyBlock(values2['volunteerLevel']),
      'About how many times per week, month, or year?': values2['volunteerFrequencyAmount'] + (values2['volunteerFrequencyAmount'] === 1 ? ' time' : ' times') + ' per ' + stringifyBlock(values2['volunteerFrequencyTime']),

      'Would you be interested in volunteering your time and expertise to help develop emerging youth?': stringifyBlock(values3['volunteerInterest']),
      'In what way are you interested in volunteering your time and expertise?': stringifyBlock(values3['volunteerWay']),
      'What subject(s) are you interested in instructing, mentoring or speaking about?': stringifyBlock(values3['subjectsInterested']),
      'What level of instruction would you like your students to receive?': stringifyBlock(values3['levelInstruction']),
      'About how many times per month are you able to volunteer? About how many hours per week?': (values3['volunteerAmountCheck'] ? 'I\'m not interested in volunteering.' : values3['volunteerAmountMonth'] + ' ' + values3['volunteerAmountWeek']),
      'What day(s) of the week and time(s) would you most likely be available?': stringifyBlock(values3['timesAvailable']),
      'What age group(s) are you interested in working with?': stringifyBlock(values3['ageGroups']),
      'How important do you believe it is for professionals to teach what they know to emerging talent?': values3['importanceTeach'] + ': ' + values3['importanceTeachComments'],
      'Would you be interested in learning more about TIV and how our company can help make an impact?': stringifyBlock(values3['interestTIV']),
      'I would like to receive updates regarding TIV.': (values3['interestTIVCheck'] ? 'True' : 'False')
    }

    $.ajax({
      url: process.env.REACT_APP_PROFESSIONAL_SURVEY_URL,
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

  return <>
    <ProgressBar survey='professional' page={page} />
    {page === 1 ? <Page1 setSurvey={setSurvey} setPage={setPage} values={values1} setValues={setValues1} /> : ''}
    {page === 2 ? <Page2 setPage={setPage} values={values2} setValues={setValues2} /> : ''}
    {page === 3 ? <Page3 setSurvey={setSurvey} setPage={setPage} setLogo={setLogo} values={values3} setValues={setValues3} submit={submit} /> : ''}
  </>
}
