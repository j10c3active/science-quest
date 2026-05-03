import React, { createContext, useContext, useState, useCallback } from 'react';
import { questionsByYear } from '../data/questions';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [mode, setMode] = useState('offline');
  const [selectedYear, setSelectedYear] = useState(4);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startGame = useCallback(() => {
    let filtered = questionsByYear[selectedYear] || [];
    
    if (selectedTheme) {
      filtered = filtered.filter(q => q.theme === selectedTheme);
    }
    if (selectedTopic) {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }
    
    // If no questions match, use all questions for that year
    if (filtered.length === 0) {
      filtered = questionsByYear[selectedYear] || [];
    }
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    
    const timeMultiplier = {
      easy: 30,
      medium: 20,
      hard: 15
    };
    
    const questionsWithTimer = shuffled.slice(0, 20).map(q => ({
      ...q,
      timeLimit: timeMultiplier[difficulty],
      points: difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300
    }));
    
    setCurrentQuestions(questionsWithTimer);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setMaxStreak(0);
    setGameOver(false);
    setAnswers([]);
  }, [selectedYear, selectedTheme, selectedTopic, difficulty]);

  const answerQuestion = useCallback((selectedAnswer) => {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    const newAnswers = [...answers, {
      question: question.question,
      selected: selectedAnswer,
      correct: question.correctAnswer,
      isCorrect
    }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      
      const streakBonus = Math.floor(newStreak / 3) * 50;
      const pointsEarned = question.points + streakBonus;
      setScore(prev => prev + pointsEarned);
    } else {
      setStreak(0);
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }
    
    if (currentQuestionIndex < currentQuestions.length - 1 && lives > 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  }, [currentQuestions, currentQuestionIndex, streak, lives, answers, maxStreak]);

  const value = {
    playerName, setPlayerName,
    mode, setMode,
    selectedYear, setSelectedYear,
    selectedTheme, setSelectedTheme,
    selectedTopic, setSelectedTopic,
    difficulty, setDifficulty,
    currentQuestions,
    currentQuestionIndex,
    score,
    lives,
    streak,
    maxStreak,
    gameOver,
    answers,
    startGame,
    answerQuestion,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};