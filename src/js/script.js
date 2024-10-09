document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.querySelector('body');


    hamburgerMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
        header.classList.toggle('hide');
        body.classList.toggle('menu-open');

    });
    const mobileMenuItems = document.querySelectorAll('.mobile-menu a');
    mobileMenuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            mobileMenu.classList.remove('show');
            body.classList.remove('menu-open');
            header.classList.remove('hide');
        });
    });
    closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('show');
        body.classList.remove('menu-open');
        header.classList.remove('hide');
    });

    function countUp(targetElement, start, end, duration) {
        let current = start;
        const increment = (end - start) / duration;
        const element = document.querySelector(targetElement);

        function updateCount() {
            current += increment;
            element.textContent = Math.round(current) + "+";

            if (current < end) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = end + "+";
            }
        }
        updateCount();
    }

    countUp('.counter1', 0, 123, 70);
    countUp('.counter2', 0, 10, 60);
    countUp('.counter3', 0, 5, 70);
    countUp('.counter4', 0, 20, 70);

    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let isDragging = false;
let startX;
let scrollLeft;

// Function to handle the drag start
function dragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX; // Get the starting position
    scrollLeft = testimonialWrapper.scrollLeft; // Get current scroll position
}

// Function to handle the drag move
function dragMove(e) {
    if (!isDragging) return; // Do nothing if not dragging
    e.preventDefault(); // Prevent default behavior
    const x = e.pageX || e.touches[0].pageX; // Get the current position
    const walk = (x - startX) * 1; // Calculate distance moved
    testimonialWrapper.scrollLeft = scrollLeft - walk; // Set new scroll position
}

// Function to handle the drag end
function dragEnd() {
    isDragging = false; // Reset dragging flag
}

// Attach mouse/touch events to the testimonial wrapper
testimonialWrapper.addEventListener('mousedown', dragStart);
testimonialWrapper.addEventListener('mousemove', dragMove);
testimonialWrapper.addEventListener('mouseup', dragEnd);
testimonialWrapper.addEventListener('mouseleave', dragEnd);

// Touch events for mobile
testimonialWrapper.addEventListener('touchstart', dragStart);
testimonialWrapper.addEventListener('touchmove', dragMove);
testimonialWrapper.addEventListener('touchend', dragEnd);

// Navigation buttons functionality
nextButton.addEventListener('click', () => {
    testimonialWrapper.scrollLeft += testimonialWrapper.clientWidth; // Scroll right
});

prevButton.addEventListener('click', () => {
    testimonialWrapper.scrollLeft -= testimonialWrapper.clientWidth; // Scroll left
});

     
});
