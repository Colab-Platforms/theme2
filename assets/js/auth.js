

    // Global variables
    let isLoggedIn = false;

    // Modal Functions
    function showWelcomeModal() {
      const modal = document.getElementById('welcomeModal');
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeWelcomeModal() {
      const modal = document.getElementById('welcomeModal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    }

    // Sidemenu Functions - FIXED
    function openSidemenu() {
      console.log('Opening sidemenu...');
      const sidemenuWrapper = document.getElementById('sidemenuWrapper');
      if (sidemenuWrapper) {
        sidemenuWrapper.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Sidemenu opened successfully');
      } else {
        console.error('Sidemenu wrapper not found');
      }
    }

    function closeSidemenu() {
      console.log('Closing sidemenu...');
      const sidemenuWrapper = document.getElementById('sidemenuWrapper');
      if (sidemenuWrapper) {
        sidemenuWrapper.classList.remove('show');
        document.body.style.overflow = 'auto';
        console.log('Sidemenu closed successfully');
      }
    }

    function openSidemenuLogin() {
      console.log('Opening sidemenu for login...');
      closeWelcomeModal();
      setTimeout(() => {
        openSidemenu();
        showSideLoginForm();
      }, 300);
    }

    function openSidemenuSignup() {
      console.log('Opening sidemenu for signup...');
      closeWelcomeModal();
      setTimeout(() => {
        openSidemenu();
        showSideSignupForm();
      }, 300);
    }

    // Show Signup Form
    function showSideSignupForm() {
      console.log('Showing signup form...');
      const loginForm = document.getElementById('loginFormSide');
      const signupForm = document.getElementById('signupFormSide');
      if (loginForm && signupForm) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        console.log('Signup form displayed');
      }
    }

    // Show Login Form
    function showSideLoginForm() {
      console.log('Showing login form...');
      const loginForm = document.getElementById('loginFormSide');
      const signupForm = document.getElementById('signupFormSide');
      if (loginForm && signupForm) {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        console.log('Login form displayed');
      }
    }

    // Update UI after successful login
    function updateUserUI(user) {
      const loginForm = document.getElementById('loginFormSide');
      const signupForm = document.getElementById('signupFormSide');
      const loggedInState = document.getElementById('loggedInState');
      const profileMenuOptions = document.getElementById('profileMenuOptions');
      const sideUserName = document.getElementById('sideUserName');
      const sideUserEmail = document.getElementById('sideUserEmail');

      if (loginForm) loginForm.style.display = 'none';
      if (signupForm) signupForm.style.display = 'none';
      if (loggedInState) loggedInState.style.display = 'block';
      if (profileMenuOptions) profileMenuOptions.style.display = 'block';
      if (sideUserName) sideUserName.textContent = `Welcome ${user.name}`;
      if (sideUserEmail) sideUserEmail.textContent = user.email;

      isLoggedIn = true;
    }

    // Password Strength Checker
    function isStrongPassword(password) {
      const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return strongPattern.test(password);
    }

    // Handle Login - REAL LOGIN LOGIC
    async function handleSidemenuLogin(event) {
      event.preventDefault();
      console.log('Login form submitted');
      
      const emailInput = document.getElementById('sideLoginEmail');
      const passwordInput = document.getElementById('sideLoginPassword');
      
      if (!emailInput || !passwordInput) {
        console.error('Login form inputs not found');
        return;
      }
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
      }

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const contentType = response.headers.get('content-type') || '';
        let data = {};

        if (contentType.includes('application/json')) {
          data = await response.json();
        }

        if (response.ok) {
          localStorage.setItem('token', data.token);
          updateUserUI(data.user);
          alert('Login successful! Welcome to ColabEsports!');
          
          // Clear form
          emailInput.value = '';
          passwordInput.value = '';
        } else {
          alert(data.message || 'Incorrect email or password.');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Login failed due to network or server error.');
      }
    }

    // Handle Signup - REAL SIGNUP LOGIC
    async function handleSidemenuSignup(event) {
      event.preventDefault();
      console.log('Signup form submitted');
      
      const nameInput = document.getElementById('sideSignupName');
      const emailInput = document.getElementById('sideSignupEmail');
      const passwordInput = document.getElementById('sideSignupPassword');
      const confirmPasswordInput = document.getElementById('sideConfirmPassword');
      
      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        console.error('Signup form inputs not found');
        return;
      }
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!isStrongPassword(password)) {
        alert(
          'Password is weak.\nIt must be at least 8 characters and include:\n• Uppercase\n• Lowercase\n• Number\n• Special character'
        );
        return;
      }

      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const contentType = response.headers.get('content-type') || '';
        let data = {};

        if (contentType.includes('application/json')) {
          data = await response.json();
        }

        if (response.ok) {
          alert('Signup successful. You can now log in.');
          showSideLoginForm();
          
          // Clear form
          nameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
          confirmPasswordInput.value = '';
        } else {
          alert(data.message || 'Signup failed. Try a different email.');
        }
      } catch (err) {
        console.error('Signup error:', err);
        alert('Signup failed due to network or server error.');
      }
    }

    // Handle Logout
    function handleLogout() {
      localStorage.removeItem('token');
      const loggedInState = document.getElementById('loggedInState');
      const profileMenuOptions = document.getElementById('profileMenuOptions');
      
      if (loggedInState) loggedInState.style.display = 'none';
      if (profileMenuOptions) profileMenuOptions.style.display = 'none';
      
      isLoggedIn = false;
      showSideLoginForm();
      alert('Logged out successfully!');
    }

    // Placeholder functions for menu options
    function handleWallet() {
      alert('Wallet/Transactions feature coming soon!');
    }

    function handleKYC() {
      const kycSteps = document.getElementById('kycSteps');
      if (kycSteps) {
        if (kycSteps.style.display === 'none' || kycSteps.style.display === '') {
          kycSteps.style.display = 'block';
        } else {
          kycSteps.style.display = 'none';
        }
      }
    }

    function handleXP() {
      alert('XP Points feature coming soon!');
    }

    function handleSupport() {
      alert('Support feature coming soon!');
    }

    function handleSettings() {
      alert('Settings feature coming soon!');
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded, initializing...');

      // Show modal after 3 seconds when page loads
      setTimeout(function() {
        const token = localStorage.getItem('token');
        if (!token && !isLoggedIn) {
          console.log('Showing welcome modal...');
          showWelcomeModal();
        }
      }, 3000);

      // Set up sidemenu toggle functionality
      const sideMenuToggler = document.querySelector('.sideMenuToggler');
      if (sideMenuToggler) {
        sideMenuToggler.addEventListener('click', function() {
          console.log('Sidemenu toggler clicked');
          openSidemenu();
        });
      }

      // Close modal when clicking outside
      const welcomeModal = document.getElementById('welcomeModal');
      if (welcomeModal) {
        welcomeModal.addEventListener('click', function(e) {
          if (e.target === this) {
            closeWelcomeModal();
          }
        });
      }

      // Close sidemenu when clicking outside
      const sidemenuWrapper = document.getElementById('sidemenuWrapper');
      if (sidemenuWrapper) {
        sidemenuWrapper.addEventListener('click', function(e) {
          if (e.target === this) {
            closeSidemenu();
          }
        });
      }

      // Set current year in footer
      const currentYearElement = document.getElementById('currentYear');
      if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
      }

      console.log('Initialization complete');
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeWelcomeModal();
        closeSidemenu();
      }
    });





// CS2 Setup Modal JavaScript Functions

// Function to open the CS2 setup modal
function openCS2SetupModal() {
  document.getElementById("cs2SetupModal").classList.add("show")
  document.body.style.overflow = "hidden"
}

// Function to close the CS2 setup modal
function closeCS2SetupModal() {
  document.getElementById("cs2SetupModal").classList.remove("show")
  document.body.style.overflow = "auto"
}

// Function to redirect to game page when PLAY NOW is clicked
function redirectToGamePage() {
  // Close the modal first
  closeCS2SetupModal()

  // Add a small delay for smooth transition
  setTimeout(() => {
    // Redirect to your game page (change this URL as needed)
    window.location.href = "single-match.html"
  }, 300)
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const cs2SetupModal = document.getElementById("cs2SetupModal")

  if (event.target === cs2SetupModal) {
    closeCS2SetupModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const cs2SetupModal = document.getElementById("cs2SetupModal")
    if (cs2SetupModal.classList.contains("show")) {
      closeCS2SetupModal()
    }
  }
})


