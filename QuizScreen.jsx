import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { useFirebase } from '../contexts/FirebaseContext';

const QuizScreen = () => {
  const navigate = useNavigate();
  const {
    currentQuestions,
    currentQuestionIndex,
    answerQuestion,
    lives,
    score,
    streak,
    gameOver,
    playerName,
    selectedYear,
    mode
  } = useGame();
  
  const { saveScore } = useFirebase();
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit);
      setAnswered(false);
      setSelectedAnswerIndex(null);
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (gameOver) {
      if (mode === 'online') {
        saveScore(playerName, score, selectedYear);
      } else {
        const scores = JSON.parse(localStorage.getItem('offlineScores') || '[]');
        scores.push({
          name: playerName,
          score,
          year: selectedYear,
          timestamp: Date.now()
        });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('offlineScores', JSON.stringify(scores.slice(0, 10)));
      }
      
      setTimeout(() => navigate('/results'), 1500);
    }
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimeUp = () => {
    if (!answered) {
      answerQuestion(null);
      setAnswered(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (!answered) {
      answerQuestion(selectedAnswer);
      setAnswered(true);
      setSelectedAnswerIndex(selectedAnswer);
    }
  };

  if (!currentQuestion) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#F3F4F6',
        fontSize: '20px',
        color: '#4F46E5'
      }}>
        Loading questions...
      </div>
    );
  }

  const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const timeColor = timeLeft <= 10 ? '#EF4444' : '#4F46E5';

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', padding: '15px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[0, 1, 2].map((heart, i) => (
            <span key={i} style={{ 
              fontSize: '24px',
              opacity: i >= lives ? 0.3 : 1,
              transform: i >= lives ? 'scale(0.8)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              ❤️
            </span>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4F46E5', display: 'block' }}>
            {score}
          </span>
          {streak >= 3 && (
            <span style={{ 
              background: '#F59E0B', 
              color: 'white', 
              padding: '2px 10px', 
              borderRadius: '10px', 
              fontSize: '12px' 
            }}>
              🔥 {streak}x Streak!
            </span>
          )}
        </div>
        
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: timeColor,
          animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none'
        }}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ 
          height: '8px', 
          background: '#E5E7EB', 
          borderRadius: '4px', 
          overflow: 'hidden',
          marginBottom: '5px'
        }}>
          <div style={{ 
            height: '100%', 
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', display: 'block' }}>
          Question {currentQuestionIndex + 1} of {currentQuestions.length}
        </span>
      </div>

      {/* Question Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.5s ease'
      }}>
        <p style={{ fontSize: '20px', color: '#1F2937', marginBottom: '20px', lineHeight: '1.4' }}>
          {currentQuestion.question}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentQuestion.options.map((option, index) => {
            let btnStyle = {
              padding: '15px 20px',
              border: '3px solid #E5E7EB',
              borderRadius: '12px',
              background: 'white',
              fontSize: '16px',
              textAlign: 'left',
              cursor: answered ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              opacity: answered ? 0.7 : 1
            };
            
            if (answered) {
              if (index === currentQuestion.correctAnswer) {
                btnStyle = {
                  ...btnStyle,
                  borderColor: '#10B981',
                  background: '#D1FAE5',
                  color: '#065F46'
                };
              } else if (index === selectedAnswerIndex && index !== currentQuestion.correctAnswer) {
                btnStyle = {
                  ...btnStyle,
                  borderColor: '#EF4444',
                  background: '#FEE2E2',
                  color: '#991B1B'
                };
              }
            }
            
            const letters = ['A', 'B', 'C', 'D'];
            
            return (
              <button
                key={index}
                style={btnStyle}
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                <span style={{ fontWeight: 'bold', marginRight: '10px', color: '#4F46E5' }}>
                  {letters[index]}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;