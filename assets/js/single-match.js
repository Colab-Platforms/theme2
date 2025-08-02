 
  function updateDateTime() {
    const now = new Date();

    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      
    };

    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById("realTimeDisplay").textContent = formattedDate;
  }

 
  updateDateTime();

  
  setInterval(updateDateTime, 30000);





  const scrollContainer = document.getElementById('scrollableContainer');
  const scrollContent = scrollContainer.querySelector('.custom-scroll-content');
  let scrollTop = 0;

  scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollTop -= e.deltaY;
    const maxScroll = scrollContent.scrollHeight - scrollContainer.clientHeight;

    if (scrollTop < 0) scrollTop = 0;
    if (scrollTop > maxScroll) scrollTop = maxScroll;

    scrollContent.style.transform = `translateY(-${scrollTop}px)`;
  }, { passive: false });




  // Global variables
let isLoggedIn = false;

// Sidemenu functions
function openSidemenu() {
  document.getElementById('sidemenuWrapper').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidemenu() {
  document.getElementById('sidemenuWrapper').classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Authentication functions 
function handleSidemenuLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('sideLoginEmail').value;
  const password = document.getElementById('sideLoginPassword').value;
  
  // Accept any input as valid login
  if (email && password) {
    // Extract username from email (part before @)
    const username = email.split('@')[0];
    
    // Show logged in state
    document.getElementById('loginFormSide').style.display = 'none';
    document.getElementById('signupFormSide').style.display = 'none';
    document.getElementById('loggedInState').style.display = 'block';
    document.getElementById('profileMenuOptions').style.display = 'block';
    
    // Update user info
    document.getElementById('sideUserName').textContent = username;
    document.getElementById('sideUserEmail').textContent = '@' + username;
    
    isLoggedIn = true;
    
    // Clear form
    document.getElementById('sideLoginEmail').value = '';
    document.getElementById('sideLoginPassword').value = '';
    
    // Show success message
    alert('Login successful! Welcome to ColabEsports!');
  } else {
    alert('Please enter both email and password');
  }
}

function handleSidemenuSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('sideSignupName').value;
  const email = document.getElementById('sideSignupEmail').value;
  const password = document.getElementById('sideSignupPassword').value;
  const confirmPassword = document.getElementById('sideConfirmPassword').value;
  
  // Accept any input as valid signup
  if (name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      // Extract username from email (part before @)
      const username = email.split('@')[0];
      
      // Show logged in state
      document.getElementById('loginFormSide').style.display = 'none';
      document.getElementById('signupFormSide').style.display = 'none';
      document.getElementById('loggedInState').style.display = 'block';
      document.getElementById('profileMenuOptions').style.display = 'block';
      
      // Update user info
      document.getElementById('sideUserName').textContent = name;
      document.getElementById('sideUserEmail').textContent = '@' + username;
      
      isLoggedIn = true;
      
      // Clear form
      document.getElementById('sideSignupName').value = '';
      document.getElementById('sideSignupEmail').value = '';
      document.getElementById('sideSignupPassword').value = '';
      document.getElementById('sideConfirmPassword').value = '';
      
      // Show success message
      alert('Account created successfully! Welcome to ColabEsports!');
    } else {
      alert('Passwords do not match');
    }
  } else {
    alert('Please fill in all fields');
  }
}

function handleLogout() {
  // Hide logged in state and profile menu
  document.getElementById('loggedInState').style.display = 'none';
  document.getElementById('profileMenuOptions').style.display = 'none';
  
  // Show login form
  document.getElementById('loginFormSide').style.display = 'block';
  
  isLoggedIn = false;
  
  alert('Logged out successfully!');
}

function showSideSignupForm() {
  document.getElementById('loginFormSide').style.display = 'none';
  document.getElementById('signupFormSide').style.display = 'block';
}

function showSideLoginForm() {
  document.getElementById('signupFormSide').style.display = 'none';
  document.getElementById('loginFormSide').style.display = 'block';
}

// Profile menu handlers
function handleWallet() {
  alert('Wallet feature - Manage your transactions and balance');
}

function handleKYC() {
  const kycSteps = document.getElementById("kycSteps");

  // Toggle visibility
  const isVisible = kycSteps.style.display === "block";
  kycSteps.style.display = isVisible ? "none" : "block";

  if (!isVisible) {
    // Simulate uploaded document status
    document.getElementById("step-document").querySelector(".uploaded").style.display = "inline";
    document.getElementById("step-aadhar").querySelector(".uploaded").style.display = "inline";
    document.getElementById("step-status").querySelector(".uploaded").style.display = "inline";
  }
}

