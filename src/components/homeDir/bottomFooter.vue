<!-- src\components\homeDir\bottomFooter.vue -->

<script>
export default {
  name: 'BottomFooter'
};
</script>

<template>
    <footer class="bottom-footer">
      <div class="footer-content">
        <div class="footer-links">
          <router-link to="/about">About Us</router-link>
          <router-link to="/terms">Terms of Service</router-link>
          <router-link to="/privacy">Privacy Policy</router-link>
        </div>
        <div class="social-media-icons">
          <a href="https://twitter.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/x_icon.png" alt="Twitter">
          </a>
          <a href="https://facebook.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/instagram_icon.png" alt="Facebook">
          </a>
          <a href="https://instagram.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/facebook_icon.png" alt="Instagram">
          </a>
        </div>
      </div>
      <div class="copy-right">
        © 2024 CoPlaylist. All rights reserved.
      </div>
    </footer>
  </template>
  

  <style scoped>
  @import '@/assets/css/styles.css';
  
  .bottom-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #C3D7F8;
    color: black;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .footer-links {
    display: flex;
    gap: 15px;
  }
  
  .social-media-icons {
    display: flex;
    gap: 10px;
  }
  
  .footer-links a,
  .social-media-icons a {
    color: black;
    text-decoration: none;
  }
  
  .copy-right {
    margin-top: 10px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 768px) {
    .bottom-footer {
      flex-direction: row;
      justify-content: space-between;
    }
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      max-width: 960px;
    }
  }
  </style>
  