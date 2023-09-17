import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Vision = () => {
  const [vision1, setVision1] = useState('');
  const [vision2, setVision2] = useState('');
  const [vision3, setVision3] = useState('');

  // Animation for the content
  const contentProps = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 },
  });

  const handleSubmit = () => {
    // Store visions in localStorage
    localStorage.setItem('vision1', vision1);
    localStorage.setItem('vision2', vision2);
    localStorage.setItem('vision3', vision3);
    console.log('Visions submitted:', { vision1, vision2, vision3 });
	window.location.href = '/goal';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {/* Content */}
      <animated.div style={{ ...contentProps, padding: '20px' }}>
        <h1 style={{ fontSize: '2em' }}>First, we're going to talk about your visions.</h1>
        <p style={{ fontSize: '1.2em' }}>
          These are your wildest dreams, greatest fantasies, the things that keep you up at night.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          Give me 2-3 good ones.
        </p>
			Examples:
			<ul style={{ textAlign: 'left', marginLeft: '10px' }}>
				<li>Being a billionaire</li>
				<li>Building a happy family</li>
				<li>Being a famous actor</li>
			</ul>
			<center><input type="text" placeholder="Vision 1" value={vision1} onChange={(e) => setVision1(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px' }} />
        <input type="text" placeholder="Vision 2" value={vision2} onChange={(e) => setVision2(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px'}} />
        <input type="text" placeholder="Vision 3" value={vision3} onChange={(e) => setVision3(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px' }} /><br></br>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', fontFamily: 'myfont' }}>Submit</button></center>
      </animated.div>
      <style jsx>{`
        input, button{
          border:1px solid black;
          box-shadow: 3px 3px 3px 0px #888888;
          margin-top: 10px;
          padding-left: 10px;
        }
        button:hover {
          box-shadow: 5px 5px 3px 0px #888888;
        }
        `}</style>
    </div>
  );
};

export default Vision;
