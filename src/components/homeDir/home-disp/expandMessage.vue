<!-- src\components\homeDir\home-disp\expandMessage.vue -->
<template>
    <div class="feature-item">
      <img src="@/assets/images/explanation/library.png" alt="Music Knowledge" class="feature-image">
      <div class="text-container">
        <h3>Expand Your Music Knowledge</h3>
        <p>Discover new genres and artists, expanding your musical horizons.</p>
      </div>
    </div>
  </template>  
  
  <style scoped>
  .feature-item {
    display: flex;
    background: linear-gradient(to right, #f0f9ff, #cbebff); /* Soft blue gradient */
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    align-items: center;
    margin-bottom: 1rem; /* Adds space between items if listed in a column */
  }
  
  .feature-image {
    flex-basis: 50%;
    height: auto;
    max-width: 35%;
    border-radius: 8px;
    margin-right: 1rem;
  }
  
  .text-container {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
  }
  
  h3 {
    color: #4c56af;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #333;
    margin: 0;
    font-size: 1rem;
  }
  </style>
  