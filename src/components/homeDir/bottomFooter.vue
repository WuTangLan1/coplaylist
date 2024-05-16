<!-- src\components\homeDir\bottomFooter.vue -->

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showinfoModal = ref(false);
    const currentInfoComponent = ref('AboutSection'); 

    function openModal(component) {
      currentInfoComponent.value = component;
      showinfoModal.value = true;
    }

    function closeinfoModal() {
      showinfoModal.value = false;
    }

    return {
      showinfoModal,
      currentInfoComponent,
      openModal,
      closeinfoModal,
    };
  }
}

</script>

<template>
    <footer class="bottom-footer">
      <div class="footer-content">
        <div class="footer-links">
          <router-link @click.native="$emit('openModal', 'AboutSection')" to="#">About Us</router-link>
          <router-link @click.native="$emit('openModal', 'TosSection')" to="#">Terms of Service</router-link>
          <router-link @click.native="$emit('openModal', 'PrivacySection')" to="#">Privacy Policy</router-link>
        </div>
        <div class="social-media-icons">
          <a href="https://twitter.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/x_icon.png" alt="Twitter">
          </a>
          <a href="https://facebook.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/facebook_icon.png" alt="Facebook">
          </a>
          <a href="https://instagram.com/CoPlaylist" target="_blank">
            <img src="@/assets/images/footer/instagram_icon.png" alt="Instagram">
          </a>
        </div>
      </div>
      <div class="copy-right">
        © 2024 CoPlaylist, Inc
      </div>
    </footer>
  </template>
  <style scoped>
  @import '@/assets/css/styles.css';
  
  .bottom-footer {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #C3D7F8;
    color: black;
    text-align: center;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .footer-links {
    display: flex;
    gap: 20px;
    font-size: 0.9rem;
  }
  
  .social-media-icons {
    display: flex;
    gap: 3rem;
  }
  
  .footer-links a,
  .social-media-icons a {
    color: black;
    text-decoration: none;
  }
  
  .social-media-icons img {
    width: 3rem; /* Smaller size for icons */
    height: auto; /* Maintain aspect ratio */
  }
  
  .footer-links a:hover,
  .social-media-icons a:hover {
    text-decoration: underline;
  }
  
  .copy-right {
    margin-top: 10px;
    font-size: 0.8rem;
  }
  
  @media (min-width: 768px) {
    .bottom-footer {
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 50px;
    }
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
    }
  }
  </style>
  