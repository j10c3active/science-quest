export const LocalStorageService = {
  saveScore: (name, score, year) => {
    try {
      const scores = JSON.parse(localStorage.getItem('offlineScores') || '[]');
      scores.push({
        name,
        score,
        year,
        timestamp: Date.now()
      });
      scores.sort((a, b) => b.score - a.score);
      localStorage.setItem('offlineScores', JSON.stringify(scores.slice(0, 100)));
      return scores.slice(0, 100);
    } catch (error) {
      console.error('Error saving offline score:', error);
      return [];
    }
  },

  getOfflineLeaderboard: () => {
    try {
      return JSON.parse(localStorage.getItem('offlineScores') || '[]');
    } catch (error) {
      return [];
    }
  },

  saveGameState: (state) => {
    try {
      localStorage.setItem('gameState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  },

  loadGameState: () => {
    try {
      const state = localStorage.getItem('gameState');
      return state ? JSON.parse(state) : null;
    } catch (error) {
      return null;
    }
  },

  clearAll: () => {
    localStorage.removeItem('gameState');
    localStorage.removeItem('offlineScores');
  }
};