function handleXP() {
  alert('XP Points - View your experience points and achievements');
}

function handleSupport() {
  alert('Support - Contact our customer support team');
}

function handleSettings() {
  alert('Settings - Manage your account settings');
}

// Initialize sidebar menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const sideMenuToggler = document.querySelector('.sideMenuToggler');
  if (sideMenuToggler) {
    sideMenuToggler.addEventListener('click', function() {
      openSidemenu();
    });
  }

  // Close sidemenu when clicking outside
  document.getElementById('sidemenuWrapper').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSidemenu();
    }
  });
});






// Global variables for payment flow
let selectedPaymentMethod = 'upi';
let gameCode = '';

// Main function to handle Pay & Join button click
function handlePayAndJoin() {
  // Check if user is logged in
  if (!isLoggedIn) {
    alert("Please login first to join the tournament");
    openSidemenu(); // Open the sidebar for login
    return;
  }

  // Start the payment flow
  initPayment();
}

// Initialize payment flow
function initPayment() {
  // Update match time
  updateMatchTime();
  
  // Set up payment method selection
  setupPaymentMethods();
  
  // Show payment modal
  document.getElementById('paymentModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function updateMatchTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formattedDate = now.toLocaleString('en-US', options);
  document.getElementById("matchTime").textContent = formattedDate;
}

function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll('.payment-method');
  paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
      // Remove selected class from all methods
      paymentMethods.forEach(m => m.classList.remove('selected'));
      // Add selected class to clicked method
      this.classList.add('selected');
      selectedPaymentMethod = this.dataset.method;
    });
  });
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

function processPayment() {
  const paymentBtn = document.querySelector('.payment-button');
  const btnText = document.getElementById('paymentButtonText');
  
  // Disable button and show loading
  paymentBtn.disabled = true;
  btnText.innerHTML = '<div class="loading-spinner"></div>Processing Payment...';
  
  // Simulate payment processing
  setTimeout(() => {
    // Generate 6-digit code
    gameCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Close payment modal
    closePaymentModal();
    
    // Show success modal
    showSuccessModal();
    
    // Reset button
    paymentBtn.disabled = false;
    btnText.textContent = 'PAY ₹1 & JOIN';
  }, 3000);

  //  backend payment API
  
  fetch('/api/process-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 1,
      method: selectedPaymentMethod,
      gameId: 'cs2_tournament_001',
      userId: getCurrentUserId()
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      gameCode = data.gameCode;
      closePaymentModal();
      showSuccessModal();
    } else {
      alert('Payment failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  })
  .finally(() => {
    paymentBtn.disabled = false;
    btnText.textContent = 'PAY ₹1 & JOIN';
  });
   
}
// backend payment API end here

function showSuccessModal() {
  document.getElementById('generatedGameCode').textContent = gameCode;
  document.getElementById('successModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function copyGameCode() {
  navigator.clipboard.writeText(gameCode).then(() => {
    const copyBtn = document.querySelector('.copy-code-btn');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = 'rgba(166, 215, 25, 0.3)';
    
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 2000);
  });
}

function proceedToServer() {
  document.getElementById('successModal').classList.remove('show');
  document.getElementById('serverJoinModal').classList.add('show');
  
  // Pre-fill the code input
  document.getElementById('serverCodeInput').value = gameCode;
  validateCode(document.getElementById('serverCodeInput'));
}

function validateCode(input) {
  const code = input.value;
  const joinBtn = document.getElementById('joinServerBtn');
  const btnText = document.getElementById('joinServerBtnText');
  
  // Allow only numbers
  input.value = code.replace(/\D/g, '');
  
  if (input.value.length === 6) {
    joinBtn.disabled = false;
    btnText.textContent = 'JOIN CS2 SERVER';
    joinBtn.style.background = 'linear-gradient(135deg, #A6D719 0%, #8BC34A 100%)';
  } else {
    joinBtn.disabled = true;
    btnText.textContent = 'ENTER CODE TO JOIN';
    joinBtn.style.background = 'rgba(166, 215, 25, 0.5)';
  }
}

function joinCS2Server() {
  const enteredCode = document.getElementById('serverCodeInput').value;
  const joinBtn = document.getElementById('joinServerBtn');
  const btnText = document.getElementById('joinServerBtnText');
  
  if (enteredCode.length !== 6) {
    alert('Please enter a valid 6-digit code');
    return;
  }
  
  // Disable button and show loading
  joinBtn.disabled = true;
  btnText.innerHTML = '<div class="loading-spinner"></div>Connecting to Server...';
  
  // Simulate server connection
  setTimeout(() => {
    
    
    // Close modal
    document.getElementById('serverJoinModal').classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Show success message
    alert('Successfully connected to CS2 server! Game code verified. You can now launch CS2 and join the match.');
    
    // Reset button
    joinBtn.disabled = false;
    btnText.textContent = 'JOIN CS2 SERVER';
    
    // Optionally redirect to game lobby or show further instructions
    showGameInstructions();
  }, 2000);

  // Backend integration start
  
  fetch('/api/verify-game-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameCode: enteredCode,
      userId: getCurrentUserId()
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Code verified, connect to server
      window.location.href = `steam://connect/${data.serverIP}:${data.serverPort}`;
      document.getElementById('serverJoinModal').classList.remove('show');
      document.body.style.overflow = 'auto';
    } else {
      alert('Invalid game code. Please check and try again.');
    }
  })
  .catch(error => {
    console.error('Server connection error:', error);
    alert('Failed to connect to server. Please try again.');
  })
  .finally(() => {
    joinBtn.disabled = false;
    btnText.textContent = 'JOIN CS2 SERVER';
  });
  
   //Here it will end  Backend integration
}

