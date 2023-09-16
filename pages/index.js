import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [newEntry, setNewEntry] = useState('');
  const [personalGoals, setPersonalGoals] = useState('');

  useEffect(() => {
    // Load entries and personal goals from localStorage when the component mounts
    const savedEntries = localStorage.getItem('journalEntries');
    const savedGoals = localStorage.getItem('personalGoals');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedGoals) {
      setPersonalGoals(savedGoals);
    }
  }, []);

  useEffect(() => {
    // Save entries and personal goals to localStorage whenever they change
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    localStorage.setItem('personalGoals', personalGoals);
  }, [entries, personalGoals]);

  useEffect(() => {
    // Load the entry for the selected date when the date changes
    setNewEntry(entries[selectedDate.toDateString()] || '');
  }, [selectedDate, entries]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveEntry = () => {
    setEntries({
      ...entries,
      [selectedDate.toDateString()]: newEntry,
    });
  };

  const renderTileContent = ({ date, view }) => {
    const dateStr = date.toDateString();
    if (view === 'month' && entries[dateStr]) {
      return <div className="entry-indicator"></div>;
    }
    return null;
  };

   // Sort entries by date
   const sortedEntries = Object.keys(entries)
   .sort((a, b) => new Date(a) - new Date(b))
   .map((date) => ({ date, entry: entries[date] }));

   const analyzeWithGPT4 = async () => {
    const apiKey = 'your-gpt-4-api-key-here'; // Replace with your actual GPT-4 API key
    const prompt = `Goals: ${personalGoals}\nJournal: ${newEntry}`; // Combine your goals and journal entry into a single string
    const maxTokens = 100; // You can set this to limit the length of the generated text
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      };
  
      const payload = {
        prompt,
        max_tokens: maxTokens
      };
  
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', payload, config);
      const generatedText = response.data.choices[0].text;
  
      console.log('Generated Text:', generatedText);
      // Do something with the generated text, like displaying it in your app
  
    } catch (error) {
      console.error('Error calling GPT-4 API:', error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontFamily: "'Montserrat', sans-serif" }}>Janus</h1>

      <div className="calendar-section" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={renderTileContent}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <button onClick={analyzeWithGPT4}>Analyze with GPT-4</button>
      </div>

      <div className="entry-section">
        <h2 style={{ fontFamily: "'Montserrat', sans-serif" }}>Journal Entry for {selectedDate.toDateString()}</h2>
        <textarea
          placeholder="What's on your mind today?"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        ></textarea>
        <button style={{ fontFamily: "'Montserrat', sans-serif" }} onClick={handleSaveEntry}>Save Entry</button>
      </div>

      <div className="goals-section">
        <h2 style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Personal Goals</h2>
        <textarea
          placeholder="What are your personal goals?"
          value={personalGoals}
          onChange={(e) => setPersonalGoals(e.target.value)}
        ></textarea>
        <button style={{ fontFamily: "'Montserrat', sans-serif" }}>Save Entry</button>
      </div>

      <style jsx>{`
      body{
        font-family: 'Montserrat', sans-serif;
      }
        .container {
          max-width: 900px;
          margin: auto;
          padding: 40px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }
        .calendar-section,
        .entry-section, .goals-section {
          margin-bottom: 40px;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          font-size: 1.5rem;
          color: #444;
          margin-bottom: 10px;
        }
        textarea {
          width: 100%;
          height: 150px;
          margin-bottom: 20px;
          padding: 15px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 12px 24px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s ease;
        }
        button:hover {
          background-color: #0056b3;
        }
        .react-calendar__tile {
          background: #f9f9f9;
          color: #333;
        }
        
        /* Style the selected date */
        .react-calendar__tile--active {
          background: #0070f3;
          color: white;
        }
        
        /* Style the current date */
        .react-calendar__tile--now {
          background: #ccc;
          color: white;
        }
        
        /* Style the calendar navigation buttons */
        .react-calendar__navigation button {
          background: none;
          color: #333;
          font-size: 1.2em;
        }
        
        /* Style the calendar labels */
        .react-calendar__month-view__days__day--weekend,
        .react-calendar__month-view__weekdays__weekday {
          color: #666;
        }

        .entry-indicator {
          width: 10px;
          height: 10px;
          background-color: green;
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          right: 4px;
        }
      `}</style>
    </div>
  );
}

