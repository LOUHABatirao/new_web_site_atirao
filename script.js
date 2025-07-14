        // Services Carousel
        const servicesTrack = document.getElementById('servicesTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselDots = document.getElementById('carouselDots');
        const serviceCards = document.querySelectorAll('.service-card');

        let currentIndex = 0;
        const cardsToShow = 3;
        const totalCards = serviceCards.length;
        const maxIndex = totalCards - cardsToShow;

        // Create dots
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            const cardWidth = serviceCards[0].offsetWidth + 30; // including gap
            servicesTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            // Update dots
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

        // Auto-slide
        setInterval(() => {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);

        // Values Tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const valuesDisplay = document.querySelector('.values-display');

        const valuesContent = {
            0: {
                title: "NOS VALEURS<br>Des convictions fortes<br>pour des résultats durables.",
                content: "Nous croyons en l'excellence et la performance. Chaque projet est une opportunité de dépasser les attentes et de créer de la valeur ajoutée pour nos clients. Notre approche méthodique et notre passion pour l'innovation nous permettent de livrer des solutions digitales exceptionnelles."
            },
            1: {
                title: "CRÉATIVITÉ<br>L'innovation au service<br>de votre différenciation.",
                content: "Notre créativité nous permet de concevoir des solutions originales et impactantes. Nous sortons des sentiers battus pour créer des expériences digitales mémorables qui marquent les esprits et génèrent de l'engagement."
            },
            2: {
                title: "INNOVATION<br>Toujours à la pointe<br>des dernières tendances.",
                content: "Nous investissons constamment dans les nouvelles technologies et méthodologies. Notre veille technologique nous permet de proposer des solutions d'avant-garde qui donnent un avantage concurrentiel à nos clients."
            },
            3: {
                title: "TRANSPARENCE<br>Une collaboration<br>basée sur la confiance.",
                content: "Nous privilégions la transparence totale dans nos relations clients. Reporting détaillé, communication régulière et accès complet aux données : vous gardez le contrôle sur votre stratégie digitale."
            },
            4: {
                title: "MÉTHODOLOGIE<br>Un processus éprouvé<br>pour garantir le succès.",
                content: "Notre approche structurée et nos méthodologies éprouvées garantissent la réussite de vos projets. Chaque étape est planifiée, mesurée et optimisée pour maximiser votre retour sur investissement."
            },
            5: {
                title: "RÉACTIVITÉ<br>Nous nous adaptons<br>à votre rythme.",
                content: "Dans un monde digital en constante évolution, la réactivité est essentielle. Notre équipe agile s'adapte rapidement aux changements et aux urgences pour maintenir votre avantage concurrentiel."
            }
        };

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Update content
                const content = valuesContent[index];
                valuesDisplay.querySelector('h3').innerHTML = content.title;
                valuesDisplay.querySelector('p').textContent = content.content;
            });
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

        // Add scroll effect to header
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

        // Intersection Observer for animations
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

        // Observe elements for animation
        document.querySelectorAll('.service-card, .section-title').forEach(el => {
            observer.observe(el);
        });

        // Mobile menu toggle (for future implementation)
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.color = '#fff';
        mobileMenuBtn.style.fontSize = '24px';
        mobileMenuBtn.style.cursor = 'pointer';

        // Add mobile menu button to header
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(mobileMenuBtn);

        // Show mobile menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                document.querySelector('nav').style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('nav').style.display = 'block';
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Add click effects to buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
