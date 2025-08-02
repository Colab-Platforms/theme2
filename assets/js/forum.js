
function showSideSignupForm() {
    document.getElementById('loginFormSide').style.display = 'none';
    document.getElementById('signupFormSide').style.display = 'block';
}
function showSideLoginForm() {
    document.getElementById('signupFormSide').style.display = 'none';
    document.getElementById('loginFormSide').style.display = 'block';
}
function updateUserUI(user) {
    document.getElementById('loginFormSide').style.display = 'none';
    document.getElementById('signupFormSide').style.display = 'none';
    document.getElementById('loggedInState').style.display = 'block';

    document.getElementById('sideUserName').textContent = `Welcome ${user.name}`;
    document.getElementById('sideUserEmail').textContent = user.email;
}
function isStrongPassword(password) {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPattern.test(password);
}
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
function handleLogout() {
    localStorage.removeItem('token');
    document.getElementById('loggedInState').style.display = 'none';
    showSideLoginForm();
}
let forumData = {
    posts: [],
    comments: {},
    currentUser: {
        id: 'user1',
        username: 'GamerPro2024',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
};

let currentPostId = null;
let currentFilter = 'all';
let currentSort = 'newest';
function getCurrentUser() {
    try {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const user = JSON.parse(userData);
            return {
                ...user,
                isLoggedIn: true
            };
        }
    } catch (error) {
        console.error('Error getting current user:', error);
    }
    return { isLoggedIn: false };
}
document.addEventListener('DOMContentLoaded', function () {
    console.log('Forum page DOM loaded, initializing...');
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 2000);
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser);

    if (currentUser && currentUser.isLoggedIn) {
        const loggedInState = document.getElementById('loggedInState');
        const loginFormSide = document.getElementById('loginFormSide');
        const signupFormSide = document.getElementById('signupFormSide');
        const profileMenuOptions = document.getElementById('profileMenuOptions');

        if (loggedInState) loggedInState.style.display = 'block';
        if (loginFormSide) loginFormSide.style.display = 'none';
        if (signupFormSide) signupFormSide.style.display = 'none';
        if (profileMenuOptions) profileMenuOptions.style.display = 'block';
        const sideUserName = document.getElementById('sideUserName');
        const sideUserEmail = document.getElementById('sideUserEmail');

        if (sideUserName) sideUserName.textContent = `Welcome ${currentUser.name || 'User'}`;
        if (sideUserEmail) sideUserEmail.textContent = currentUser.email || '@username';
    }

    loadForumData();
    createSampleData();
    renderPosts();
    updateCategoryCounts();
    initializeHeaderFunctionality();
});
function initializeHeaderFunctionality() {
    const searchToggler = document.querySelector('.searchBoxTggler');
    const searchBox = document.querySelector('.popup-search-box');
    const searchClose = document.querySelector('.searchClose');

    if (searchToggler) {
        searchToggler.addEventListener('click', () => {
            searchBox.classList.add('active');
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBox.classList.remove('active');
        });
    }
    const sideMenuToggler = document.querySelector('.sideMenuToggler');
    const sidemenuWrapper = document.getElementById('sidemenuWrapper');
    const closeButton = document.querySelector('.closeButton');

    if (sideMenuToggler && sidemenuWrapper) {
        sideMenuToggler.addEventListener('click', () => {
            sidemenuWrapper.classList.add('show');
            document.body.classList.add('sidemenu-open');
            console.log('Sidemenu toggler clicked');
        });
    }

    if (closeButton && sidemenuWrapper) {
        closeButton.addEventListener('click', () => {
            sidemenuWrapper.classList.remove('show');
            document.body.classList.remove('sidemenu-open');
            console.log('Close button clicked');
        });
    }
    const mobileMenuToggle = document.querySelector('.vs-menu-toggle');
    const mobileMenuWrapper = document.querySelector('.vs-menu-wrapper');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuWrapper.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidemenu-wrapper') && !e.target.closest('.sideMenuToggler')) {
            if (sidemenuWrapper) {
                sidemenuWrapper.classList.remove('show');
                document.body.classList.remove('sidemenu-open');
            }
        }
        if (!e.target.closest('.vs-menu-wrapper') && !e.target.closest('.vs-menu-toggle')) {
            if (mobileMenuWrapper) {
                mobileMenuWrapper.classList.remove('active');
            }
        }
        if (!e.target.closest('.popup-search-box') && !e.target.closest('.searchBoxTggler')) {
            if (searchBox) {
                searchBox.classList.remove('active');
            }
        }
    });
}
function showSideSignupForm() {
    document.getElementById('loginFormSide').style.display = 'none';
    document.getElementById('signupFormSide').style.display = 'block';
}

