import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const SetupScreen = () => {
  const navigate = useNavigate();
  const {
    playerName, setPlayerName,
    mode, setMode,
    selectedYear, setSelectedYear,
    selectedTheme, setSelectedTheme,
    selectedTopic, setSelectedTopic,
    difficulty, setDifficulty,
    startGame
  } = useGame();

  const themes = ['Variety and Classification', 'Energy and Forces', 'Cycles', 'Systems', 'Personal Health'];
  
  const topics = {
    4: ['Living Things', 'Non-Living Things', 'Energy', 'Heat', 'Light', 'Sound', 'Magnets', 'Earth and Sun', 'Water', 'Personal Health', 'Systems'],
    5: ['Living Things', 'Adaptation', 'Energy', 'Light', 'Sound', 'Magnets', 'Life Cycles', 'Water', 'Personal Health', 'Plant Systems'],
    6: ['Classification', 'Forces', 'Energy', 'Machines', 'Solar System', 'Personal Health', 'Environment', 'Electrical Systems']
  };

  const style = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      color: 'white'
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      margin: '20px 0 30px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    form: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '25px'
    },
    group: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '10px',
      border: '2px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      fontSize: '16px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '10px',
      border: '2px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      fontSize: '16px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      flex: 1,
      padding: '12px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px'
    },
    buttonActive: {
      flex: 1,
      padding: '12px',
      border: '2px solid #F59E0B',
      borderRadius: '10px',
      background: '#F59E0B',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px'
    },
    startButton: {
      width: '100%',
      border: 'none',
      borderRadius: '15px',
      padding: '18px',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontFamily: 'inherit',
      background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
      color: 'white',
      marginTop: '20px'
    }
  };

  const handleStart = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }
    startGame();
    navigate('/quiz');
  };

  return (
    <div style={style.container}>
      <h2 style={style.title}>Choose Your Quest</h2>
      
      <div style={style.form}>
        <div style={style.group}>
          <label style={style.label}>Your Name*</label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={style.input}
          />
        </div>

        <div style={style.group}>
          <label style={style.label}>Game Mode</label>
          <div style={style.buttonGroup}>
            <button
              style={mode === 'offline' ? style.buttonActive : style.button}
              onClick={() => setMode('offline')}
            >
              📱 Offline
            </button>
            <button
              style={mode === 'online' ? style.buttonActive : style.button}
              onClick={() => setMode('online')}
            >
              🌐 Online
            </button>
          </div>
        </div>

        <div style={style.group}>
          <label style={style.label}>Year</label>
          <div style={style.buttonGroup}>
            {[4, 5, 6].map(year => (
              <button
                key={year}
                style={selectedYear === year ? style.buttonActive : style.button}
                onClick={() => setSelectedYear(year)}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        <div style={style.group}>
          <label style={style.label}>Theme (Optional)</label>
          <select
            value={selectedTheme || ''}
            onChange={(e) => setSelectedTheme(e.target.value || null)}
            style={style.select}
          >
            <option value="">All Themes</option>
            {themes.map(theme => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>

        <div style={style.group}>
          <label style={style.label}>Topic (Optional)</label>
          <select
            value={selectedTopic || ''}
            onChange={(e) => setSelectedTopic(e.target.value || null)}
            style={style.select}
          >
            <option value="">All Topics</option>
            {topics[selectedYear]?.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div style={style.group}>
          <label style={style.label}>Difficulty</label>
          <div style={style.buttonGroup}>
            {['easy', 'medium', 'hard'].map(diff => (
              <button
                key={diff}
                style={difficulty === diff ? style.buttonActive : style.button}
                onClick={() => setDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button style={style.startButton} onClick={handleStart}>
          Start Quest! 🎮
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;