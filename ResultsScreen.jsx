import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const ResultsScreen = () => {
  const navigate = useNavigate();
  const { playerName, score, lives, maxStreak, answers } = useGame();
  
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const wrongAnswers = answers.filter(a => !a.isCorrect).length;
  
  const getEmoji = () => {
    if (score > 5000) return '🏆';
    if (score > 3000) return '🌟';
    if (score > 1000) return '👍';
    return '📚';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '25px',
        padding: '40px 30px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <span style={{ fontSize: '80px', display: 'block', marginBottom: '20px' }}>
          {getEmoji()}
        </span>
        <h2 style={{ color: '#1F2937', marginBottom: '10px' }}>
          Great Job, {playerName}!
        </h2>
        
        <div style={{
          fontSize: '56px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #F59E0B, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '10px 0'
        }}>
          {score}
        </div>
        <p style={{ color: '#6B7280' }}>total points</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '20px 0' }}>
          <div>
            <span style={{ display: 'block', fontSize: '12px', color: '#6B7280' }}>✅ Correct</span>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#10B981' }}>
              {correctAnswers}
            </span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '12px', color: '#6B7280' }}>❌ Wrong</span>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>
              {wrongAnswers}
            </span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '12px', color: '#6B7280' }}>🔥 Best Streak</span>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>
              {maxStreak}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/setup')}
            style={{
              width: '100%',
              padding: '18px',
              border: 'none',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Play Again! 🎮
          </button>
          <button 
            onClick={() => navigate('/leaderboard')}
            style={{
              width: '100%',
              padding: '18px',
              border: '2px solid #E5E7EB',
              borderRadius: '15px',
              background: 'white',
              color: '#4F46E5',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            View Leaderboard 🏆
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '18px',
              border: '2px solid #E5E7EB',
              borderRadius: '15px',
              background: 'white',
              color: '#6B7280',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Back to Home 🏠
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;