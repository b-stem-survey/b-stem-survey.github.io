import React, { useState } from 'react';
import $ from 'jquery';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import ProgressBar from '../ProgressBar';
import {} from './learner.scss';

export default props => {
  const { setSurvey, setLogo } = props;
  const [page, setPage] = useState(1);
  const [values1, setValues1] = useState({});
  const [values2, setValues2] = useState({});
  const [values3, setValues3] = useState({});
  const [values4, setValues4] = useState({});

  const submit = () => {
    const data = {
      'Name': values1['name'],
      'Email': values1['email'],
      'City': values1['city'],
      'State': values1['state'],
      'Age': values1['age'],
      'Gender (Optional)': values1['gender'],
      'Ethnicity (Optional)': values1['ethnicity'],
      'School or Academic Institution': (values1['schoolCheck'] ? 'I\'m not in school or part of an academic institution' : values1['school']),
      'Education Level': values1['educationLevel'],

      'What subjects are you currently taking or planning on taking?': stringifyBlock(values2['subjectsPlanned']),
      'Are you interested in any subjects that are currently not available at your school or academic institution? If yes, please specify.': (values2['subjectsOtherCheck'] ? 'I\'m currently not enrolled in any classes or instructional programs.' : values2['subjectsOther']),
      'What is your industry of interest or what are you interested in doing career-wise?': stringifyBlock(values2['industryInterested']),
      'How informed are you about your job, career or industry?': values2['industryInformed'] + ': ' + values2['industryInformedExplain'],
      'Have you already been exposed to or are working in your choice of job, career or industry?': stringifyBlock(values2['industryExposed']),

      'How much are your classes related to business?': (values3['classToBusinessCheck'] ? 'I\'m currently not enrolled in any classes or instructional programs.' : values3['classToBusiness']),
      'How much are your classes related to technology?': (values3['classToTechnologyCheck'] ? 'I\'m currently not enrolled in any classes or instructional programs.' : values3['classToTechnology']),
      'How often do you collaborate with your peers on assignments or projects?': (values3['collaborateWithPeersCheck'] ? 'I do not currently collaborate with anyone.' : values3['collaborateWithPeers']),
      'How often have you had an industry professional mentor you?': (values3['professionalMentorshipCheck'] ? 'I do not currently have a mentor.' : values3['professionalMentorship']),
      'Which do you prefer when learning or collaborating with others?': stringifyBlock(values3['collaboratingContact']),
      'How much time do you spend working online/remotely?': (values3['timeRemoteCheck'] ? 'I do not work online.' : values3['timeRemote']),
      'What kinds of activities do you like most?': stringifyBlock(values3['activitiesEnjoy']),

      'Are you interested in or would you be willing to attend instructional programs outside of your typical school schedule to enhance your educational or career opportunities?': stringifyBlock(values4['interestAttend']),
      'Which would you prefer when attending these instructional programs?': stringifyBlock(values4['attendMeetPref']),
      'What times would you prefer when attending these programs?': stringifyBlock(values4['attendTimePref']),
      'How often would you prefer to participate in these programs?': stringifyBlock(values4['participateFrequency']),
      'Is there anything else about you would like to have access to or participate in regarding your education or professional development?': values4['additionalComments'],
      'Would you be interested in learning more about TIV and how our company can help make an impact?': stringifyBlock(values4['interestTIV']),
      'I would like to receive updates regarding TIV.': (values4['interestTIVCheck'] ? 'True' : 'False')
    }

    $.ajax({
      url: process.env.REACT_APP_LEARNER_SURVEY_URL,
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
    <ProgressBar survey='learner/student' page={page} />
    {page === 1 ? <Page1 setSurvey={setSurvey} setPage={setPage} values={values1} setValues={setValues1} /> : ''}
    {page === 2 ? <Page2 setPage={setPage} values={values2} setValues={setValues2} /> : ''}
    {page === 3 ? <Page3 setPage={setPage} values={values3} setValues={setValues3} /> : ''}
    {page === 4 ? <Page4 setSurvey={setSurvey} setPage={setPage} setLogo={setLogo} values={values4} setValues={setValues4} submit={submit} /> : ''}
  </>
}
