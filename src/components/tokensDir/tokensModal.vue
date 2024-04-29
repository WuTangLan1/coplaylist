<!-- src\components\tokensDir\tokensModal.vue -->
<script>
export default {
  emits: ['closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <img src="@/assets/images/header/tokens.png" alt="Tokens" class="token-icon"/>
        <h2>Token Management</h2>
        <button @click="closeModal" class="close-button">✕</button>
      </div>
      <div class="modal-body">
        <div class="token-balance">
          <h3>Current Balance</h3>
          <p>100 Tokens</p>
        </div>
        <div class="token-transactions">
          <h3>Recent Transactions</h3>
          <ul>
            <li>+20 Tokens - Daily Bonus</li>
            <li>-50 Tokens - Redeemed for Premium Access</li>
            <li>+10 Tokens - Referral Bonus</li>
          </ul>
        </div>
        <div class="token-actions">
          <h3>Buy Tokens</h3>
          <p class="coming-soon">Coming Soon! Our development team is working hard to bring you this feature.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  width: auto;
  max-width: 90%;
  max-height: 95vh;
  overflow: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  animation: dropAnimation 1s ease-in-out forwards;
  position: relative;
}

@keyframes dropAnimation {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  align-items: flex-start; /* Align items to the top */
  justify-content: space-between;
  position: relative;
  padding-right: 40px; /* Make room for the close button */
}

.modal-body {
  margin-top: 20px;
  font-size: 1rem; 
}

.token-icon {
  height: 60px; 
  margin-bottom: 1rem;
}

.token-balance h3,
.token-transactions h3,
.token-actions h3 {
  color: #333; 
  margin-bottom: 0.5rem;
}

ul {
  padding-left: 20px; 
}

li {
  margin-bottom: 0.25rem; 
}

.token-actions p.coming-soon {
  color: #507cac; /* Matching blue color theme */
  font-style: italic;
}

.close-button {
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #507cac; /* Set the color to blue */
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.close-button:hover {
  color: #345f8d; /* A darker blue for hover state */
}
</style>
