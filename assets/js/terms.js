
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