function showSideLoginForm() {
    document.getElementById('signupFormSide').style.display = 'none';
    document.getElementById('loginFormSide').style.display = 'block';
}

function updateUserUI(user) {
    document.getElementById('loginFormSide').style.display = 'none';
    document.getElementById('signupFormSide').style.display = 'none';
    document.getElementById('loggedInState').style.display = 'block';
    document.getElementById('profileMenuOptions').style.display = 'block';
    document.getElementById('sideUserName').textContent = `Welcome ${user.name}`;
    document.getElementById('sideUserEmail').textContent = user.email;
}

function isStrongPassword(password) {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPattern.test(password);
}

async function handleSidemenuLogin(event) {
    event.preventDefault();
    const email = document.getElementById('sideLoginEmail').value.trim();
    const password = document.getElementById('sideLoginPassword').value;

    if (!email || !password) {
        showNotification('Please fill in both email and password.', 'error');
        return;
    }
    const user = { name: 'Demo User', email: email };
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateUserUI(user);
    showNotification('Login successful!', 'success');
}

async function handleSidemenuSignup(event) {
    event.preventDefault();
    const name = document.getElementById('sideSignupName').value.trim();
    const email = document.getElementById('sideSignupEmail').value.trim();
    const password = document.getElementById('sideSignupPassword').value;
    const confirmPassword = document.getElementById('sideConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    if (!isStrongPassword(password)) {
        showNotification('Password is weak. It must be at least 8 characters and include uppercase, lowercase, number, and special character.', 'error');
        return;
    }

    showNotification('Signup successful. You can now log in.', 'success');
    showSideLoginForm();
}

function handleLogout() {
    localStorage.removeItem('userData');
    document.getElementById('loggedInState').style.display = 'none';
    document.getElementById('profileMenuOptions').style.display = 'none';
    showSideLoginForm();
    showNotification('Logged out successfully!', 'success');
}

function closeSidemenu() {
    const sidemenuWrapper = document.getElementById('sidemenuWrapper');
    if (sidemenuWrapper) {
        sidemenuWrapper.classList.remove('show');
        document.body.classList.remove('sidemenu-open');
        console.log('Sidemenu closed via closeSidemenu function');
    }
}

function handleWallet() {
    showNotification('Wallet feature coming soon!', 'info');
}

function handleKYC() {
    showNotification('KYC verification feature coming soon!', 'info');
}

function handleXP() {
    showNotification('XP Points feature coming soon!', 'info');
}

function handleSupport() {
    showNotification('Support feature coming soon!', 'info');
}

