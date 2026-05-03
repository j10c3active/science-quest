import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', color: 'white', width: '100%' }}>
        <div style={{ marginBottom: '40px' }}>
          <span style={{ fontSize: '80px', display: 'block', animation: 'bounce 2s infinite' }}>⚗️</span>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', margin: '10px 0', textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
            Science Quest
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Master Science, Have Fun!</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
          <button 
            onClick={() => navigate('/setup')}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '18px 40px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            🚀 Start Adventure
          </button>
          
          <button 
            onClick={() => navigate('/leaderboard')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '20px',
              padding: '18px 40px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            🏆 Leaderboard
          </button>
          
          <button 
            onClick={() => navigate('/print')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '20px',
              padding: '18px 40px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            📄 Print Quiz
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '5px' }}>📚</span>
            <p>Years 4-6</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '5px' }}>🎯</span>
            <p>Multiple Topics</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '5px' }}>🏅</span>
            <p>Earn Badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;