import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo from './januslogo.png';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  // Animation for the left side
  const leftProps = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 },
  });

  // Animation for the right side
  const rightProps = useSpring({
    opacity: 1,
    marginRight: 0,
    from: { opacity: 0, marginRight: -500 },
  });

  const startJourney = () => {
	window.location.href = '/start';
  };

  return (
	<div>
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white' }}>
      {/* Left Side */}
      <animated.div style={{ ...leftProps, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '4em' }}>Janus</h1>
        <p style={{ fontSize: '1.5em', fontFamily: "myfont" }}>build a better you.</p>
		<button style={{  fontFamily: "myfont" }} onClick ={startJourney}>Hi Janus, let's get started.</button>
      </animated.div>

      {/* Right Side */}
      <animated.div style={{ ...rightProps, flex: 1 }}>
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br>
		<Image src = {logo} alt="Your Logo" style={{ width: '100%', height: 'auto' }} />
      </animated.div>
    </div>

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

export default LandingPage;
