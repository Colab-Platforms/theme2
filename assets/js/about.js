

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('currentYear').textContent = new Date().getFullYear();


    const backToTop = document.getElementById('backToTop');
    const progressPercentage = document.getElementById('progressPercentage');

    window.addEventListener('scroll', function () {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressPercentage.textContent = Math.round(scrolled) + '%';

        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
