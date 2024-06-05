// src/stores/useErrorStore.js
import { defineStore } from 'pinia';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/components/fbDir/fbInit';
import { useAuthStore } from './useAuthStore';

export const useErrorStore = defineStore('error', {
  actions: {
    async logError(errorMessage) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        throw new Error('User not authenticated');
      }
      const errorDoc = {
        uid: authStore.user.uid,
        errorMessage: errorMessage,
        timestamp: serverTimestamp() 
      };
      try {
        await setDoc(doc(db, 'logged_errors', doc().id), errorDoc);
        console.log('Error logged successfully');
      } catch (error) {
        console.error('Error logging the error:', error);
        throw new Error('Failed to log error');
      }
    }
  }
});
