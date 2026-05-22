window.addEventListener('load', function() {
    const backToTopButton = document.getElementById('backToTopBtn');
    
    if (backToTopButton) {
        function checkScrollPosition() {
            if (window.pageYOffset > 400) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', checkScrollPosition);
        
        checkScrollPosition();
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.log('Back to top button not found in the DOM');
    }
});