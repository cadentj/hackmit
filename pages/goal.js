import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Goals = () => {
  const [goal1, setGoal1] = useState('');
  const [goal2, setGoal2] = useState('');
  const [goal3, setGoal3] = useState('');
  const [goal4, setGoal4] = useState('');

  // Animation for the content
  const contentProps = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 },
  });

  const handleSubmit = () => {
    // Store goals in localStorage
    localStorage.setItem('goal1', goal1);
    localStorage.setItem('goal2', goal2);
    localStorage.setItem('goal3', goal3);
    localStorage.setItem('goal4', goal4);
    console.log('Goals submitted:', { goal1, goal2, goal3, goal4 });
	window.location.href = '/attribute';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      {/* Content */}
      <animated.div style={{ ...contentProps, padding: '20px' }}>
        <h1 style={{ fontSize: '2em' }}>Now, tell me about your goals.</h1>
        <p style={{ fontSize: '1.2em' }}>
          These are concrete things you want to achieve within the next 3-24 months.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          Give me 2-4.
        </p>
		Examples:
		<ul style={{ textAlign: 'left', marginLeft: '10px' }}>
			<li>Getting all As</li>
			<li>Learning about relativity</li>
			<li>Making $1 million in revenue</li>
		</ul>
        <center><input type="text" placeholder="Goal 1" value={goal1} onChange={(e) => setGoal1(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Goal 2" value={goal2} onChange={(e) => setGoal2(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Goal 3" value={goal3} onChange={(e) => setGoal3(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} />
        <input type="text" placeholder="Goal 4" value={goal4} onChange={(e) => setGoal4(e.target.value)} style={{ width: '80%', padding: '10px', margin: '5px', borderRadius: '5px' }} /><br></br>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '1em', borderRadius: '5px', cursor: 'pointer', fontFamily: 'myfont' }}>Submit</button></center>
      </animated.div>
    </div>
  );
};

export default Goals;
