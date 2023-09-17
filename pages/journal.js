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
          <Calendar className="calendar-font" onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="metric-container">
          <h2>Your Personal Metrics</h2>

          <div className="dropdown-section">
            <p onClick={() => toggleSection('visions')}>visions {openSection === 'visions' ? '-' : '+'}</p>
          </div>
          
            {openSection === 'visions' && (
              <div>
                {visions.filter(vision => vision).map((vision, index) => 
                
                <div className="metric-section" key={index}>
                  <div>
                    <span className="metric-name">{vision}</span>
                    <span className="metric-score"><span style={{color: "#ff0000"}}>55</span>/100</span>
                  </div>
                  <span className="metric-info">some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric </span>
                </div>
              
              )}
              </div>
            )}
          <div className="dropdown-section">
            <p onClick={() => toggleSection('goals')}>goals {openSection === 'goals' ? '-' : '+'}</p>
          </div>
          {openSection === 'goals' && (
              <div>
                { 
                  goals.filter(goal => goal).map((goal, index) => 
                    <div className="metric-section" key={index}>

                      <div>
                       <span className="metric-name">{goal}</span>
                       <span className="metric-score"><span style={{color: "#ff0000"}}>55</span>/100</span>
                      </div>
                      <span className="metric-info">some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric </span>

                    </div>
                  )
                }
              </div>
            )}
          <div className="dropdown-section">
            <p onClick={() => toggleSection('attributes')}>attributes {openSection === 'attributes' ? '-' : '+'}</p>
          </div>
          
          {openSection === 'attributes' && (
            <div>
              {
                attributes.filter(attribute => attribute).map((attribute, index) => 
                <div className="metric-section" key={index}>
                  <div>
                    <span className="metric-name">{attribute}</span>
                    <span className="metric-score"><span style={{color: "#ff0000"}}>55</span>/100</span>
                  </div>
                  <span className="metric-info">some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric some test info about your metric </span>
                </div>)}
            </div>
          )}
        </div>
      </div>
      <div className="entry-section">
        <h2>Journal Entry for {selectedDate.toDateString()}</h2>

        {/* <div className="entry-input">  */}
          <textarea className="entry-input"
            placeholder="please tell me everything that you did today"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          ></textarea>
          <button onClick={handleSaveEntry} style={{fontFamily: 'myfont'}}>save entry</button>
        {/* </div> */}
        
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
        .calendar-section {
          color: white;
        }
        .calendar-font {
          font-family: 'myfont' !important;
        }
        .goals-section {
          flex: 1;
          margin: 0 10px;
        }
        .entry-section {
          margin-top: 40px;
        }
        .dropdown-section {
          margin-top: 10px;
          padding-left: 10px;
        }
        // general box styling section
        .entry-input, .dropdown-section, button, .metric-section {
          border:1px solid black;
          box-shadow: 3px 3px 3px 0px #888888;
        }
        .metric-section {
          padding: 5px 5px 5px 5px;
          margin: 5px 0px 5px 10px;
          flex-direction: column;
        }
        .metric-container {
          width: 35%;
        }
        .metric-info {
          display: none;
          transition: all .3s ease;
          overflow: hidden;
        }
        .metric-section:hover .metric-name {
          display: none;
        }
        .metric-section:hover .metric-info {
          display: inline;
          transition: height 10s ease-out;

        }
        .metric-section:hover .metric-score {
          display:none;
        }
        .metric-score {
          float: right;
        }
        .dropdown-section:hover, textarea:hover, button:hover {
          box-shadow: 5px 5px 3px 0px #888888;
        }
        textarea {
          width: 100%;
          height: 150px;
          resize: none;
          outline: none;
        }
        button {
          padding: 12px 24px;
          // color: rgb(114,117,165);
          cursor: pointer;
          padding-left: 10px;
        }
        h3 {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
