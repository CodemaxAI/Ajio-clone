document.querySelectorAll('.banner-component').forEach((component) => {
    const slides = component.querySelector('.carousel-slides');
    const indicators = component.querySelectorAll('.carousel-indicator');
    let currentIndex = 1;
    const totalSlides = indicators.length;
    let autoScroll;
    let isPaused = false;

    const firstClone = slides.children[0].cloneNode(true);
    const lastClone = slides.children[slides.children.length - 1].cloneNode(true);

    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, slides.children[0]);

    slides.style.transition = 'none';
    updateSlidePosition(currentIndex);
    
    slides.offsetHeight;

    function updateSlidePosition(index) {
        const translateX = -index * 100;
        slides.style.transform = `translateX(${translateX}%)`;
    }

    function showSlide(index) {
        slides.style.transition = 'transform 0.5s ease-in-out';
        updateSlidePosition(index);

        if (index >= totalSlides + 1) {
            setTimeout(() => {
                slides.style.transition = 'none';
                currentIndex = 1;
                updateSlidePosition(currentIndex);
            }, 500);
        } else if (index === 0) {
            setTimeout(() => {
                slides.style.transition = 'none';
                currentIndex = totalSlides;
                updateSlidePosition(currentIndex);
            }, 500);
        }

        indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === (index - 1) % totalSlides);
        });
    }

    function nextSlide() {
        if (!isPaused) {
            currentIndex++;
            showSlide(currentIndex);
        }
    }

    function startAutoScroll() {
        if (autoScroll) clearInterval(autoScroll);
        autoScroll = setInterval(nextSlide, 3000);
    }

    function resetAutoScroll() {
        clearInterval(autoScroll);
        startAutoScroll();
    }

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isPaused = true;
            clearInterval(autoScroll);
        } else {
            isPaused = false;
            startAutoScroll();
        }
    });

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            currentIndex = idx + 1;
            showSlide(currentIndex);
            resetAutoScroll();
        });
    });

    indicators[0].classList.add('active');
    
    setTimeout(() => {
        startAutoScroll();
    }, 100);
});


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.item-card').forEach(itemCardSection => {
        const itemCards = itemCardSection.querySelector('.item-cards');
        const prevBtn = itemCardSection.querySelector('.prev-btn');
        const nextBtn = itemCardSection.querySelector('.next-btn');

        if (itemCards && prevBtn && nextBtn) {
            const scrollAmount = itemCards.clientWidth / 1;

            prevBtn.addEventListener('click', () => {
                itemCards.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                itemCards.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    });
});