import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { writeEntry, writeGva, getDaysListener, getMetricsListener } from './api';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyA8M_Mu6U-LObR2JObJ8ooAXHXxX49zN9U",
  authDomain: "janus-4326f.firebaseapp.com",
  databaseURL: "https://janus-4326f-default-rtdb.firebaseio.com",
  projectId: "janus-4326f",
  storageBucket: "janus-4326f.appspot.com",
  messagingSenderId: "418343874787",
  appId: "1:418343874787:web:67e43fafabe304a3c8d5d6",
  measurementId: "G-1ZKGB6YD10",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [visions, setVisions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  //for colalpsible
  const [openSection, setOpenSection] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    // Load from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    const savedVisions = [localStorage.getItem('vision1'), localStorage.getItem('vision2'), localStorage.getItem('vision3')];
    const savedGoals = [localStorage.getItem('goal1'), localStorage.getItem('goal2'), localStorage.getItem('goal3'), localStorage.getItem('goal4')];
    const savedAttributes = [localStorage.getItem('attribute1'), localStorage.getItem('attribute2'), localStorage.getItem('attribute3'), localStorage.getItem('attribute4')];
    
    let headers = {
      'Content-Type': 'application/json',
      'uid': 1
    }
    axios.post('http://127.0.0.1:5000/day-entry', {headers: headers}).then(respone => console.log("metric response", response)).catch(error => console.log("metric error", error));
    if (savedEntries) setEntries(savedEntries);
    if (savedVisions) setVisions(savedVisions);
    if (savedGoals) setGoals(savedGoals);
    if (savedAttributes) setAttributes(savedAttributes);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user.uid);
  
        // Now you can set up your metrics listener
        let remove = getMetricsListener(user.uid, (snapshot) => {
          const metrics = snapshot.val();
          if (metrics) {
            setVisions(metrics.visions);
            setGoals(metrics.goals);
            setAttributes(metrics.attributes);
          }
        });
  
        // Cleanup function to unsubscribe from the metrics listener when the component unmounts
        return () => remove();
      } else {
        // User is signed out
        console.log("User is not signed in.");
      }
    });
  
    // Cleanup function to unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    localStorage.setItem('visions', JSON.stringify(visions));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('attributes', JSON.stringify(attributes));
  }, [entries, visions, goals, attributes]);

  

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setNewEntry(entries[date.toDateString()] || '');
  };

  const handleSaveEntry = async () => {
    const updatedEntries = { ...entries };
    updatedEntries[selectedDate.toDateString()] = newEntry;
    setEntries(updatedEntries);
    await writeEntry(newEntry);
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
