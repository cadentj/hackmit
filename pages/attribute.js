import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Attributes = () => {
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [attribute3, setAttribute3] = useState('');
  const [attribute4, setAttribute4] = useState('');

  // Animation for the content
  const contentProps = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 },
  });

  const handleSubmit = () => {
    // Store attributes in localStorage
    localStorage.setItem('attribute1', attribute1);
    localStorage.setItem('attribute2', attribute2);
    localStorage.setItem('attribute3', attribute3);
    localStorage.setItem('attribute4', attribute4);
    console.log('Attributes submitted:', { attribute1, attribute2, attribute3, attribute4 });
	window.location.href = '/journal';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {/* Content */}
      <animated.div style={{ ...contentProps, padding: '20px' }}>
        <h1 style={{ fontSize: '2em' }}>Now, tell me about your attributes.</h1>
        <p style={{ fontSize: '1.2em' }}>
          These are ways you want to change your behaviors, possibly to help you reach your goals and visions.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          Give me 2-4.
        </p>
		Examples:
		<ul style={{ textAlign: 'left', marginLeft: '10px' }}>
			<li>Spending less time on my phone</li>
			<li>Being more focused during work</li>
			<li>Prioritizing relationships</li>
			<li>Exercise more</li>
		</ul>
        <center><input type="text" placeholder="Attribute 1" value={attribute1} onChange={(e) => setAttribute1(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Attribute 2" value={attribute2} onChange={(e) => setAttribute2(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Attribute 3" value={attribute3} onChange={(e) => setAttribute3(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Attribute 4" value={attribute4} onChange={(e) => setAttribute4(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} /><br></br>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '1em', borderRadius: '5px', cursor: 'pointer', fontFamily: 'myfont' }}>Submit. Let's start journaling.</button></center>
      </animated.div>
    </div>
  );
};

export default Attributes;
