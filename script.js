// ZENITH 2K25 - Main JavaScript File

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        disable: 'mobile'
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Enhanced hamburger menu functionality with better mobile handling
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Ensure menu is closed on page load
    if (hamburger && navLinks) {
        // Reset menu state on page load
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
        
        // Toggle menu and prevent body scrolling when menu is open
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                // Add overlay when menu is open
                if (!document.querySelector('.menu-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    document.body.appendChild(overlay);
                    
                    // Close menu when overlay is clicked
                    overlay.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                        overlay.remove();
                    });
                }
            } else {
                body.style.overflow = '';
                // Remove overlay when menu is closed
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) overlay.remove();
            }
        });

        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (event) => {
                // Always close the menu when a link is clicked on mobile
                if (window.innerWidth <= 992) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }
                
                // Smooth scroll to section if it's an anchor link
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        event.preventDefault();
                        window.scrollTo({
                            top: targetSection.offsetTop - 70, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Navbar background change on scroll with tech effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.padding = '0.5rem 0';
            header.style.borderBottom = '1px solid rgba(76, 201, 240, 0.3)';
            header.style.boxShadow = '0 5px 20px rgba(76, 201, 240, 0.2)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.8)';
            header.style.padding = '1rem 0';
            header.style.borderBottom = 'none';
            header.style.boxShadow = 'none';
        }
    });

    // Initialize particles.js with enhanced tech effect
    initParticles();
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize circuit animation
    initCircuitAnimation();
    
    // Initialize glitch effect
    initGlitchEffect();
    
    // Initialize 3D hover effect
    init3DHoverEffect();
});

