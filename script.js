document.addEventListener('DOMContentLoaded', function () {
    // === Mobile Menu ===
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navUl.classList.remove('show');
        } else {
            mobileMenuBtn.style.display = 'none';
            navUl.classList.remove('show'); // reset
        }
    }

    mobileMenuBtn.addEventListener('click', function () {
        navUl.classList.toggle('show');
    });

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // === Carousel ===
    const servicesTrack = document.getElementById('servicesTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');
    const serviceCards = document.querySelectorAll('.service-card');

    let currentIndex = 0;
    const cardsToShow = 3;
    const totalCards = serviceCards.length;
    const maxIndex = totalCards - cardsToShow;

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        const cardWidth = serviceCards[0].offsetWidth + 30;
        servicesTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateCarousel();
    });

    setInterval(() => {
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);

    // === Tabs for values ===
    const tabButtons = document.querySelectorAll('.tab-button');
    const valuesDisplay = document.querySelector('.values-display');

    const valuesContent = {
        0: {
            title: "NOS VALEURS<br>Des convictions fortes<br>pour des résultats durables.",
            content: "Nous croyons en l'excellence et la performance..."
        },
        1: {
            title: "CRÉATIVITÉ<br>L'innovation au service<br>de votre différenciation.",
            content: "Notre créativité nous permet de concevoir des solutions originales..."
        },
        2: {
            title: "INNOVATION<br>Toujours à la pointe<br>des dernières tendances.",
            content: "Nous investissons constamment dans les nouvelles technologies..."
        },
        3: {
            title: "TRANSPARENCE<br>Une collaboration<br>basée sur la confiance.",
            content: "Nous privilégions la transparence totale dans nos relations clients..."
        },
        4: {
            title: "MÉTHODOLOGIE<br>Un processus éprouvé<br>pour garantir le succès.",
            content: "Notre approche structurée et nos méthodologies éprouvées..."
        },
        5: {
            title: "RÉACTIVITÉ<br>Nous nous adaptons<br>à votre rythme.",
            content: "Dans un monde digital en constante évolution..."
        }
    };

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const content = valuesContent[index];
            valuesDisplay.querySelector('h3').innerHTML = content.title;
            valuesDisplay.querySelector('p').textContent = content.content;
        });
    });

    // === Smooth scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Header scroll effect ===
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(34, 34, 36, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--gray)';
            header.style.backdropFilter = 'none';
        }
    });

    // === Reveal on scroll ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // === Ripple effect ===
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // === Loading animation ===
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
