// Advanced animations and effects for portfolio website
// Author: Melchizedek Joshua Lozano

// Animation controller class
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypingAnimation();
        this.setupParallaxEffects();
        this.setupProgressBars();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="fade-"], [class*="slide-"]');
        animatedElements.forEach(el => {
            this.scrollObserver.observe(el);
        });
    }

    // Trigger animation for element
    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        
        if (animationType) {
            element.classList.add(animationType);
            
            // Add staggered delay for child elements
            const children = element.querySelectorAll('.skill-item, .project-card, .timeline-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('fade-in-up');
                }, index * 100);
            });
        }
    }

    // Get animation type from element classes
    getAnimationType(element) {
        const classes = element.className.split(' ');
        const animationClass = classes.find(cls => 
            cls.startsWith('animate-') || 
            cls.startsWith('fade-') || 
            cls.startsWith('slide-')
        );
        return animationClass;
    }

    // Scroll-based animations
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Navbar background opacity
            const navbar = document.getElementById('navbar');
            if (navbar) {
                const opacity = Math.min(scrolled / 100, 1);
                const currentTheme = document.body.getAttribute('data-theme');
                
                if (currentTheme === 'dark') {
                    navbar.style.backgroundColor = `rgba(15, 23, 42, ${0.95 + (opacity * 0.03)})`;
                } else {
                    navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + (opacity * 0.03)})`;
                }
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Hover effects
    setupHoverEffects() {
        // Skill items hover effect
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
                item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });

        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const image = card.querySelector('.project-image img');
            const overlay = card.querySelector('.project-overlay');

            card.addEventListener('mouseenter', () => {
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });

        // Social links hover effect
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) rotate(5deg)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) rotate(0deg)';
            });
        });
    }

    // Typing animation for hero text
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--primary-color)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === 'none' ? 
                        '2px solid var(--primary-color)' : 'none';
                }, 500);
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            element.classList.add('parallax');
        });
    }

    // Progress bars animation
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !bar.classList.contains('animate')) {
                    bar.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars(); // Run once on load
    }

    // Custom animation methods
    fadeIn(element, duration = 1000) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }

    fadeOut(element, duration = 1000) {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    slideIn(element, direction = 'left', duration = 1000) {
        const directions = {
            left: 'translateX(-100%)',
            right: 'translateX(100%)',
            up: 'translateY(-100%)',
            down: 'translateY(100%)'
        };

        element.style.transform = directions[direction];
        element.style.transition = `transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.transform = 'translate(0, 0)';
        }, 10);
    }

    // Staggered animation for lists
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // Morphing animation between elements
    morphElement(fromElement, toElement, duration = 500) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        
        const deltaX = fromRect.left - toRect.left;
        const deltaY = fromRect.top - toRect.top;
        const deltaWidth = fromRect.width / toRect.width;
        const deltaHeight = fromRect.height / toRect.height;
        
        toElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth}, ${deltaHeight})`;
        toElement.style.transition = `transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            toElement.style.transform = 'translate(0, 0) scale(1, 1)';
        }, 10);
    }

    // Particle system for background effects
    createParticleSystem(container, particleCount = 50) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';

        const particles = [];
        
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        const createParticle = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });

        const initParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        };

        const updateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
                ctx.fill();
            });
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', resizeCanvas);
    }

    // Loading animation
    showLoadingAnimation(container) {
        const loader = document.createElement('div');
        loader.className = 'loading-animation';
        loader.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        container.appendChild(loader);
        
        return {
            hide: () => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        };
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
