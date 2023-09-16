import { useState } from 'react';

export default function Home() {
  const [goals, setGoals] = useState('');
  const [activities, setActivities] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = () => {
    // TODO: Send the goals and activities to your AI model for analysis
    // For now, we'll just set a placeholder analysis
    setAnalysis('Your AI analysis will appear here.');
  };

  return (
    <div className="container">
      <h1>AI-Powered Journal</h1>

      <section className="input-section">
        <h2>Your Goals</h2>
        <textarea
          placeholder="What are your goals?"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        ></textarea>

        <h2>Your Activities</h2>
        <textarea
          placeholder="What did you do today?"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit}>Analyze</button>
      </section>

      <section className="analysis-section">
        <h2>Analysis</h2>
        <p>{analysis}</p>
        {/* TODO: Add graphs here */}
      </section>

      <style jsx>{`
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
        h2 {
          font-size: 1.5rem;
          color: #444;
          margin-bottom: 10px;
        }
        .input-section,
        .analysis-section {
          margin-bottom: 40px;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        textarea {
          width: 95%;
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
      `}</style>
    </div>
  );
}
