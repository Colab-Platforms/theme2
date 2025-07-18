/**
 * Profile Synchronization System
 * Handles real-time profile data synchronization across all pages
 */

class ProfileSyncManager {
  constructor() {
    this.init();
    this.setupEventListeners();
  }

  init() {
    // Ensure this only runs once per page
    if (window.profileSyncInitialized) return;
    window.profileSyncInitialized = true;

    // Listen for profile updates from other tabs/pages
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // Listen for custom profile update events
    window.addEventListener('profileUpdated', this.handleProfileUpdate.bind(this));
    window.addEventListener('avatarUpdated', this.handleAvatarUpdate.bind(this));
    
    // Initial load - sync immediately if user data exists
    setTimeout(() => {
      this.syncProfileData();
    }, 100);
  }

  setupEventListeners() {
    // Listen for page visibility changes to sync when user returns to tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncProfileData();
      }
    });

    // Listen for window focus to sync when user switches back to this window
    window.addEventListener('focus', () => {
      this.syncProfileData();
    });
  }

  // Handle localStorage changes from other tabs
  handleStorageChange(event) {
    if (event.key === 'currentUser' || event.key === 'userData' || event.key === 'profileViewData') {
      this.syncProfileData();
    }
  }

  // Handle custom profile update events
  handleProfileUpdate(event) {
    if (event.detail && event.detail.userData) {
      this.syncProfileData();
    }
  }

  // Handle avatar update events
  handleAvatarUpdate(event) {
    if (event.detail && event.detail.avatarUrl) {
      this.updateAllAvatars(event.detail.avatarUrl);
    }
  }

  // Get current user data from localStorage
  getCurrentUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    const profileViewData = JSON.parse(localStorage.getItem('profileViewData')) || null;

    // Return the most complete user data available
    return profileViewData || currentUser || userData;
  }

  // Sync profile data across all elements on the current page
  syncProfileData() {
    const userData = this.getCurrentUserData();
    
    if (!userData) {
      console.log('No user data found for synchronization');
      return;
    }

    console.log('Syncing profile data:', userData);

    // Update all profile elements
    this.updateProfileElements(userData);
    this.updateAllAvatars(userData.avatar);
  }

  // Update all profile-related elements on the page
  updateProfileElements(userData) {
    // Update name elements
    this.updateElementsBySelectors([
      '#sideUserName',
      '#profileEmailBanner', 
      '.user-name',
      '[data-user-name]'
    ], userData.name || userData.email);

    // Update email elements
    this.updateElementsBySelectors([
      '#sideUserEmail',
      '#profileEmail',
      '.user-email',
      '[data-user-email]'
    ], userData.email);

    // Update nickname elements
    this.updateElementsBySelectors([
      '#profileNickname',
      '.user-nickname',
      '[data-user-nickname]'
    ], userData.nickname ? `In Game Name: ${userData.nickname}` : 'In Game Name: Not set');

    // Update country elements
    this.updateElementsBySelectors([
      '#profileCountry',
      '.user-country',
      '[data-user-country]'
    ], userData.country ? `Country: ${userData.country}` : 'Country: Not set');

    // Update bio elements
    this.updateElementsBySelectors([
      '#profileBio',
      '.user-bio',
      '[data-user-bio]'
    ], userData.bio ? `Description: ${userData.bio}` : 'Description: No description added');

    // Update join date elements
    if (userData.createdAt || userData.joinDate) {
      const joinDate = new Date(userData.createdAt || userData.joinDate).toLocaleDateString();
      this.updateElementsBySelectors([
        '#profileJoinDate',
        '.user-join-date',
        '[data-user-join-date]'
      ], `Date of joining: ${joinDate}`);
    }

    // Update mobile elements
    if (userData.mobile) {
      this.updateElementsBySelectors([
        '#profileMobile',
        '.user-mobile',
        '[data-user-mobile]'
      ], userData.mobile);
    }

    // Update date of birth elements
    if (userData.dob) {
      this.updateElementsBySelectors([
        '#profileDob',
        '.user-dob',
        '[data-user-dob]'
      ], userData.dob);
    }

    // Update status elements
    this.updateElementsBySelectors([
      '#profileStatus',
      '.user-status',
      '[data-user-status]'
    ], userData.status || 'online');
  }

  // Update elements by selectors
  updateElementsBySelectors(selectors, value) {
    if (!value) return;
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = value;
          } else {
            element.textContent = value;
          }
        }
      });
    });
  }

  // Update all avatar images on the page
  updateAllAvatars(avatarUrl) {
    if (!avatarUrl) return;

    // Avatar selectors to update
    const avatarSelectors = [
      '#profileAvatar',
      '#profileIcon',
      '#bannerAvatar',
      '#headerAvatar',
      '#userAvatarImg',
      '.user-avatar img',
      '[data-user-avatar]'
    ];

    avatarSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element && element.tagName === 'IMG') {
          element.src = avatarUrl;
          element.style.opacity = '1';
          element.style.display = 'block';
        }
      });
    });

    // Remove avatar placeholders
    document.querySelectorAll('.avatar-placeholder').forEach(placeholder => {
      placeholder.remove();
    });
  }

  // Broadcast profile update to other tabs/pages
  broadcastProfileUpdate(userData) {
    // Update localStorage to trigger storage event in other tabs
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('profileViewData', JSON.stringify(userData));
    
    // Create compatibility userData
    const compatUserData = {
      name: userData.name,
      email: userData.email,
      isLoggedIn: true,
      avatar: userData.avatar,
      nickname: userData.nickname,
      mobile: userData.mobile,
      country: userData.country,
      bio: userData.bio,
      dob: userData.dob,
      status: userData.status || 'online'
    };
    localStorage.setItem('userData', JSON.stringify(compatUserData));

    // Dispatch custom events for same-page updates
    window.dispatchEvent(new CustomEvent('profileUpdated', {
      detail: { userData }
    }));

    if (userData.avatar) {
      window.dispatchEvent(new CustomEvent('avatarUpdated', {
        detail: { avatarUrl: userData.avatar }
      }));
    }
  }

  // Force sync profile data (useful for calling after updates)
  forceSyncProfile() {
    this.syncProfileData();
  }
}

// Initialize profile sync manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.profileSyncManager = new ProfileSyncManager();
  });
} else {
  window.profileSyncManager = new ProfileSyncManager();
}

// Also listen for window load to ensure everything is ready
window.addEventListener('load', () => {
  if (!window.profileSyncManager) {
    window.profileSyncManager = new ProfileSyncManager();
  }
  // Force sync on load
  window.profileSyncManager.forceSyncProfile();
});

// Make it globally available
window.ProfileSyncManager = ProfileSyncManager;
