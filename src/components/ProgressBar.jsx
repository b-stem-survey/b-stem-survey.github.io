import React from 'react';

export default props => {
  const { survey, page } = props
  let progress = {};

  const currentCheck = nodeNum => page === nodeNum ? ' current' : '';
  const completeCheck = nodeNum => page > nodeNum ? ' complete' : '';

  if (survey === 'learner/student') {
    progress = {
      1: 'Basic info',
      2: 'Education',
      3: 'Business and Technology',
      4: 'Programs'
    }
  } else if (survey === 'professional') {
    progress = {
      1: 'Basic Info',
      2: 'Professional Info',
      3: 'Volunteering'
    }
  } else if (survey === 'organization/academic institution') {
    progress = {
      1: 'Basic Info',
      2: 'Institution Info',
      3: 'Partnership'
    }
  } else if (survey === 'corporation') {
    progress = {
      1: 'Basic Info',
      2: 'Developing Talent',
      3: 'Resources'
    }
  }

  let progWidth = 'calc((100%)*' + (1 - (survey === 'learner/student' ? 0.3333 : 0.5)*Math.max(0, page - 1)) + ')';

  return <div className={'progress-bar-container' + (survey === 'learner/student' ? ' prog-4' : ' prog-3')}>
    <div className='node-container'>
      <div className='node-wrapper'>
        <div className={'circle-outer c1'  + currentCheck(1) + completeCheck(1)}>
          <div className='circle-inner'>
            {page > 1 ? <i className='fas fa-check' /> : 1}
          </div>
        </div>
        <span className='descriptor'>{progress[1]}</span>
      </div>
      <div className='node-wrapper'>
        <div className={'circle-outer c2' + currentCheck(2) + completeCheck(2)}>
          <div className='circle-inner'>
            {page > 2 ? <i className='fas fa-check' /> : 2}
          </div>
        </div>
        <span className='descriptor'>{progress[2]}</span>
      </div>
      <div className='node-wrapper'>
        <div className={'circle-outer c3' + currentCheck(3) + completeCheck(3)}>
          <div className='circle-inner'>
            {page > 3 ? <i className='fas fa-check' /> : 3}
          </div>
        </div>
        <span className='descriptor'>{progress[3]}</span>
      </div>
      {survey === 'learner/student' ? <div className='node-wrapper'>
        <div className={'circle-outer c4' + currentCheck(4) + completeCheck(4)}>
          <div className='circle-inner'>
            {page > 4 ? <i className='fas fa-check' /> : 4}
          </div>
        </div>
        <span className='descriptor'>{progress[4]}</span>
      </div> : ''}
    </div>
    <div className='progress-auxiliary'>
      <div className='progress'></div>
      <div className='remaining' style={{width: progWidth}}></div>
    </div>
  </div>
}
