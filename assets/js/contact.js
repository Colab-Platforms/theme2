// Show Signup Form
function showSideSignupForm() {
  document.getElementById('loginFormSide').style.display = 'none';
  document.getElementById('signupFormSide').style.display = 'block';
}

// Show Login Form
function showSideLoginForm() {
  document.getElementById('signupFormSide').style.display = 'none';
  document.getElementById('loginFormSide').style.display = 'block';
}

// Update UI after successful login
function updateUserUI(user) {
  document.getElementById('loginFormSide').style.display = 'none';
  document.getElementById('signupFormSide').style.display = 'none';
  document.getElementById('loggedInState').style.display = 'block';

  document.getElementById('sideUserName').textContent = `Welcome ${user.name}`;
  document.getElementById('sideUserEmail').textContent = user.email;
}

// Password Strength Checker
function isStrongPassword(password) {
  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPattern.test(password);
}

// Handle Login
async function handleSidemenuLogin(event) {
  event.preventDefault();
  const email = document.getElementById('sideLoginEmail').value.trim();
  const password = document.getElementById('sideLoginPassword').value;

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
    } else {
      // Show message for wrong password 
      alert(data.message || 'Incorrect email or password.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Login failed due to network or server error.');
  }
}

// Handle Signup
async function handleSidemenuSignup(event) {
  event.preventDefault();
  const name = document.getElementById('sideSignupName').value.trim();
  const email = document.getElementById('sideSignupEmail').value.trim();
  const password = document.getElementById('sideSignupPassword').value;
  const confirmPassword = document.getElementById('sideConfirmPassword').value;

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
  document.getElementById('loggedInState').style.display = 'none';
  showSideLoginForm();
}