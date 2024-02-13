document.addEventListener('DOMContentLoaded', function () {

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.querySelector('body');


    hamburgerMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
        body.classList.toggle('menu-open');

    });
    const mobileMenuItems = document.querySelectorAll('.mobile-menu a');
    mobileMenuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            mobileMenu.classList.remove('show');
        });
    });
    closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('show');
        body.classList.remove('menu-open');

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


    const scrollLinks = document.querySelectorAll('a.scroll-link');

    for (const scrollLink of scrollLinks) {
      scrollLink.addEventListener('click', smoothScroll);
    }

    function smoothScroll(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, 
          behavior: 'smooth',
        });
      }
    }
  

});
