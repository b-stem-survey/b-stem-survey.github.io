import React, { useState, useEffect, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import '../tailwind.css';
import './landing.scss';
import './landing_mobile.scss';

export default props => {
  const { setSurvey } = props;
  const [select, setSelect] = useState('Landing');
  const choiceRef = useRef();

  useEffect(() => animateScroll.scrollToTop({ duration: 100 }), []);

  const setOption = option => select === option ? setSelect('Landing') : setSelect(option);
  const checkOptionClass = option => select === option ? ' selected' : '';

  return <div className='landing-container'>
    <div className='header'>
      <div className='logo-container'>
        <img className='logo' src='img/logo_light.png' alt='TIV - Technology Innovation Village' />
      </div>
    </div>
    <div className='splash'>
      <div className='splash-container'>
        <div className='text-container'>
          <img className='img-text' src='img/header_txt_u426.png' alt='Online Research Survey for EDUCATION - Your input makes a difference' />
          <span className='text'>Complete the survey for a chance to win an iPad Air!</span>
        </div>
        <div className='img-container'>
          <img className='win-text' src='img/u411.png' alt='Win an iPad Air!' />
          <img className='img-ipad' src='img/u408.png' alt='iPad Air' />
        </div>
      </div>
    </div>
    <div className='choice-container' ref={choiceRef}>
      <div className='text-container'>
        <h2>The Survey</h2>
        <p>
          Are you a student, teacher, educator or sponsor of education? If so, then we hope that you will help us to develop a dynamic impact-driven platform, <b>Tech Innovation Villages</b> (TIV). It truly does take a village - each of us doing our part - to make an impact!
        </p>
        <h3>Start by letting us know who you are</h3>
        <p>
          The sole purpose of the survey is to collect data — we are not asking you to sign up for anything.<br></br>
          The survey will only take a few minutes, and once completed you will be entered in to win our prize drawing: a new Apple iPad Air!
        </p>
      </div>
      <div className='option-container'>
        <div className={'option select-none' + checkOptionClass('learner/student')}
          onClick={() => setOption('learner/student')}>
          <i className='fas fa-user-graduate' />
          {checkOptionClass('learner/student') ? <i className='fas fa-check-circle' /> : ''}
          <span className='text'>Learner/Student</span>
        </div>
        <div className={'option select-none' + checkOptionClass('professional')}
          onClick={() => setOption('professional')}>
          <i className='fas fa-briefcase' />
          {checkOptionClass('professional') ? <i className='fas fa-check-circle' /> : ''}
          <span className='text'>Professional</span>
        </div>
        <div className={'option select-none' + checkOptionClass('organization/academic institution')}
          onClick={() => setOption('organization/academic institution')}>
          <i className='fas fa-school' />
          {checkOptionClass('organization/academic institution') ? <i className='fas fa-check-circle' /> : ''}
          <div className='text'>
            <span>Organization/</span>
            <span>Academic Institution</span>
          </div>
        </div>
        <div className={'option select-none' + checkOptionClass('corporation')}
          onClick={() => setOption('corporation')}>
          <i className='far fa-building' />
          {checkOptionClass('corporation') ? <i className='fas fa-check-circle' /> : ''}
          <span className='text'>Corporation</span>
        </div>
      </div>
      <button className={select !== 'Landing' ? 'selected' : ''} type='button'
        onClick={() => setSurvey(select)}>Go To Survey</button>
    </div>
    <div className='info-container-1'>
      <h2>About TIV</h2>
      <div className='info-wrapper'>
        <div className='text-container'>
          <p>
            TIV prepares <b>youth and young adults ages 9-25</b>, including students and recent graduates, for the 21st century workforce. TIV offers <b>FREE</b> business and technology-driven project-based learning programs through an entrepreneurship lens. Programs are uniquely designed to provide talent, in <b>underserved and underbanked communities</b> across the nation, exposure to various disciplines, industries and job sectors. These multidisciplinary hands-on experiences include instruction and mentorship by leading professionals.
          </p>
          <p>
            As opposed to a classroom or a textbook approach, TIV <b>in-person, virtual and hybrid</b> programs provide real-world learning experiences. It’s a dynamic opportunity for aspiring and emerging talent to explore their passions, increase their knowledge base, and cultivate both their hard and soft skill sets.
          </p>
          <p>
            TIV will also serve as an extension of programming for <b>educational institutions</b> and <b>community youth-based organizations</b>.
          </p>
          <p>
            <span className='ref' onClick={() => choiceRef.current.scrollIntoView({ behavior: 'smooth' })}>B~STEM Project</span> is a nonprofit organization committed to providing free and equitable educational and professional development experiences to foster the next generation of talent.
          </p>
        </div>
      </div>
    </div>
    <div className='info-container-2'>
      <div className='info-wrapper'>
        <div className='text-container'>
          <h4>Our Mission</h4>
          <p>
            TIV’s mission is to educate and empower young girls and women interested in cultivating business and tech skills across all industries and job sectors.
          </p>
          <span className='ref'>Learn more about us</span>
        </div>
        <div className='socials-container'>
          <h4>Connect with us</h4>
          <div className='icon-container'>
            <i className='fab fa-twitter' />
            <i className='fab fa-linkedin-in' />
            <i className='fab fa-facebook-f' />
            <i className='fab fa-instagram' />
            <i className='fab fa-youtube' />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div className='text-container'>
        <h4>© 2021 All Rights Reserved.</h4>
      </div>
    </footer>
  </div>
}