// Typing effect for college name
function initTypingEffect() {
    const text = "K. RAMAKRISHNAN COLLEGE OF ENGINEERING";
    const typingTextElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingTextElement) return;
    
    let charIndex = 0;
    typingTextElement.textContent = '';
    
    function type() {
        if (charIndex < text.length) {
            typingTextElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Start blinking cursor after typing is complete
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
            
            // Restart typing after a delay
            setTimeout(() => {
                charIndex = 0;
                typingTextElement.textContent = '';
                setTimeout(type, 500);
            }, 5000);
        }
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Circuit animation
function initCircuitAnimation() {
    const circuitPattern = document.querySelector('.circuit-pattern');
    if (!circuitPattern) return;
    
    // Create random circuit lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line');
        
        // Random position and size
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 100 + 50}px`;
        line.style.height = `${Math.random() * 2 + 1}px`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random animation delay
        line.style.animationDelay = `${Math.random() * 5}s`;
        
        circuitPattern.appendChild(line);
        
        // Create circuit nodes
        if (Math.random() > 0.5) {
            const node = document.createElement('div');
            node.classList.add('circuit-node');
            node.style.left = `${Math.random() < 0.5 ? '-5px' : '100%'}`;
            node.style.top = '-3px';
            line.appendChild(node);
        }
    }
}

// Glitch effect
function initGlitchEffect() {
    const glitchEffect = document.querySelector('.glitch-effect');
    if (!glitchEffect) return;
    
    // Create random glitch elements
    setInterval(() => {
        // Clear previous glitches
        glitchEffect.innerHTML = '';
        
        // Random number of glitches
        const glitchCount = Math.floor(Math.random() * 5) + 1;
        
        for (let i = 0; i < glitchCount; i++) {
            const glitch = document.createElement('div');
            glitch.classList.add('glitch-item');
            
            // Random position, size and color
            glitch.style.left = `${Math.random() * 100}%`;
            glitch.style.top = `${Math.random() * 100}%`;
            glitch.style.width = `${Math.random() * 200 + 50}px`;
            glitch.style.height = `${Math.random() * 50 + 5}px`;
            glitch.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random color
            const colors = ['#4cc9f0', '#f72585', '#ffffff'];
            glitch.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            glitchEffect.appendChild(glitch);
            
            // Remove after short duration
            setTimeout(() => {
                glitch.remove();
            }, Math.random() * 200 + 50);
        }
    }, 2000);
}

// 3D hover effect for tech cards
function init3DHoverEffect() {
    const cards = document.querySelectorAll('.tech-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `0 15px 35px rgba(76, 201, 240, 0.3), 0 5px 15px rgba(0, 0, 0, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Countdown timer
function initCountdown() {
    // Set the idea submission deadline to April 21, 2025
    const ideaSubmissionDeadline = new Date(2025, 3, 21, 23, 59, 59); // April 21, 2025 at 11:59:59 PM
    
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');
    const countdownContainer = document.querySelector('.countdown-container');
    
    if (!countdownDays || !countdownHours || !countdownMinutes || !countdownSeconds) return;
    
    function updateCountdown() {
        const currentDate = new Date();
        const diff = ideaSubmissionDeadline - currentDate;
        
        if (diff <= 0) {
            // Registration has ended - add fade out animation
            if (countdownContainer) {
                countdownContainer.style.animation = 'fadeOut 1s forwards';
                setTimeout(() => {
                    // Update values
                    countdownDays.textContent = '00';
                    countdownHours.textContent = '00';
                    countdownMinutes.textContent = '00';
                    countdownSeconds.textContent = '00';
                    
                    // Change the countdown title with animation
                    const countdownTitle = document.querySelector('.countdown-title');
                    if (countdownTitle) {
                        countdownTitle.style.animation = 'fadeIn 1s forwards';
                        countdownTitle.innerHTML = '<i class="fas fa-exclamation-triangle me-2 pulse"></i>Idea Submission Closed';
                        countdownTitle.style.color = '#f72585';
                    }
                    
                    // Fade back in with updated content
                    countdownContainer.style.animation = 'fadeIn 1s forwards';
                }, 1000);
            }
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update the countdown elements with flip animation
        const elements = [
            { el: countdownDays, value: days, prev: countdownDays.textContent },
            { el: countdownHours, value: hours, prev: countdownHours.textContent },
            { el: countdownMinutes, value: minutes, prev: countdownMinutes.textContent },
            { el: countdownSeconds, value: seconds, prev: countdownSeconds.textContent }
        ];
        
        elements.forEach(({ el, value, prev }) => {
            const newValue = value < 10 ? `0${value}` : value.toString();
            if (prev !== newValue) {
                el.classList.add('flip');
                el.textContent = newValue;
                setTimeout(() => el.classList.remove('flip'), 300);
            }
        });
        
        // Add pulse animation to seconds every 10 seconds
        if (seconds % 10 === 0) {
            countdownSeconds.classList.add('pulse');
            setTimeout(() => {
                countdownSeconds.classList.remove('pulse');
            }, 1000);
        }
        
        // Add pulse animation when units change to zero
        if (seconds === 0) {
            countdownMinutes.classList.add('pulse');
            setTimeout(() => {
                countdownMinutes.classList.remove('pulse');
            }, 1000);
        }
        
        if (seconds === 0 && minutes === 0) {
            countdownHours.classList.add('pulse');
            setTimeout(() => {
                countdownHours.classList.remove('pulse');
            }, 1000);
        }
        
        if (seconds === 0 && minutes === 0 && hours === 0) {
            countdownDays.classList.add('pulse');
            setTimeout(() => {
                countdownDays.classList.remove('pulse');
            }, 1000);
        }
        
        // Add glow effect when less than 24 hours remaining
        if (days === 0) {
            countdownContainer.classList.add('urgent');
        } else {
            countdownContainer.classList.remove('urgent');
        }
    }
    
    // Update the countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Particles.js configuration with enhanced tech effect - responsive version
function initParticles() {
    // Check device width for responsive configuration
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isSmallMobile = width <= 480;
    
    // Configure particle count based on device size
    const particleCount = isSmallMobile ? 40 : (isMobile ? 60 : 100);
    const particleSpeed = isSmallMobile ? 1 : (isMobile ? 1.5 : 2);
    const particleSize = isSmallMobile ? 2 : 3;
    const linkDistance = isSmallMobile ? 100 : (isMobile ? 120 : 150);
    const linkWidth = isSmallMobile ? 0.8 : 1;
    const valueArea = isSmallMobile ? 600 : (isMobile ? 700 : 800);
    
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": particleCount,
                "density": {
                    "enable": true,
                    "value_area": valueArea
                }
            },
            "color": {
                "value": ["#4cc9f0", "#f72585", "#ffffff", "#3a0ca3"]
            },
            "shape": {
                "type": isSmallMobile ? ["circle", "triangle"] : ["circle", "triangle", "polygon", "edge", "star"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": isSmallMobile ? 0.8 : 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": particleSize,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": isSmallMobile ? 1.5 : 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": linkDistance,
                "color": "#4cc9f0",
                "opacity": 0.4,
                "width": linkWidth
            },
            "move": {
                "enable": true,
                "speed": particleSpeed,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": !isSmallMobile,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": !isSmallMobile,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": isMobile ? 100 : 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": isMobile ? 300 : 400,
                    "size": isMobile ? 30 : 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": isMobile ? 150 : 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": isMobile ? 2 : 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Re-initialize particles on window resize for better responsiveness
    window.addEventListener('resize', debounce(() => {
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
            initParticles();
        }
    }, 300));
}

// Preloader and additional effects
window.addEventListener('load', () => {
    const zenithText = document.querySelector('.zenith-text');
    
    // Add hologram effect to ZENITH text
    if (zenithText) {
        // Initial hologram effect
        applyHologramEffect();
        
        // Periodic hologram effect update
        setInterval(applyHologramEffect, 3000);
    }
    
    // Add neon glow effect to buttons
    const neonButtons = document.querySelectorAll('.neon-btn');
    neonButtons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.textShadow = '0 0 10px rgba(247, 37, 133, 0.8), 0 0 20px rgba(247, 37, 133, 0.5), 0 0 30px rgba(247, 37, 133, 0.3)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.textShadow = 'none';
        });
    });
});

