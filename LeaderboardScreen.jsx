import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { useGame } from '../contexts/GameContext';

const LeaderboardScreen = () => {
  const navigate = useNavigate();
  const { playerName } = useGame();
  const { getLeaderboard } = useFirebase();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const onlineLeaders = await getLeaderboard();
      const offlineScores = JSON.parse(localStorage.getItem('offlineScores') || '[]');
      
      const allLeaders = [...onlineLeaders, ...offlineScores]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      
      setLeaders(allLeaders);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrophy = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '⭐';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '28px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          🏆 Hall of Fame
        </h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          ← Home
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: 'white', fontSize: '18px' }}>
          Loading leaderboard...
        </div>
      ) : leaders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {leaders.map((leader, index) => (
            <div
              key={index}
              style={{
                background: leader.name === playerName ? '#FEF3C7' : 'rgba(255,255,255,0.95)',
                borderRadius: '15px',
                padding: '15px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                border: leader.name === playerName ? '3px solid #F59E0B' : 'none',
                transform: leader.name === playerName ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '40px' }}>
                <span style={{ fontSize: '24px' }}>{getTrophy(index)}</span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>#{index + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#1F2937', display: 'block' }}>
                  {leader.name}
                </span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                  Year {leader.year}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#4F46E5', display: 'block' }}>
                  {leader.score}
                </span>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>points</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px 20px', color: 'white' }}>
          <p style={{ marginBottom: '20px', fontSize: '18px' }}>
            No scores yet! Be the first to play! 🎮
          </p>
          <button 
            onClick={() => navigate('/setup')}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Start Playing
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;