function handleSettings() {
    showNotification('Settings feature coming soon!', 'info');
}
function loadForumData() {
    const savedData = localStorage.getItem('forumData');
    if (savedData) {
        forumData = JSON.parse(savedData);
    }
}
function saveForumData() {
    localStorage.setItem('forumData', JSON.stringify(forumData));
}
function createSampleData() {
    if (forumData.posts.length === 0) {
        const samplePosts = [
            {
                id: 'post1',
                title: 'Best Gaming Setup for 2024?',
                content: 'Looking for recommendations on building the ultimate gaming setup. What are your must-have components?',
                author: {
                    id: 'user2',
                    username: 'NoobSlayer',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                },
                category: 'discussion',
                timestamp: Date.now() - 3600000,
                likes: 15,
                likedBy: [],
                commentCount: 3
            },
            {
                id: 'post2',
                title: 'Horizon Forbidden West Review',
                content: 'Just finished this masterpiece! The graphics are absolutely stunning and the story keeps you hooked. Definitely worth the hype.',
                author: {
                    id: 'user3',
                    username: 'GameMaster',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                },
                category: 'review',
                timestamp: Date.now() - 7200000,
                likes: 28,
                likedBy: [],
                commentCount: 7
            },
            {
                id: 'post3',
                title: 'Help: Game keeps crashing',
                content: 'My game crashes every time I try to load a save file. Has anyone experienced this issue? Running on Windows 11 with RTX 3080.',
                author: {
                    id: 'user4',
                    username: 'TechNinja',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                },
                category: 'help',
                timestamp: Date.now() - 1800000,
                likes: 5,
                likedBy: [],
                commentCount: 12
            }
        ];

        const sampleComments = {
            'post1': [
                {
                    id: 'comment1',
                    postId: 'post1',
                    author: {
                        id: 'user1',
                        username: 'GamerPro2024',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                    },
                    content: 'I recommend getting a good mechanical keyboard and a high refresh rate monitor!',
                    timestamp: Date.now() - 3000000
                }
            ],
            'post2': [
                {
                    id: 'comment2',
                    postId: 'post2',
                    author: {
                        id: 'user2',
                        username: 'NoobSlayer',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                    },
                    content: 'Totally agree! The combat system is so smooth.',
                    timestamp: Date.now() - 6000000
                }
            ]
        };

        forumData.posts = samplePosts;
        forumData.comments = sampleComments;
        saveForumData();
    }
}
function toggleCreatePost() {
    const form = document.getElementById('createPostForm');
    const isVisible = form.style.display !== 'none';
    form.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {
        document.getElementById('postTitle').focus();
    }
}
function cancelPost() {
    document.getElementById('createPostForm').style.display = 'none';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
}
function createPost() {
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const category = document.getElementById('postCategory').value;

    if (!title || !content) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }

    const newPost = {
        id: 'post' + Date.now(),
        title: title,
        content: content,
        author: forumData.currentUser,
        category: category,
        timestamp: Date.now(),
        likes: 0,
        likedBy: [],
        commentCount: 0
    };

    forumData.posts.unshift(newPost);
    forumData.comments[newPost.id] = [];

    saveForumData();
    renderPosts();
    updateCategoryCounts();
    cancelPost();

    showNotification('Post created successfully!', 'success');
}
function renderPosts() {
    const container = document.getElementById('postsContainer');
    let posts = [...forumData.posts];
    if (currentFilter !== 'all') {
        posts = posts.filter(post => post.category === currentFilter);
    }
    posts.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return b.timestamp - a.timestamp;
            case 'popular':
                return b.likes - a.likes;
            case 'discussed':
                return b.commentCount - a.commentCount;
            default:
                return b.timestamp - a.timestamp;
        }
    });

    container.innerHTML = posts.map(post => createPostHTML(post)).join('');
}
function createPostHTML(post) {
    const timeAgo = getTimeAgo(post.timestamp);
    const isLiked = post.likedBy.includes(forumData.currentUser.id);

    return `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <img src="${post.author.avatar}" alt="${post.author.username}" class="post-avatar">
                <div class="post-info">
                    <h4>${post.author.username}</h4>
                    <div class="post-meta">
                        <span class="category-badge">${post.category}</span>
                        <span>${timeAgo}</span>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn" onclick="openCommentmodal1('${post.id}')">
                    <i class="fas fa-comment"></i>
                    <span>${post.commentCount}</span>
                </button>
                <button class="action-btn" onclick="openSharemodal1('${post.id}')">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        </div>
    `;
}
function toggleLike(postId) {
    const post = forumData.posts.find(p => p.id === postId);
    if (!post) return;

    const userId = forumData.currentUser.id;
    const likedIndex = post.likedBy.indexOf(userId);

    if (likedIndex > -1) {
        post.likedBy.splice(likedIndex, 1);
        post.likes--;
    } else {
        post.likedBy.push(userId);
        post.likes++;
    }

    saveForumData();
    renderPosts();
}
function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.category-item').classList.add('active');

    renderPosts();
}
function sortPosts(sortType) {
    currentSort = sortType;
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderPosts();
}
function searchPosts() {
    const searchTerm = document.getElementById('search-field').value.toLowerCase().trim();
    const container = document.getElementById('postsContainer');

    if (!searchTerm) {
        renderPosts();
        return;
    }

    const filteredPosts = forumData.posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.username.toLowerCase().includes(searchTerm)
    );

    container.innerHTML = filteredPosts.map(post => createPostHTML(post)).join('');

    if (filteredPosts.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #888;">No posts found matching your search.</div>';
    }
}
function openCommentmodal1(postId) {
    currentPostId = postId;
    const modal1 = document.getElementById('commentmodal1');
    const commentsContainer = document.getElementById('commentsContainer');

    const comments = forumData.comments[postId] || [];
    commentsContainer.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');

    if (comments.length === 0) {
        commentsContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #888;">No comments yet. Be the first to comment!</div>';
    }

    modal1.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeCommentmodal1() {
    document.getElementById('commentmodal1').style.display = 'none';
    document.getElementById('commentInput').value = '';
    document.body.style.overflow = 'auto';
    currentPostId = null;
}
function createCommentHTML(comment) {
    const timeAgo = getTimeAgo(comment.timestamp);

    return `
        <div class="comment">
            <img src="${comment.author.avatar}" alt="${comment.author.username}" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author.username}</span>
                    <span class="comment-time">${timeAgo}</span>
                </div>
                <div class="comment-text">${comment.content}</div>
            </div>
        </div>
    `;
}
function addComment() {
    const content = document.getElementById('commentInput').value.trim();

    if (!content) {
        showNotification('Please enter a comment!', 'error');
        return;
    }

    if (!currentPostId) return;

    const newComment = {
        id: 'comment' + Date.now(),
        postId: currentPostId,
        author: forumData.currentUser,
        content: content,
        timestamp: Date.now()
    };

    if (!forumData.comments[currentPostId]) {
        forumData.comments[currentPostId] = [];
    }

    forumData.comments[currentPostId].push(newComment);
    const post = forumData.posts.find(p => p.id === currentPostId);
    if (post) {
        post.commentCount++;
    }

    saveForumData();
    const commentsContainer = document.getElementById('commentsContainer');
    const comments = forumData.comments[currentPostId];
    commentsContainer.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
    document.getElementById('commentInput').value = '';
    renderPosts();
    updateCategoryCounts();

    showNotification('Comment added!', 'success');
}
function openSharemodal1(postId) {
    currentPostId = postId;
    document.getElementById('sharemodal1').style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeSharemodal1() {
    document.getElementById('sharemodal1').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentPostId = null;
}
function shareToClipboard() {
    const post = forumData.posts.find(p => p.id === currentPostId);
    if (!post) return;

    const shareText = `Check out this post: "${post.title}" by ${post.author.username} on GameHub Forum!`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copied to clipboard!', 'success');
            closeSharemodal1();
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!', 'success');
        closeSharemodal1();
    }
}
function updateCategoryCounts() {
    const counts = {
        all: forumData.posts.length,
        discussion: forumData.posts.filter(p => p.category === 'discussion').length,
        help: forumData.posts.filter(p => p.category === 'help').length,
        news: forumData.posts.filter(p => p.category === 'news').length,
        review: forumData.posts.filter(p => p.category === 'review').length
    };

    Object.keys(counts).forEach(category => {
        const element = document.getElementById(category + 'Count');
        if (element) {
            element.textContent = counts[category];
        }
    });
}
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}
window.addEventListener('click', function (event) {
    const commentmodal1 = document.getElementById('commentmodal1');
    const sharemodal1 = document.getElementById('sharemodal1');

    if (event.target === commentmodal1) {
        closeCommentmodal1();
    }

    if (event.target === sharemodal1) {
        closeSharemodal1();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
        commentInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addComment();
            }
        });
    }
});
let draftTimer;
document.addEventListener('DOMContentLoaded', function () {
    const postContentInput = document.getElementById('postContent');
    if (postContentInput) {
        postContentInput.addEventListener('input', function () {
            clearTimeout(draftTimer);
            draftTimer = setTimeout(() => {
                const draft = {
                    title: document.getElementById('postTitle').value,
                    content: this.value,
                    category: document.getElementById('postCategory').value
                };
                localStorage.setItem('postDraft', JSON.stringify(draft));
            }, 1000);
        });
    }
});
window.addEventListener('load', function () {
    const draft = localStorage.getItem('postDraft');
    if (draft) {
        const draftData = JSON.parse(draft);
        if (draftData.title || draftData.content) {
            const titleInput = document.getElementById('postTitle');
            const contentInput = document.getElementById('postContent');
            const categorySelect = document.getElementById('postCategory');

            if (titleInput) titleInput.value = draftData.title || '';
            if (contentInput) contentInput.value = draftData.content || '';
            if (categorySelect) categorySelect.value = draftData.category || 'discussion';
        }
    }
});
function clearDraft() {
    localStorage.removeItem('postDraft');
}
const originalCreatePost = createPost;
createPost = function () {
    originalCreatePost();
    clearDraft();
};
document.addEventListener('DOMContentLoaded', function () {
    console.log('Terms page DOM loaded, initializing...');
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    setupProfileMenuToggle();
    setupBackToTop();
    setupSidemenuToggle();
    const closeButton = document.querySelector('.closeButton');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            console.log('Close button clicked');
            closeSidemenu();
        });
    }

    console.log('Terms page initialized successfully');
});
function getCurrentUser() {
    try {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const user = JSON.parse(userData);
            return {
                ...user,
                isLoggedIn: true
            };
        }
    } catch (error) {
        console.error('Error getting current user:', error);
    }
    return { isLoggedIn: false };
}
function setupProfileMenuToggle() {
    const sideMenuTogglers = document.querySelectorAll('.sideMenuToggler');
    const sidemenuWrapper = document.getElementById('sidemenuWrapper');

    if (sideMenuTogglers.length > 0 && sidemenuWrapper) {
        sideMenuTogglers.forEach(toggler => {
            toggler.addEventListener('click', function () {
                console.log('Sidemenu toggler clicked in terms.js');
                sidemenuWrapper.classList.toggle('show');
                document.body.classList.toggle('sidemenu-open');
                if (!sidemenuWrapper.classList.contains('show')) {
                    sidemenuWrapper.classList.add('show');
                    document.body.classList.add('sidemenu-open');
                    console.log('Force-showing sidemenu');
                }
            });
        });
    } else {
        console.log('Profile menu elements not found', {
            togglers: sideMenuTogglers ? sideMenuTogglers.length : 0,
            wrapper: sidemenuWrapper ? 'found' : 'not found'
        });
    }
}
function closeSidemenu() {
    console.log('Closing sidemenu from terms.js');
    const sidemenuWrapper = document.getElementById('sidemenuWrapper');
    if (sidemenuWrapper) {
        sidemenuWrapper.classList.remove('show');
        document.body.classList.remove('sidemenu-open');
        console.log('Sidemenu closed successfully');
    } else {
        console.error('Sidemenu wrapper not found when trying to close');
    }
}
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    const progressPercentage = document.getElementById('progressPercentage');

    window.addEventListener('scroll', function () {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (progressPercentage) {
            progressPercentage.textContent = Math.round(scrolled) + '%';
        }

        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
function setupSidemenuToggle() {
    const profileMenuOptions = document.getElementById('profileMenuOptions');
    const currentUser = getCurrentUser();
    console.log('Setting up sidemenu toggle', {
        profileMenuOptions: profileMenuOptions ? 'found' : 'not found',
        currentUser: currentUser
    });
    if (currentUser && currentUser.isLoggedIn) {
        if (profileMenuOptions) {
            profileMenuOptions.style.display = 'block';
        }
        const loginFormSide = document.getElementById('loginFormSide');
        const signupFormSide = document.getElementById('signupFormSide');

        if (loginFormSide) loginFormSide.style.display = 'none';
        if (signupFormSide) signupFormSide.style.display = 'none';

        const loggedInState = document.getElementById('loggedInState');
        if (loggedInState) {
            loggedInState.style.display = 'block';
            const sideUserName = document.getElementById('sideUserName');
            const sideUserEmail = document.getElementById('sideUserEmail');

            if (sideUserName) sideUserName.textContent = `Welcome ${currentUser.name}`;
            if (sideUserEmail) sideUserEmail.textContent = currentUser.email;
        }
    }
}