// Hologram effect function
function applyHologramEffect() {
    const zenithText = document.querySelector('.zenith-text');
    if (!zenithText) return;
    
    // Random hologram glitch effect
    zenithText.style.textShadow = `
        0 0 5px rgba(76, 201, 240, 0.8),
        0 0 10px rgba(76, 201, 240, 0.5),
        0 0 15px rgba(76, 201, 240, 0.3),
        0 0 20px rgba(76, 201, 240, 0.2),
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(76, 201, 240, 0.7),
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(247, 37, 133, 0.7)
    `;
    
    // Add brief glitch effect
    zenithText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px) skew(${Math.random() * 4 - 2}deg)`;
    
    setTimeout(() => {
        zenithText.style.transform = 'translate(0, 0) skew(0)'; 
    }, 100);
    
    // Update hologram reflection
    const hologramReflection = document.querySelector('.hologram-reflection');
    if (hologramReflection) {
        hologramReflection.style.opacity = Math.random() * 0.3 + 0.1;
    }
}

// Utility function to limit how often a function can be called (for performance)
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Bootstrap initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap components
    if (typeof bootstrap !== 'undefined') {
        // Initialize popovers
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    }
});

// Add matrix rain effect in background (subtle) - responsive version
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Check if we're on mobile to adjust performance
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Skip matrix effect on very small devices to improve performance
    if (isSmallMobile && window.innerWidth < 360) {
        return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.classList.add('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Insert canvas before other elements
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    // Matrix characters
    const characters = '01';
    // Adjust column width based on device
    const columnWidth = isMobile ? 25 : 20;
    const columns = Math.ceil(canvas.width / columnWidth);
    const drops = [];
    
    // Initialize drops - fewer for mobile
    for (let i = 0; i < columns; i++) {
        // Only initialize every other column on mobile to reduce density
        if (!isMobile || i % 2 === 0) {
            drops[i] = Math.floor(Math.random() * -100);
        }
    }
    
    function drawMatrix() {
        // Set transparent background - more transparent on mobile
        ctx.fillStyle = isMobile ? 'rgba(26, 26, 46, 0.03)' : 'rgba(26, 26, 46, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color and font - smaller on mobile
        ctx.fillStyle = 'rgba(76, 201, 240, 0.3)';
        ctx.font = isMobile ? '12px Roboto Mono' : '15px Roboto Mono';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            if (drops[i] === undefined) continue; // Skip undefined drops (for mobile optimization)
            
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * columnWidth, drops[i] * columnWidth);
            
            // Reset drop when it reaches bottom or randomly
            // Higher chance to reset on mobile for fewer characters
            const resetThreshold = isMobile ? 0.96 : 0.975;
            if (drops[i] * columnWidth > canvas.height && Math.random() > resetThreshold) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Draw matrix effect at a slower rate for subtlety - even slower on mobile
    const interval = isMobile ? 150 : 100;
    const matrixInterval = setInterval(drawMatrix, interval);
    
    // Resize canvas on window resize with debounce
    window.addEventListener('resize', debounce(() => {
        const wasSmallMobile = isSmallMobile;
        const newIsMobile = window.innerWidth <= 768;
        const newIsSmallMobile = window.innerWidth <= 480;
        
        // If device changed from desktop to small mobile or vice versa, reload
        if ((wasSmallMobile && window.innerWidth < 360) !== (newIsSmallMobile && window.innerWidth < 360)) {
            clearInterval(matrixInterval);
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            // Reload the page to reset everything properly
            location.reload();
            return;
        }
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 250));
});

