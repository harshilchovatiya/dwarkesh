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

    const wrapper = document.querySelector('.testimonial-wrapper');
    let currentIndex = 0;
const cards = document.querySelectorAll('.testimonial-card');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const totalCards = cards.length;

// Function to update which card is active (centered)
function updateActiveCard() {
    cards.forEach((card, index) => {
        // Reset all cards to their default state
        card.classList.remove('active');
        card.style.opacity = "0.5";
        card.style.transform = "scale(0.9)";
        updateDots();
    });

    // Set the current card as active
    const activeCard = cards[currentIndex];
    activeCard.classList.add('active');
    activeCard.style.opacity = "1";
    activeCard.style.transform = "scale(1.2)";
}

// Initial activation of the first card
updateActiveCard();

// Loop functionality: Slide to the previous card
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalCards - 1; // Loop back to the last card
    }
    updateActiveCard();
});

// Loop functionality: Slide to the next card
nextButton.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first card
    }
    updateActiveCard();
});

// Auto-slide functionality to continuously move the cards
setInterval(() => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first card
    }
    updateActiveCard();
}, 4000); // Slides every 4 seconds (adjust as needed)

function cloneCards() {
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);
    document.querySelector('.testimonial-wrapper').appendChild(firstCard);
    document.querySelector('.testimonial-wrapper').insertBefore(lastCard, cards[0]);
}

cloneCards();

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevButton.click();
    } else if (event.key === 'ArrowRight') {
        nextButton.click();
    }
});



     
});
