import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import HomeScreen from './components/HomeScreen';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import PrintScreen from './components/PrintScreen';

function App() {
  return (
    <FirebaseProvider>
      <GameProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/setup" element={<SetupScreen />} />
              <Route path="/quiz" element={<QuizScreen />} />
              <Route path="/results" element={<ResultsScreen />} />
              <Route path="/leaderboard" element={<LeaderboardScreen />} />
              <Route path="/print" element={<PrintScreen />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </FirebaseProvider>
  );
}

export default App;