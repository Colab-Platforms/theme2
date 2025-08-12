
 
    const sampleUsers = [
      { id: 1, name: "Alex Gaming", username: "@alexgamer", avatar: "https://i.pravatar.cc/150?img=1", status: "online" },
      { id: 2, name: "Sarah Pro", username: "@sarahpro", avatar: "https://i.pravatar.cc/150?img=2", status: "offline" },
      { id: 3, name: "Mike Sniper", username: "@mikesniper", avatar: "https://i.pravatar.cc/150?img=3", status: "online" },
      { id: 4, name: "Emma Elite", username: "@emmaelite", avatar: "https://i.pravatar.cc/150?img=4", status: "online" },
      { id: 5, name: "John Warrior", username: "@johnwarrior", avatar: "https://i.pravatar.cc/150?img=5", status: "offline" },
      { id: 6, name: "Lisa Legend", username: "@lisalegend", avatar: "https://i.pravatar.cc/150?img=6", status: "online" },
      { id: 7, name: "Tom Thunder", username: "@tomthunder", avatar: "https://i.pravatar.cc/150?img=7", status: "offline" },
      { id: 8, name: "Nina Ninja", username: "@ninaninja", avatar: "https://i.pravatar.cc/150?img=8", status: "online" }
    ];

    // Global variable for friends list
    let friendsList = [];

    // Body scroll lock utilities
    const bodyScrollLock = {
      scrollTop: 0,

      // Lock body scrolling
      lock() {
        // Store current scroll position
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add class to lock the body
        document.body.classList.add('scroll-locked');
        document.body.style.top = `-${this.scrollTop}px`;
      },

      // Unlock body scrolling
      unlock() {
        // Remove class and restore scroll position
        document.body.classList.remove('scroll-locked');
        document.body.style.removeProperty('top');
        window.scrollTo(0, this.scrollTop);
      }
    };

    // User Management System
    class UserManager {
      constructor() {
        this.users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
      }

      // Register new user
      register(name, email, password) {
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
          return { success: false, message: 'User with this email already exists!' };
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          name: name,
          email: email,
          password: password, // In real app, this should be hashed
          createdAt: new Date().toISOString(),
          friends: []
        };

        // Add to users array
        this.users.push(newUser);

        // Save to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));

        // Auto login after registration
        this.login(email, password);

        return { success: true, message: 'Registration successful!' };
      }

      // Login user
      login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
          // Remove password from current user object for security
          const { password, ...userWithoutPassword } = user;
          this.currentUser = userWithoutPassword;

          // Save current user to localStorage
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

          // Save userData for compatibility with existing code
          localStorage.setItem('userData', JSON.stringify({
            name: user.name,
            email: user.email,
            isLoggedIn: true,
            avatar: user.avatar,
            nickname: user.nickname,
            mobile: user.mobile,
            country: user.country,
            bio: user.bio,
            dob: user.dob,
            status: user.status || 'online'
          }));

          // Save profileViewData for consistency
          localStorage.setItem('profileViewData', JSON.stringify(this.currentUser));

          // Broadcast profile update using sync system
          if (window.profileSyncManager) {
            window.profileSyncManager.broadcastProfileUpdate(this.currentUser);
          }

          return { success: true, user: this.currentUser };
        }

        return { success: false, message: 'Invalid email or password!' };
      }

      // Logout user
      logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userData');
        localStorage.removeItem('friendsList');
      }

      // Get current user
      getCurrentUser() {
        return this.currentUser;
      }

      // Update user's friends list
      updateUserFriends(friends) {
        if (this.currentUser) {
          const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
          if (userIndex !== -1) {
            this.users[userIndex].friends = friends;
            localStorage.setItem('registeredUsers', JSON.stringify(this.users));
          }
        }
      }
    }

    // Initialize User Manager
    const userManager = new UserManager();

    // Sidemenu Functions
    function openSidemenu() {
      document.getElementById('sidemenuWrapper').classList.add('show');
      bodyScrollLock.lock();
    }

    function closeSidemenu() {
      document.getElementById('sidemenuWrapper').classList.remove('show');
      bodyScrollLock.unlock();
    }

    // Login/Signup Form Toggle Functions
    function showSideLoginForm() {
      document.getElementById('loginFormSide').style.display = 'block';
      document.getElementById('signupFormSide').style.display = 'none';
    }

    function showSideSignupForm() {
      document.getElementById('signupFormSide').style.display = 'block';
      document.getElementById('loginFormSide').style.display = 'none';
    }

    // Authentication Handlers
    function handleSidemenuLogin(event) {
      event.preventDefault();

      const email = document.getElementById('sideLoginEmail').value;
      const password = document.getElementById('sideLoginPassword').value;

      const result = userManager.login(email, password);

      if (result.success) {
        showLoggedInState({
          name: result.user.name,
          email: result.user.email
        });

        // Load user's friends
        if (result.user.friends && result.user.friends.length > 0) {
          friendsList = result.user.friends;
        } else {
          friendsList = [];
        }

        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        updateFriendsList();

        showNotification('Login successful!');
      } else {
        showError('Invalid email or password!');
      }
    }

    function handleSidemenuSignup(event) {
      event.preventDefault();

      const name = document.getElementById('sideSignupName').value;
      const email = document.getElementById('sideSignupEmail').value;
      const password = document.getElementById('sideSignupPassword').value;
      const confirmPassword = document.getElementById('sideConfirmPassword').value;

      // Validate passwords match
      if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
      }

      // Validate password strength
      if (password.length < 6) {
        showError('Password must be at least 6 characters long!');
        return;
      }

      const result = userManager.register(name, email, password);

      if (result.success) {
        showLoggedInState({
          name: name,
          email: email
        });

        friendsList = [];
        updateFriendsList();

        showNotification('Registration successful! Welcome to ColabEsports!');
      } else {
        showError(result.message);
      }
    }

    function handleLogout() {
      userManager.logout();
      friendsList = [];

      // Reset UI
      document.getElementById('loggedInState').style.display = 'none';
      document.getElementById('profileMenuOptions').style.display = 'none';
      document.getElementById('loginFormSide').style.display = 'block';
      document.getElementById('signupFormSide').style.display = 'none';

      // Reset form fields
      document.getElementById('sideLoginEmail').value = '';
      document.getElementById('sideLoginPassword').value = '';
      document.getElementById('sideSignupName').value = '';
      document.getElementById('sideSignupEmail').value = '';
      document.getElementById('sideSignupPassword').value = '';
      document.getElementById('sideConfirmPassword').value = '';

      // Close sidemenu
      closeSidemenu();

      showNotification('Logged out successfully!');
    }

    // Show logged in state function
    function showLoggedInState(userData) {
      // Hide login/signup forms
      document.getElementById('loginFormSide').style.display = 'none';
      document.getElementById('signupFormSide').style.display = 'none';

      // Show logged in state
      document.getElementById('loggedInState').style.display = 'block';

      // Show profile menu options
      document.getElementById('profileMenuOptions').style.display = 'block';

      // Update user info using profile sync system
      if (window.profileSyncManager) {
        window.profileSyncManager.syncProfileData();
      } else {
        // Fallback if profile sync not loaded yet
        document.getElementById('sideUserName').textContent = userData.name;
        document.getElementById('sideUserEmail').textContent = userData.email;
      }

      // Load friends list
      updateFriendsList();
    }

    // Find Friend Modal Functions
    function openFindFriendModal() {
      document.getElementById('findFriendModal').classList.add('show');
      document.getElementById('friendSearchInput').value = '';
      displayAllUsers();
      bodyScrollLock.lock();
    }

    function closeFindFriendModal() {
      document.getElementById('findFriendModal').classList.remove('show');
      bodyScrollLock.unlock();
    }

    function displayAllUsers() {
      const resultsContainer = document.getElementById('searchResults');
      const availableUsers = sampleUsers.filter(user => !friendsList.some(friend => friend.id === user.id));

      if (availableUsers.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No new friends to add</div>';
        return;
      }

      resultsContainer.innerHTML = availableUsers.map(user => createUserResultHTML(user)).join('');
    }

    function searchFriends() {
      const searchTerm = document.getElementById('friendSearchInput').value.toLowerCase();
      const resultsContainer = document.getElementById('searchResults');

      if (searchTerm === '') {
        displayAllUsers();
        return;
      }

      const filteredUsers = sampleUsers.filter(user =>
        !friendsList.some(friend => friend.id === user.id) &&
        (user.name.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm))
      );

      if (filteredUsers.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No users found</div>';
      } else {
        resultsContainer.innerHTML = filteredUsers.map(user => createUserResultHTML(user)).join('');
      }
    }

    function createUserResultHTML(user) {
      const isAdded = friendsList.some(friend => friend.id === user.id);
      return `
    <div class="search-result-item">
      <div class="search-result-info">
        <img src="${user.avatar}" alt="${user.name}" class="search-result-avatar">
        <div class="search-result-details">
          <h4>${user.name}</h4>
          <p>${user.username}</p>
        </div>
      </div>
      <button class="add-friend-btn ${isAdded ? 'added' : ''}" 
              onclick="addFriend(${user.id})" 
              ${isAdded ? 'disabled' : ''}>
        ${isAdded ? 'Added' : 'Add Friend'}
      </button>
    </div>
  `;
    }

    function addFriend(userId) {
      const user = sampleUsers.find(u => u.id === userId);
      if (user && !friendsList.some(friend => friend.id === userId)) {
        // Add invited property to friend object
        const friendWithInviteStatus = { ...user, invited: false };
        friendsList.push(friendWithInviteStatus);

        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        userManager.updateUserFriends(friendsList);

        // Update the button to show "Added"
        const button = event.target;
        button.textContent = 'Added';
        button.classList.add('added');
        button.disabled = true;

        // Update friends list in sidemenu
        updateFriendsList();

        // Show success message
        showNotification(`${user.name} added to friends!`);
      }
    }

    function updateFriendsList() {
      const friendsContainer = document.getElementById('friendsContainer');

      if (!friendsList || friendsList.length === 0) {
        friendsContainer.innerHTML = '<p style="color: rgba(0,0,0,0.5); text-align: center; padding: 20px;">No friends added yet</p>';
        return;
      }

      friendsContainer.innerHTML = friendsList.map(friend => `
    <div class="friend-item">
      <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
      <div class="friend-info">
        <p class="friend-name">${friend.name}</p>
        <p class="friend-status ${friend.status}">${friend.status}</p>
      </div>
      <button class="invite-btn ${friend.invited ? 'invited' : ''}" 
              onclick="inviteToTeam(${friend.id})"
              ${friend.invited ? 'disabled' : ''}>
        ${friend.invited ? 'Invited' : 'Invite'}
      </button>
    </div>
  `).join('');
    }

    function inviteToTeam(friendId) {
      const friendIndex = friendsList.findIndex(f => f.id === friendId);

      if (friendIndex !== -1) {
        // Mark friend as invited
        friendsList[friendIndex].invited = true;

        // Save updated friends list
        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        userManager.updateUserFriends(friendsList);

        // Update UI
        updateFriendsList();

        // Show notification
        showNotification(`Team invite sent to ${friendsList[friendIndex].name}!`);

        // Simulate sending invite (in real app, this would be an API call)
        console.log(`Sending team invite to friend ID: ${friendId}`);
      }
    }

    // Notification Functions
    function showNotification(message) {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;

      document.body.appendChild(notification);

      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    function showError(message) {
      const notification = document.createElement('div');
      notification.className = 'error-notification';
      notification.textContent = message;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // Menu Option Handlers
    function handleViewProfile() {
      const user = userManager.getCurrentUser();
      if (user) {
        alert(`
      Profile Information:
      Name: ${user.name}
      Email: ${user.email}
      Member Since: ${new Date(user.createdAt).toLocaleDateString()}
      Friends: ${friendsList.length}
    `);
      }
    }

    function handleMyTeam() {
      window.location.href = 'profile.html#teamsTab';
    }



    function handleSettings() {
      window.location.href = 'update.html';
    }

    function handleWallet() {
      window.location.href = 'payment.html';
    }

    // Improved scroll handling
    document.addEventListener('DOMContentLoaded', function () {
      // Enable smooth scrolling for all scrollable containers
      const scrollableElements = [
        { selector: '.sidemenu-content', parent: '.sidemenu-wrapper' },
        { selector: '.find-friend-content', parent: '.find-friend-modal' },
        { selector: '.find-friend-results', parent: null },
        { selector: '.friends-container', parent: null }
      ];

      scrollableElements.forEach(({ selector, parent }) => {
        const element = document.querySelector(selector);
        if (element) {
          // Improved wheel event handler with proper propagation control
          element.addEventListener('wheel', function (e) {
            const delta = e.deltaY;
            const contentHeight = this.scrollHeight;
            const visibleHeight = this.offsetHeight;
            const scrollTop = this.scrollTop;

            // Check if scroll is at the top or bottom
            const isScrollingUp = delta < 0;
            const isScrollingDown = delta > 0;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + visibleHeight >= contentHeight - 1;

            // Only prevent default if not at the edges or if at edges but scrolling inward
            if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom) ||
              (isScrollingUp && isAtTop && parent) || (isScrollingDown && isAtBottom && parent)) {
              e.preventDefault();
              e.stopPropagation();

              // Smooth scroll
              this.scrollBy({
                top: delta * 0.5, // Adjusted scroll speed
                behavior: 'smooth'
              });
            }
          }, { passive: false });

          // Prevent touch events from propagating when needed
          let startY;
          let startScrollTop;

          element.addEventListener('touchstart', function (e) {
            startY = e.touches[0].pageY;
            startScrollTop = this.scrollTop;
          }, { passive: true });

          element.addEventListener('touchmove', function (e) {
            const currentY = e.touches[0].pageY;
            const delta = startY - currentY;
            const contentHeight = this.scrollHeight;
            const visibleHeight = this.offsetHeight;
            const scrollTop = this.scrollTop;

            // Check if scroll is at the top or bottom
            const isScrollingUp = delta < 0;
            const isScrollingDown = delta > 0;
            const isAtTop = scrollTop <= 0;
            const isAtBottom = scrollTop + visibleHeight >= contentHeight - 1;

            // Only prevent default if not at the edges or if at edges but scrolling inward
            if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
              e.preventDefault();
            }

            this.scrollTop = startScrollTop + delta;
          }, { passive: false });
        }
      });

      // Close modals when clicking outside
      document.getElementById('findFriendModal').addEventListener('click', function (e) {
        if (e.target === this) {
          closeFindFriendModal();
        }
      });

      document.getElementById('sidemenuWrapper').addEventListener('click', function (e) {
        if (e.target === this) {
          closeSidemenu();
        }
      });

      // Close modals with ESC key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          if (document.getElementById('sidemenuWrapper').classList.contains('show')) {
            closeSidemenu();
          }
          if (document.getElementById('findFriendModal').classList.contains('show')) {
            closeFindFriendModal();
          }
        }
      });

      // Set up sidemenu toggles
      const togglers = document.querySelectorAll('.sideMenuToggler');
      togglers.forEach(toggler => {
        toggler.addEventListener('click', function (e) {
          e.preventDefault();
          openSidemenu();
        });
      });

      // Check login state on page load
      const currentUser = userManager.getCurrentUser();
      if (currentUser) {
        showLoggedInState({
          name: currentUser.name,
          email: currentUser.email
        });

        // Load user's friends
        const savedFriends = localStorage.getItem('friendsList');
        if (savedFriends) {
          friendsList = JSON.parse(savedFriends);
          updateFriendsList();
        }
      }

      // Input validation for signup form
      const signupPassword = document.getElementById('sideSignupPassword');
      const confirmPassword = document.getElementById('sideConfirmPassword');

      if (confirmPassword) {
        confirmPassword.addEventListener('input', function () {
          if (this.value !== signupPassword.value) {
            this.style.borderColor = '#f44336';
          } else {
            this.style.borderColor = '#4CAF50';
          }
        });
      }

      // Add Enter key support for forms
      document.getElementById('sideLoginPassword')?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          handleSidemenuLogin(e);
        }
      });

      document.getElementById('sideConfirmPassword')?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          handleSidemenuSignup(e);
        }
      });
    });

    // Close welcome modal function
    function closeWelcomeModal() {
      document.getElementById('welcomeModal').style.display = 'none';
    }

    // Optional: Create test users for demo
    function createTestUsers() {
      userManager.register('John Doe', 'john@example.com', 'password123');
      userManager.register('Jane Smith', 'jane@example.com', 'password123');
      userManager.logout(); // Logout after creating test users
    }

    // Uncomment the line below to create test users (run once, then comment out)
    // createTestUsers();
  
    // Update the updateFriendsList function to include invite buttons
    function updateFriendsList() {
      const friendsContainer = document.getElementById('friendsContainer');

      if (friendsList.length === 0) {
        friendsContainer.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">No friends added yet</p>';
        return;
      }

      friendsContainer.innerHTML = friendsList.map(friend => `
    <div class="friend-item">
      <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
      <div class="friend-info">
        <p class="friend-name">${friend.name}</p>
        <p class="friend-status ${friend.status}">${friend.status}</p>
      </div>
      <button class="invite-btn ${friend.invited ? 'invited' : ''}" 
              onclick="inviteToTeam(${friend.id})"
              ${friend.invited ? 'disabled' : ''}>
        ${friend.invited ? 'Invited' : 'Invite'}
      </button>
    </div>
  `).join('');
    }

    // Add invite to team function
    function inviteToTeam(friendId) {
      const friendIndex = friendsList.findIndex(f => f.id === friendId);

      if (friendIndex !== -1) {
        // Mark friend as invited
        friendsList[friendIndex].invited = true;

        // Save updated friends list
        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        userManager.updateUserFriends(friendsList);

        // Update UI
        updateFriendsList();

        // Show notification
        showNotification(`Team invite sent to ${friendsList[friendIndex].name}!`);

        // Simulate sending invite (in real app, this would be an API call)
        console.log(`Sending team invite to friend ID: ${friendId}`);
      }
    }

    // Add smooth scrolling with mouse wheel
    document.addEventListener('DOMContentLoaded', function () {
      // Enable smooth scrolling for all scrollable containers
      const scrollableElements = [
        document.querySelector('.sidemenu-content'),
        document.querySelector('.find-friend-content'),
        document.querySelector('.find-friend-results'),
        document.querySelector('.friends-container')
      ];

      scrollableElements.forEach(element => {
        if (element) {
          // Add mouse wheel smooth scrolling
          element.addEventListener('wheel', function (e) {
            e.preventDefault();
            const scrollAmount = e.deltaY * 2; // Adjust scroll speed
            element.scrollBy({
              top: scrollAmount,
              behavior: 'smooth'
            });
          }, { passive: false });

          // Add touch scrolling for mobile
          let startY;
          let startScrollTop;

          element.addEventListener('touchstart', function (e) {
            startY = e.touches[0].pageY;
            startScrollTop = element.scrollTop;
          }, { passive: true });

          element.addEventListener('touchmove', function (e) {
            const y = e.touches[0].pageY;
            const walk = (startY - y) * 2; // Adjust scroll speed
            element.scrollTop = startScrollTop + walk;
          }, { passive: true });
        }
      });
    });

    // Update the addFriend function to initialize invited status
    function addFriend(userId) {
      const user = sampleUsers.find(u => u.id === userId);
      if (user && !friendsList.some(friend => friend.id === userId)) {
        // Add invited property to friend object
        const friendWithInviteStatus = { ...user, invited: false };
        friendsList.push(friendWithInviteStatus);

        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        userManager.updateUserFriends(friendsList);

        // Update the button to show "Added"
        const button = event.target;
        button.textContent = 'Added';
        button.classList.add('added');
        button.disabled = true;

        // Update friends list in sidemenu
        updateFriendsList();

        // Show success message
        showNotification(`${user.name} added to friends!`);
      }
    }

    // Optional: Add scroll indicators for better UX
    function addScrollIndicators() {
      const scrollContainers = [
        { element: '.sidemenu-content', threshold: 100 },
        { element: '.find-friend-results', threshold: 50 }
      ];

      scrollContainers.forEach(({ element, threshold }) => {
        const container = document.querySelector(element);
        if (container) {
          container.addEventListener('scroll', function () {
            const maxScroll = this.scrollHeight - this.clientHeight;
            const currentScroll = this.scrollTop;

            // Add/remove classes based on scroll position
            if (currentScroll > threshold) {
              this.classList.add('scrolled');
            } else {
              this.classList.remove('scrolled');
            }

            if (currentScroll >= maxScroll - threshold) {
              this.classList.add('scrolled-bottom');
            } else {
              this.classList.remove('scrolled-bottom');
            }
          });
        }
      });
    }

    // Initialize scroll indicators
    document.addEventListener('DOMContentLoaded', addScrollIndicators);
