document.addEventListener('DOMContentLoaded', function() {

    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button--right');
        const prevButton = document.querySelector('.carousel-button--left');
        const dotsNav = document.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        const slideWidth = slides[0].getBoundingClientRect().width;

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        }
 
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            const currentDot = dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling || dots[0];

            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        });

        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
            const currentDot = dotsNav.querySelector('.current-slide');
            const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

            moveToSlide(currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        });

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.carousel-indicator');
            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
        });
    }

    const modal = document.getElementById('form-modal');
    const openModalButtons = document.querySelectorAll('.open-modal-button');
    const closeModalButton = document.getElementById('close-modal-button');
    const form = document.getElementById('presence-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');

    const openModal = () => {
        modal.classList.add('visible');
    };

    const closeModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            formContainer.style.display = 'block';
            successMessage.style.display = 'none';
            form.reset();
        }, 300); 
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            openModal();
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 

            formContainer.style.display = 'none';
            successMessage.style.display = 'block';

            setTimeout(() => {
                closeModal();
            }, 3000);
        });
    }
});