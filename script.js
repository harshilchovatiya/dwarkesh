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


     
});
