// --- Interactive Content (Show/Hide Analysis & Smooth Scroll) ---

const toggleBtn = document.getElementById('toggle-meaning-btn');
const jumpBtn = document.getElementById('jump-to-analysis-btn'); 
const backToTopBtn = document.querySelector('.back-to-top');
const analysisSection = document.getElementById('song-analysis');

// Функція для плавного скролінгу до елемента
function smoothScrollTo(element) {
    // Перевіряємо, чи існує елемент
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 50, // Зсув 
            behavior: 'smooth'
        });
    }
}

// 1. Обробник для кнопки "Show/Hide Full Analysis"
toggleBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Запобігаємо будь-якій стандартній поведінці
    
    // Toggle the 'hidden' class to show or hide the section
    analysisSection.classList.toggle('hidden');

    // Change the button text and scroll
    if (analysisSection.classList.contains('hidden')) {
        toggleBtn.textContent = 'Show Full Analysis & Cultural Context';
    } else {
        toggleBtn.textContent = 'Hide Analysis';
        // Якщо секція показана, плавно переходимо до неї
        smoothScrollTo(analysisSection); 
    }
});

// ... (ІНШИЙ КОД БЕЗ ЗМІН) ...

// 2. Обробник для кнопки "Go to Deep Analysis ↓"
if (jumpBtn) {
    jumpBtn.addEventListener('click', (event) => {
        event.preventDefault(); // ЗАПОБІГАЄМО ПОВЕРНЕННЮ НАВЕРХ
        const targetId = event.currentTarget.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);
        
        // **КЛЮЧОВА ЛОГІКА:** Якщо аналіз прихований, показуємо його.
        if (targetElement && targetElement.classList.contains('hidden')) {
            targetElement.classList.remove('hidden');
            // Оновлюємо текст кнопки Show/Hide
            toggleBtn.textContent = 'Hide Analysis'; 
        }
        
        // Плавно прокручуємо до відкритого елемента
        smoothScrollTo(targetElement); 
    });
}

// ... (ІНШИЙ КОД БЕЗ ЗМІН) ...

// 3. Обробник для кнопки "Back to Top ↑"
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (event) => {
        event.preventDefault(); // КЛЮЧОВЕ ВИПРАВЛЕННЯ
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// --- Background Animation (Falling Emerald Particles) ---

const canvas = document.getElementById('sky-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 75; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; 
        this.speedY = Math.random() * 0.5 + 0.1; 
        this.speedX = (Math.random() - 0.5) * 0.2; 
        this.color = `rgba(56, 249, 210, ${Math.random() * 0.5 + 0.2})`; 
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.y = 0; 
            this.x = Math.random() * canvas.width; 
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();