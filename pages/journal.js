import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [visions, setVisions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  //for colalpsible
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    // Load from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    const savedVisions = [localStorage.getItem('vision1'), localStorage.getItem('vision2'), localStorage.getItem('vision3')];
    const savedGoals = [localStorage.getItem('goal1'), localStorage.getItem('goal2'), localStorage.getItem('goal3'), localStorage.getItem('goal4')];
    const savedAttributes = [localStorage.getItem('attribute1'), localStorage.getItem('attribute2'), localStorage.getItem('attribute3'), localStorage.getItem('attribute4')];

    if (savedEntries) setEntries(savedEntries);
    if (savedVisions) setVisions(savedVisions);
    if (savedGoals) setGoals(savedGoals);
    if (savedAttributes) setAttributes(savedAttributes);
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    localStorage.setItem('visions', JSON.stringify(visions));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('attributes', JSON.stringify(attributes));
  }, [entries, visions, goals, attributes]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewEntry(entries[date.toDateString()] || '');
  };

  const handleSaveEntry = () => {
    const updatedEntries = { ...entries };
    updatedEntries[selectedDate.toDateString()] = newEntry;
    setEntries(updatedEntries);
  };

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className="container">
      <h1>Janus</h1>
      <div className="top-section">
        <div className="calendar-section">
          <Calendar onChange={handleDateChange} value={selectedDate} />

        <h2>Your Personal Goals</h2>
        <div className="dropdown-section">
          <h3 onClick={() => toggleSection('visions')}>Visions {openSection === 'visions' ? '-' : '+'}</h3>
          {openSection === 'visions' && (
            <ul>
              {visions.filter(vision => vision).map((vision, index) => <li key={index}>{vision}</li>)}
            </ul>
          )}
        </div>
        <div className="dropdown-section">
          <h3 onClick={() => toggleSection('goals')}>Goals {openSection === 'goals' ? '-' : '+'}</h3>
          {openSection === 'goals' && (
            <ul>
              {goals.filter(goal => goal).map((goal, index) => <li key={index}>{goal}</li>)}
            </ul>
          )}
        </div>
        <div className="dropdown-section">
          <h3 onClick={() => toggleSection('attributes')}>Attributes {openSection === 'attributes' ? '-' : '+'}</h3>
          {openSection === 'attributes' && (
            <ul>
              {attributes.filter(attribute => attribute).map((attribute, index) => <li key={index}>{attribute}</li>)}
            </ul>
          )}
        </div>
      </div>
      </div>
      <div className="entry-section">
        <h2>Journal Entry for {selectedDate.toDateString()}</h2>
        <textarea
          placeholder="What's on your mind today?"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        ></textarea>
        <button onClick={handleSaveEntry} style={{fontFamily: 'myfont'}}>Save Entry</button>
      </div>
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: auto;
          padding: 40px;
        }
        .top-section {
          display: flex;
          justify-content: space-between;
        }
        .calendar-section,
        .goals-section {
          flex: 1;
          margin: 0 10px;
        }
        .entry-section {
          margin-top: 40px;
        }
        textarea {
          width: 100%;
          height: 150px;
        }
        button {
          padding: 12px 24px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        h3 {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