function showGameInstructions() {
  const instructions = `
🎮 GAME INSTRUCTIONS:

1. Launch Counter-Strike 2
2. Open Console (~ key)
3. Type: connect 192.168.1.100:27015
4. Enter your game code when prompted: ${gameCode}
5. Wait for other players to join
6. Match will start automatically

📋 RULES:
• Be respectful to other players
• No cheating or exploits
• Follow server commands
• Have fun and play fair!

Good luck in your match! 🏆
  `;
  
  alert(instructions);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const paymentModal = document.getElementById('paymentModal');
  const successModal = document.getElementById('successModal');
  const serverJoinModal = document.getElementById('serverJoinModal');
  
  if (event.target === paymentModal) {
    closePaymentModal();
  }
  if (event.target === successModal) {
    successModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
  if (event.target === serverJoinModal) {
    serverJoinModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// Helper functions for backend integration
function getCurrentUserId() {
  // Return the current logged-in user ID
  return localStorage.getItem("userId") || "user123";
}

function getCurrentUserEmail() {
  // Return the current logged-in user email
  return localStorage.getItem("userEmail") || "user@example.com";
}

function getUserToken() {
  // Return the authentication token
  return localStorage.getItem("authToken") || "dummy-token";
}
 
     let currentType = 'today';

     async function fetchLeaderboardData() {
       try {
         const response = await fetch(`/api/leaderboard?type=${currentType}`);
         const data = await response.json();
         renderTable(data);
       } catch (error) {
         console.error('Failed to load leaderboard:', error);
       }
     }

     function renderTable(rows) {
       const tbody = document.getElementById('leaderboard-body');
       tbody.innerHTML = '';

       if (!rows || rows.length === 0) {
         for (let i = 0; i < 9; i++) {
           tbody.innerHTML += `<tr><td colspan="6" style="height:78px;"></td></tr>`;
         }
         return;
       }

       rows.forEach(row => {
         tbody.innerHTML += `<tr>
           <td>${row.rank}</td>
           <td><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=5047b1&color=fff&rounded=true&size=64" alt="${row.name}" class="avatar"> <b>${row.name}</b></td>
           <td>${row.kills}</td>
           <td>${row.deaths}</td>
           <td>${row.assists}</td>
           <td>${row.kda}</td>
         </tr>`;
       });

       for (let i = rows.length; i < 9; i++) {
         tbody.innerHTML += `<tr><td colspan="6" style="height:78px;"></td></tr>`;
       }
     }

     function updateActiveButton(groupId, value, attr) {
       const group = document.getElementById(groupId);
       Array.from(group.children).forEach(btn => {
         btn.classList.toggle('active', btn.getAttribute(attr) === value);
       });
     }

     document.getElementById('type-filters').addEventListener('click', function(e) {
       if (e.target.tagName === 'BUTTON') {
         currentType = e.target.getAttribute('data-type');
         updateActiveButton('type-filters', currentType, 'data-type');
         fetchLeaderboardData();
       }
     });

     fetchLeaderboardData();
