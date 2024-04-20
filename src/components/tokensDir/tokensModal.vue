<!-- src\components\tokensDir\tokensModal.vue -->
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
            <h3>Want More Tokens?</h3>
            <button>Buy Tokens</button>
            <button>Earn Tokens</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
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
    padding: 30px;
    border-radius: 5px;
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
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  
  .modal-body {
    margin-top: 20px;
  }
  
  .token-icon {
    height: 50px; /* Adjust as needed */
    width: auto;
  }
  
  .token-balance {
    text-align: center;
  }
  
  .token-transactions {
    margin-top: 20px;
  }
  
  .token-actions {
    margin-top: 20px;
    text-align: center;
  }
  
  .token-actions button {
    margin: 0 10px;
    padding: 10px;
    background-color: #759acd; /* Light blue background */
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .token-actions button:hover {
    background-color: #507cac; /* Darker blue on hover */
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: #ff0000;
  }
  </style>
  