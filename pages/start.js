import React from 'react';
import { useSpring, animated } from 'react-spring';

const Start = () => {
  // Animation for the content
  const contentProps = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 },
  });

  const setVisions = () => {
	  window.location.href = '/vision';
  };


  return (
    <center><div style={{ display: 'flex', width:'80%', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {/* Content */}
      <animated.div style={{ ...contentProps, textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2em' }}>Hey, I'm Janus, your personal micro-manager that helps you be the best person that you can be.</h1>
        <p style={{ fontSize: '1.2em' }}>
          You'll first tell me about your
        </p>
        <ul style={{ fontSize: '1.2em', textAlign: 'left', marginLeft: '125px', width:'80%' }}>
          <li><i>Visions</i> - these are long-term, and sometimes vague aspirations. Think: being a billionaire or building a happy family.</li>
          <li><i>Goals</i> - these are concrete things you want to accomplish in the near future. Think: getting all As or learning about relativity.</li>
          <li><i>Attributes</i> - these are behaviors you want to change, which might help you reach your goals/visions. Think: spending less time on my phone or being more focused during work.</li>
        </ul>
        <p style={{ fontSize: '1.6em' }}>
          After this, you'll write me a journal entry each day, and I'll start providing you with insights into your life.
        </p>

		<br></br>
		<button style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', fontFamily: 'myfont' }} onClick ={setVisions}>Let me tell you what I want to accomplish.</button>
      </animated.div>
	  <style jsx>{`

		button{
			border:1px solid black;
			box-shadow: 3px 3px 3px 0px #888888;
			margin-top: 10px;
			padding-left: 10px;
			cursor: pointer;
			font-size: 1rem;
			transition: background-color 0.2s ease;
		  }
		  button:hover {
			box-shadow: 5px 5px 3px 0px #888888;
		  }
	`}</style>
    </div></center>
  );
};

export default Start;
