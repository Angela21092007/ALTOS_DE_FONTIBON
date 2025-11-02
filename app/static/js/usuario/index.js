// HAMBUERGER //
const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace (móvil)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Efecto de scroll suave
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

// INCREMENTO DE NUMEROS //
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // velocidad
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  // IntersectionObserver para activar animación al hacer scroll
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // velocidad
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  // 🚀 Animar todos los números al cargar la página
  window.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".numero");
    counters.forEach(counter => {
      counter.classList.add("visible"); // fade in
      animateCounter(counter);
    });
  });

// Datos de testimonios
        const testimonials = [
            {
                text: "La plataforma nos llevó a otro nivel, porque nos permitió adaptarnos a todos los tiempos digitales, así afirmamos asistencia a nuestros lugares.",
                author: "Ana García",
                stars: 5
            },
            {
                text: "Esta aplicación nos ayudó mucho para informarnos del manejo del dinero, además de que con su red social nos comunicamos más rápido y ahorramos tiempo.",
                author: "Carlos Rodríguez",
                stars: 5
            },
            {
                text: "Esta aplicación nos ayudó a comunicarnos más fácilmente con los residentes, manteníamos más ordenados en los registros de los ingresos y egresos, además de que los vecinos han podido promocionar sus servicios dentro de la misma privada.",
                author: "María López",
                stars: 5
            },
            {
                text: "La plataforma nos ayudó mucho para facilitar nuestros archivos del dinero, además de que con su red social nos comunicamos más rápido y ahorramos tiempo.",
                author: "José Martínez",
                stars: 5
            },
            {
                text: "Esta aplicación nos ayudó a comunicarnos más fácilmente con los residentes y mantener todo organizado.",
                author: "Laura Hernández",
                stars: 4
            },
            {
                text: "Una herramienta fundamental para la gestión de nuestra comunidad. Altamente recomendada.",
                author: "Pedro Sánchez",
                stars: 5
            }
        ];

        let currentIndex = 0;
        const testimonialsContainer = document.getElementById('testimonialsContainer');
        const dotsContainer = document.getElementById('dotsContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Generar testimonios
        function generateTestimonials() {
            testimonialsContainer.innerHTML = '';
            
            testimonials.forEach((testimonial, index) => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="stars">
                        ${'★'.repeat(testimonial.stars)}${'☆'.repeat(5 - testimonial.stars)}
                    </div>
                    <div class="testimonial-text">"${testimonial.text}"</div>
                    <div class="testimonial-author">- ${testimonial.author}</div>
                `;
                
                card.addEventListener('click', () => goToSlide(index));
                testimonialsContainer.appendChild(card);
            });
        }

        // Generar dots
        function generateDots() {
            dotsContainer.innerHTML = '';
            
            testimonials.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        // Posicionar testimonios
        function positionTestimonials() {
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.dot');
            
            cards.forEach((card, index) => {
                card.classList.remove('active', 'left', 'center-left', 'center', 'center-right', 'right', 'hidden');
                
                const position = (index - currentIndex + testimonials.length) % testimonials.length;
                
                switch(position) {
                    case 0:
                        card.classList.add('center', 'active');
                        break;
                    case 1:
                        card.classList.add('center-right');
                        break;
                    case 2:
                        card.classList.add('right');
                        break;
                    case testimonials.length - 1:
                        card.classList.add('center-left');
                        break;
                    case testimonials.length - 2:
                        card.classList.add('left');
                        break;
                    default:
                        card.classList.add('hidden');
                }
            });
            
            // Actualizar dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Ir a slide específico
        function goToSlide(index) {
            currentIndex = index;
            positionTestimonials();
        }

        // Siguiente slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            positionTestimonials();
        }

        // Slide anterior
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            positionTestimonials();
        }

        // Auto-play
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        });

        // Pausar auto-play al hacer hover
        testimonialsContainer.addEventListener('mouseenter', stopAutoPlay);
        testimonialsContainer.addEventListener('mouseleave', startAutoPlay);

        // Soporte para swipe en móviles
        let startX = 0;
        let endX = 0;

        testimonialsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        testimonialsContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            }
        }

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            }
        });

        // Inicializar
        document.addEventListener('DOMContentLoaded', () => {
            generateTestimonials();
            generateDots();
            positionTestimonials();
            startAutoPlay();
        });
// Variables del carrusel
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        const carouselSlides = document.querySelector('.carousel-slides');
        const controls = document.querySelectorAll('.carousel-control');
        const prevBtn = document.querySelector('.carousel-arrow.prev');
        const nextBtn = document.querySelector('.carousel-arrow.next');
        
        // Inicializar carrusel sin animación
        carouselSlides.style.transform = `translateX(0)`;

        // Función para cambiar de slide
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            carouselSlides.style.transform = `translateX(-${currentSlide * 25}%)`;
            
            // Actualizar controles activos
            controls.forEach((control, i) => {
                if (i === currentSlide) {
                    control.classList.add('active');
                } else {
                    control.classList.remove('active');
                }
            });
        }

        // Event listeners para controles
        controls.forEach(control => {
            control.addEventListener('click', () => {
                const index = parseInt(control.getAttribute('data-index'));
                goToSlide(index);
            });
        });

        // Event listeners para flechas
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        // Cambio automático de slides
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);

        // Pausar el carrusel al pasar el mouse
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const start = 50;
                const end = 400;

                if (scrollY < start) {
                    // 🔹 Estado inicial: transparente con leve tinte
                    navbar.style.background = `
                        radial-gradient(circle at 20% 30%, rgba(45, 106, 79, 0.05), transparent 60%),
                        radial-gradient(circle at 80% 20%, rgba(26, 74, 58, 0.04), transparent 70%),
                        radial-gradient(circle at 50% 80%, rgba(15, 32, 39, 0.05), transparent 65%),
                        rgba(0, 0, 0, 0.02)
                    `;
                    navbar.style.backdropFilter = "blur(0px)";
                    navbar.style.boxShadow = "none";
                    navbar.classList.remove('scrolled', 'solid');
                } 
                else if (scrollY >= start && scrollY <= end) {
                    // 🔹 Transición progresiva
                    const progress = (scrollY - start) / (end - start);
                    const blur = 8 * progress;
                    const opacity = 0.1 + (0.5 * progress);

                    navbar.style.background = `
                        radial-gradient(circle at 20% 30%, rgba(45, 106, 79, ${opacity + 0.15}), transparent 60%),
                        radial-gradient(circle at 80% 20%, rgba(26, 74, 58, ${opacity + 0.1}), transparent 70%),
                        radial-gradient(circle at 50% 80%, rgba(15, 32, 39, ${opacity}), transparent 65%),
                        linear-gradient(90deg, rgba(15, 32, 39, ${opacity}), rgba(26, 74, 58, ${opacity + 0.1}), rgba(45, 106, 79, ${opacity + 0.15}))
                    `;
                    navbar.style.backdropFilter = `blur(${blur}px)`;
                    navbar.style.boxShadow = `0 2px 10px rgba(0, 0, 0, ${0.1 + 0.05 * progress})`;

                    navbar.classList.add('scrolled');
                    navbar.classList.remove('solid');
                } 
                else {
                navbar.style.background = `
                    radial-gradient(circle at 75% 30%, rgba(15, 32, 39, 0.35), transparent 60%),
                    radial-gradient(circle at 20% 20%, rgba(26, 74, 58, 0.25), transparent 70%),
                    radial-gradient(circle at 50% 80%, rgba(45, 106, 79, 0.3), transparent 65%),
                    linear-gradient(270deg, #0f2027 0%, #1a4a3a 50%, #2d6a4f 100%)
                `;
                navbar.style.backdropFilter = "blur(0px)";
                navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.15)";
                navbar.style.transition = "background 0.6s ease, backdrop-filter 0.6s ease, box-shadow 0.6s ease";
                navbar.classList.add('solid');
                navbar.classList.remove('scrolled');
            }
            });

// Abrir modales al hacer clic en las cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const cardId = card.getAttribute('data-card');
                const modal = document.getElementById(`modal-${cardId}`);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Cerrar modales
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const modal = btn.closest('.modal-overlay');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Cerrar modal al hacer clic fuera del contenido
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Funcionalidad del carrusel dentro de los modales
        document.querySelectorAll('.modal-carousel').forEach(carousel => {
            const slidesContainer = carousel.querySelector('.modal-carousel-slides');
            const slides = carousel.querySelectorAll('.modal-carousel-slide');
            const controls = carousel.querySelectorAll('.modal-carousel-control');
            const prevArrow = carousel.querySelector('.modal-carousel-arrow.prev');
            const nextArrow = carousel.querySelector('.modal-carousel-arrow.next');

            let currentSlide = 0;
            const totalSlides = slides.length;

            // 🧩 Ajustar dinámicamente el ancho de los slides según cantidad de imágenes
            slidesContainer.style.width = `${totalSlides * 100}%`;
            slides.forEach(slide => {
                slide.style.width = `${100 / totalSlides}%`;
            });

            // ⚙️ Función para moverse entre slides
            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                currentSlide = index;
                slidesContainer.style.transform = `translateX(-${(100 / totalSlides) * currentSlide}%)`;

                // Actualizar los puntos activos
                controls.forEach((control, i) => {
                    control.classList.toggle('active', i === currentSlide);
                });
            }

            // 🔘 Control manual con puntos
            controls.forEach(control => {
                control.addEventListener('click', () => {
                    const index = parseInt(control.getAttribute('data-index'));
                    goToSlide(index);
                });
            });

            // ⬅️➡️ Flechas de navegación
            if (prevArrow) {
                prevArrow.addEventListener('click', () => {
                    goToSlide(currentSlide - 1);
                });
            }

            if (nextArrow) {
                nextArrow.addEventListener('click', () => {
                    goToSlide(currentSlide + 1);
                });
            }

            // Iniciar en la primera slide
            goToSlide(0);
        });


// HAMBUERGER //
const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace (móvil)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Efecto de scroll suave
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

// CARDS //
let currentCardIndex = 0;
const cardsWrapper = document.querySelector('.cards-wrapper');
const cardControls = document.querySelectorAll('.card-control');
const prevCardBtn = document.querySelector('.prev-card');
const nextCardBtn = document.querySelector('.next-card');
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
const cardsPerView = 3;

// Variables para el modal
const modalButtons = document.querySelectorAll('.btn-explorar');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-modal');

function updateCardsPosition() {
    const cardWidth = cards[0].offsetWidth + 30; // Ancho de la card + gap
    cardsWrapper.style.transform = `translateX(-${currentCardIndex * cardWidth}px)`;
    
    // Actualizar controles activos
    cardControls.forEach((control, i) => {
        if (i === currentCardIndex) {
            control.classList.add('active');
        } else {
            control.classList.remove('active');
        }
    });
}

// Funcionalidad del modal con scroll
function setupModalScroll() {
    // Abrir modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Asegurar que el modal sea scrollable
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.overflowY = 'auto';
                    modalContent.style.maxHeight = '90vh';
                }
            }
        });
    });

    // Cerrar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Event listeners para controles de cards
prevCardBtn.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCardsPosition();
    }
});

nextCardBtn.addEventListener('click', () => {
    if (currentCardIndex < totalCards - cardsPerView) {
        currentCardIndex++;
        updateCardsPosition();
    }
});

cardControls.forEach(control => {
    control.addEventListener('click', () => {
        const index = parseInt(control.getAttribute('data-index'));
        currentCardIndex = index;
        updateCardsPosition();
    });
});


// INCREMENTO DE NUMEROS //
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // velocidad
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  // IntersectionObserver para activar animación al hacer scroll
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // velocidad
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  //  Animar todos los números al cargar la página
  window.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".numero");
    counters.forEach(counter => {
      counter.classList.add("visible"); // fade in
      animateCounter(counter);
    });
  });


