import React, { createContext, useContext } from 'react';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { LocalStorageService } from '../services/localStorage';

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  
  const saveScore = async (name, score, year) => {
    try {
      // Try Firestore first
      if (db) {
        await addDoc(collection(db, 'leaderboard'), {
          name,
          score,
          year,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.warn('Firestore save failed, using local storage:', error);
    }
    
    // Always save locally as backup
    LocalStorageService.saveScore(name, score, year);
  };

  const getLeaderboard = async () => {
    try {
      if (db) {
        const q = query(
          collection(db, 'leaderboard'),
          orderBy('score', 'desc'),
          limit(20)
        );
        
        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((doc) => {
          scores.push({
            id: doc.id,
            ...doc.data()
          });
        });
        return scores;
      }
    } catch (error) {
      console.warn('Firestore fetch failed, using local storage:', error);
    }
    
    return LocalStorageService.getOfflineLeaderboard();
  };

  const value = {
    saveScore,
    getLeaderboard
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};