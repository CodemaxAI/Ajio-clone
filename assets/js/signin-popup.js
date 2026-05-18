document.addEventListener('DOMContentLoaded', function() {
    let signinModal = document.getElementById('signin-modal');
    
    if (!signinModal) {
        fetch('/components/signin-popup.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                
                setupSigninPopup();
            })
            .catch(error => {
                console.error('Error loading signin popup:', error);
            });
    } else {
        setupSigninPopup();
    }
});

function setupSigninPopup() {
    const signinModal = document.getElementById('signin-modal');
    const closeBtn = document.getElementById('si-closeBtn');
    
    const signinLink = document.getElementById('signin');
    const signinButtons = document.querySelectorAll('.signin-btn');
    
    if (!signinModal || !closeBtn) {
        console.error('Missing required elements for signin popup');
        return;
    }
    
    signinModal.style.display = 'none';
    
    const openModal = function(e) {
        e.preventDefault();
        signinModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    };
    
    if (signinLink) {
        signinLink.addEventListener('click', openModal);
    }
    
    signinButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    closeBtn.addEventListener('click', function() {
        signinModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === signinModal) {
            signinModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}