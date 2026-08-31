/* --------------------------------------------------------------------------
   Yogith Menda Portfolio JavaScript Logic
   Includes:
   - Canvas Node Particle System (Constellation Effect)
   - Dynamic Typing Animation
   - Interactive Scientific Calculator Engine
   - GitHub OAuth Flow Interactive Simulation
   - Responsive Navigation & Smooth Scroll
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    initTypingEffect();
    initNavbarScroll();
    initMobileNav();
    initScrollAnimations();
    initCalculatorEngine();
});

/* --------------------------------------------------------------------------
   1. Canvas Constellation Particle System
   -------------------------------------------------------------------------- */
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width * 0.06), 75);

    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.75;
            this.vy = (Math.random() - 0.5) * 0.75;
            this.radius = Math.random() * 1.8 + 1;
            this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(155, 81, 224, ';
            this.baseAlpha = Math.random() * 0.4 + 0.3;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.baseAlpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color + '0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update() {
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }

            this.x += this.vx;
            this.y += this.vy;
            this.draw();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 125) {
                    const opacity = 1 - distance / 125;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.25})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => p.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Dynamic Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const roles = [
        "Python & C Developer",
        "Web Automation Explorer",
        "Problem Solver",
        "OAuth & Security Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll Behavior
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(7, 9, 19, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(7, 9, 19, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   5. Scroll Observer for Progress Bars
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach((bar) => observer.observe(bar));
}

/* --------------------------------------------------------------------------
   6. Interactive Scientific Calculator Engine
   -------------------------------------------------------------------------- */
let calcExpression = '';
let isDegMode = true;

function openCalculatorModal() {
    const modal = document.getElementById('calc-modal');
    if (modal) modal.classList.add('active');
}

function closeCalculatorModal() {
    const modal = document.getElementById('calc-modal');
    if (modal) modal.classList.remove('active');
}

function toggleDegRad() {
    isDegMode = !isDegMode;
    const btn = document.getElementById('deg-rad-btn');
    if (btn) btn.textContent = isDegMode ? 'DEG' : 'RAD';
}

function initCalculatorEngine() {
    window.calcInput = function(val) {
        calcExpression += val;
        updateCalcDisplay();
    };

    window.calcClear = function() {
        calcExpression = '';
        document.getElementById('calc-history').textContent = '';
        document.getElementById('calc-current').textContent = '0';
    };

    window.calcFunc = function(funcName) {
        const currentDisplay = document.getElementById('calc-current').textContent;
        let num = parseFloat(currentDisplay) || 0;

        switch (funcName) {
            case 'sin':
                let angleSin = isDegMode ? (num * Math.PI) / 180 : num;
                calcExpression = Math.sin(angleSin).toFixed(6).replace(/\.?0+$/, '');
                break;
            case 'cos':
                let angleCos = isDegMode ? (num * Math.PI) / 180 : num;
                calcExpression = Math.cos(angleCos).toFixed(6).replace(/\.?0+$/, '');
                break;
            case 'tan':
                let angleTan = isDegMode ? (num * Math.PI) / 180 : num;
                calcExpression = Math.tan(angleTan).toFixed(6).replace(/\.?0+$/, '');
                break;
            case 'log':
                calcExpression = num > 0 ? Math.log10(num).toFixed(6).replace(/\.?0+$/, '') : 'Error';
                break;
            case 'ln':
                calcExpression = num > 0 ? Math.log(num).toFixed(6).replace(/\.?0+$/, '') : 'Error';
                break;
            case 'sqrt':
                calcExpression = num >= 0 ? Math.sqrt(num).toFixed(6).replace(/\.?0+$/, '') : 'Error';
                break;
            case 'sqr':
                calcExpression = (num * num).toString();
                break;
            case 'fact':
                calcExpression = factorial(num).toString();
                break;
            case 'pi':
                calcExpression += Math.PI.toFixed(6);
                break;
            case 'e':
                calcExpression += Math.E.toFixed(6);
                break;
            case 'del':
                calcExpression = calcExpression.slice(0, -1);
                break;
        }

        updateCalcDisplay();
    };

    window.calcEqual = function() {
        if (!calcExpression) return;
        try {
            document.getElementById('calc-history').textContent = calcExpression + ' =';
            // Safe sanitized math evaluation
            let sanitized = calcExpression.replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)');
            sanitized = sanitized.replace(/\^/g, '**');
            
            let result = Function(`'use strict'; return (${sanitized})`)();
            if (typeof result === 'number' && !isNaN(result)) {
                if (!Number.isInteger(result)) {
                    result = parseFloat(result.toFixed(8));
                }
                calcExpression = result.toString();
            } else {
                calcExpression = 'Error';
            }
        } catch (e) {
            calcExpression = 'Error';
        }
        updateCalcDisplay();
    };
}

function factorial(n) {
    if (n < 0) return 'Error';
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) res *= i;
    return res;
}

function updateCalcDisplay() {
    const historyEl = document.getElementById('calc-history');
    const currentEl = document.getElementById('calc-current');
    
    currentEl.textContent = calcExpression || '0';
}

/* --------------------------------------------------------------------------
   7. GitHub OAuth Interactive Demo Modal
   -------------------------------------------------------------------------- */
function openOAuthDemoModal() {
    const modal = document.getElementById('oauth-modal');
    if (modal) {
        modal.classList.add('active');
        resetOAuthDemo();
    }
}

function closeOAuthDemoModal() {
    const modal = document.getElementById('oauth-modal');
    if (modal) modal.classList.remove('active');
}

function nextOAuthStep(step) {
    document.querySelectorAll('.flow-step').forEach((el, index) => {
        if (index + 1 === step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    document.getElementById('oauth-state-1').classList.add('hidden');
    document.getElementById('oauth-state-2').classList.add('hidden');
    document.getElementById('oauth-state-3').classList.add('hidden');

    document.getElementById(`oauth-state-${step}`).classList.remove('hidden');
}

function resetOAuthDemo() {
    nextOAuthStep(1);
}

/* --------------------------------------------------------------------------
   8. Contact Form Handler
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.reset();
    feedback.classList.remove('hidden');

    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 4000);
}
