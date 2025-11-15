let lastscroll = 0;

// Added scroll aware navbar
window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.scrollY;

            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScroll > lastscroll && currentScroll > 80) {
                navbar.classList.add('hide-nav');
            } else {
                navbar.classList.remove('hide-nav');
            }

            lastscroll = currentScroll;
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // FAQ Accordion functionality - Allow multiple open
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                
                // Toggle the clicked item
                faqItem.classList.toggle('active');
            });
        });

        // Dark mode toggle functionality with View Transitions
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        // keep a matching class name for some transition selectors
        if (currentTheme === 'dark') htmlElement.classList.add('dark');

        const applyTheme = (newTheme) => {
            htmlElement.setAttribute('data-theme', newTheme);
            if (newTheme === 'dark') htmlElement.classList.add('dark'); else htmlElement.classList.remove('dark');
            localStorage.setItem('theme', newTheme);
        };

        themeToggle.addEventListener('click', () => {
            const cur = htmlElement.getAttribute('data-theme');
            const newTheme = cur === 'light' ? 'dark' : 'light';

            if (document.startViewTransition) {
                document.startViewTransition(() => applyTheme(newTheme));
            } else {
                applyTheme(newTheme);
            }
        });
