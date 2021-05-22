import React, { useState } from 'react';
import Landing from './components/Landing';
import SurveyLearner from './components/survey_learner/Survey';
import SurveyProfessional from './components/survey_professional/Survey';
import SurveyOrganization from './components/survey_organization/Survey';
import SurveyCorporation from './components/survey_corporation/Survey';
import Thanks from './components/Thanks';
import './App.scss';
import './components/survey.scss';
import './components/mui.scss';
import './components/survey_mobile.scss';

export default () => {
  const [survey, setSurvey] = useState('Landing');
  const [logo, setLogo] = useState('img/logo_dark.png');
  const renderSurvey = () => {
    switch (survey) {
      case 'learner/student':
        return <div className='survey-container'><SurveyLearner setSurvey={setSurvey} setLogo={setLogo} /></div>
      case 'professional':
        return <div className='survey-container'><SurveyProfessional setSurvey={setSurvey} setLogo={setLogo} /></div>
      case 'organization/academic institution':
        return <div className='survey-container'><SurveyOrganization setSurvey={setSurvey} setLogo={setLogo} /></div>
      case 'corporation':
        return <div className='survey-container'><SurveyCorporation setSurvey={setSurvey} setLogo={setLogo} /></div>
      default:
        return ''
    }
  }

  return (
    <div className='App'>
      {survey === 'Landing' ? <Landing setSurvey={setSurvey} /> : ''}
      {survey !== 'Landing' ? <div className='survey-header'>
        <img className={'logo' + (logo === 'img/logo_dark.png' ? '-survey' : '-thanks')} src={logo} alt='TIV - Technology Innovation Village' />
      </div> : ''}
      {survey !== 'Landing' ? renderSurvey() : ''}
      {survey === 'thanks' ? <Thanks /> : ''}
    </div>
  );
}
