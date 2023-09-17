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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {/* Content */}
      <animated.div style={{ ...contentProps, textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2em' }}>Hey, I'm Janus, your personal micro-manager that helps you be the best person that you can be.</h1>
        <p style={{ fontSize: '1.2em' }}>
          You'll first tell me about your
        </p>
        <ul style={{ fontSize: '1.2em', textAlign: 'left', marginLeft: '150px' }}>
          <li>Visions - these are long-term, and sometimes vague aspirations. Think: being a billionaire or building a happy family.</li>
          <li>Goals - these are concrete things you want to accomplish in the near future. Think: getting all As or learning about relativity.</li>
          <li>Attributes - these are behaviours you want to change, which might help you reach your goals/visions. Think: spending less time on my phone or being more focused during work.</li>
        </ul>
        <p style={{ fontSize: '1.2em' }}>
          After this, you'll write me a journal entry each day, and I'll start providing you with insights into your life.
        </p>

		<br></br>
		<button style={{  fontFamily: "myfont" }} onClick ={setVisions}>Let me tell you what I want to accomplish.</button>
      </animated.div>
	  <style jsx>{`
		button {
			padding: 12px 24px;
			background-color: #ffffff;
			color: black;
			border: 1px solid black;
			border-radius: 4px;
			cursor: pointer;
			font-size: 1rem;
			transition: background-color 0.2s ease;
		}
		button:hover {
			background-color: #000000;
		}
	`}</style>
    </div>
  );
};

export default Start;
