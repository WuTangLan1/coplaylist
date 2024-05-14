// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/components/fbDir/fbInit';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
    isAuthenticated: false,
  }),
  
  actions: {
    async registerUser(details) {
      const {
        email, firstName, lastName, phone, password,
        country, favouriteArtists, dislikedArtists
      } = details;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        });

        await sendEmailVerification(user); 

        const userProfile = {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          country: country,
          favourite_artists: favouriteArtists.filter(Boolean), 
          disliked_artists: dislikedArtists.filter(Boolean),
          tokens: 3,
          refresh_token: "",
          email_verified: false 
        };

        await setDoc(doc(db, 'profiles', user.uid), userProfile);
        return user;
      } catch (error) {
        console.error('Error registering user', error);
        throw error;
      }
    },
    deductTokens(amount) {
      if (!this.user || this.user.tokens < amount) {
        throw new Error("Insufficient tokens");
      }
      this.user.tokens -= amount; // Deduct the tokens
      const userDocRef = doc(db, 'profiles', this.user.uid);
      return updateDoc(userDocRef, { tokens: this.user.tokens });
    },
    async updateUserProfile(profileData) {
      if (!this.user) return;
      const userDocRef = doc(db, 'profiles', this.user.uid);
      try {
        await updateDoc(userDocRef, profileData);
        this.user = {...this.user, ...profileData};
        return true; 
      } catch (error) {
        console.error('Failed to update user profile', error);
        throw error; 
      }
    },
    async logout() {
      await signOut(auth);
      this.user = null;
      router.push('/')
    },
    async fetchUserProfile() {
      if (!this.user) return;
      const docRef = doc(db, "profiles", this.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.user = {
          ...this.user,
          ...data,
          disliked_artists: data.disliked_artists || [],
          favourite_artists: data.favourite_artists || [],
          emailVerified: auth.currentUser.emailVerified // Check email verification status
        };
      } else {
        console.error("No such profile!");
      }
    },     
    async verifyEmailStatus() {
      if (!this.user) return;
      await this.user.reload(); 
      if (this.user.emailVerified) {
        const userDocRef = doc(db, 'profiles', this.user.uid);
        await updateDoc(userDocRef, {
          email_verified: true
        });
        this.user.email_verified = true;
      }
    },        
    async updateUserTokens(newTokenCount) {
      if (!this.user) return;
      const userDocRef = doc(db, 'profiles', this.user.uid);
      await updateDoc(userDocRef, {
        tokens: newTokenCount
      });
      this.user.tokens = newTokenCount;  
    },
    async updateHighScore(newScore) {
      if (!this.user) return;
      const currentHighScore = this.user.highscore || 0;
      if (newScore > currentHighScore) {
        this.user.highscore = newScore;
        const userDocRef = doc(db, 'profiles', this.user.uid);
        await updateDoc(userDocRef, {
          highscore: newScore
        });
      }
    },
    initializeAuthListener() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fetchUserProfile();
          this.isAuthenticated = true; 
        } else {
          this.isAuthenticated = false;
          this.user = null;
        }
      });
    },    
  }
});