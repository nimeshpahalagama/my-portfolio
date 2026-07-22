// 1. Home Section එකේ Typing වෙන Text List එක
const typedTextSpan = document.getElementById("typed-text");
const textArray = [
    "Undergraduate Student",
    "Data Science Undergraduate",
    "Machine Learning Enthusiast",
    "Data Analytics Specialist",
    "Full-Stack Web Developer"
];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 40);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) setTimeout(type, 500);
});

// 2. Interactive Mouse Cursor Trail Particles
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#00ff66';
        this.alpha = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff66';
        ctx.fill();
        ctx.restore();
    }
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

window.addEventListener('touchmove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.touches[0].clientX, e.touches[0].clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 3. Dark / Light Mode Toggle
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = themeToggleBtn.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
});

// Background Music Play/Pause Controller
const bgMusic = document.getElementById('bg-music');
const speakerBtn = document.getElementById('speaker-btn');
const speakerIcon = speakerBtn.querySelector('i');

// Page එකේ ඕනෑම තැනක පළමු Click එක දුන් පසු Music එක Unmute වී Play වීම
document.addEventListener('click', function() {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        bgMusic.play();
        speakerIcon.className = 'fas fa-volume-up';
    }
}, { once: true }); // එක පාරක් පමණක් ක්‍රියාත්මක වේ

// Button එක Click කරද්දී Music එක Mute / Unmute කිරීම
speakerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Page click event එක නවත්වයි
    if (bgMusic.muted || bgMusic.paused) {
        bgMusic.muted = false;
        bgMusic.play();
        speakerIcon.className = 'fas fa-volume-up';
    } else {
        bgMusic.muted = true;
        speakerIcon.className = 'fas fa-volume-mute';
    }
});

// 5. AI Assistant Dynamic Responses (Updated)
const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatCloseBtn = document.getElementById("chat-close-btn");
const chatBox = document.getElementById("chat-box");
const chatSendBtn = document.getElementById("chat-send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Chatbox Open / Close Toggle Logic
if (chatToggleBtn && chatBox) {
    chatToggleBtn.addEventListener("click", () => {
        chatBox.classList.toggle("active");
        chatBox.classList.toggle("hidden");
    });
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener("click", () => {
            chatBox.classList.remove("active");
            chatBox.classList.add("hidden");
        });
    }
}

// AI Smart Reply Engine
function getAIResponse(userQuery) {
    const query = userQuery.toLowerCase();
    if (query.includes("name") || query.includes("who are you") || query.includes("nama")) {
        return "I am Nimesh Pahalagama's AI Assistant! Nimesh is a Computer Science / Software Engineering undergraduate.";
    } else if (query.includes("project") || query.includes("work") || query.includes("system")) {
        return "Nimesh has worked on SmartCare Hospital Management System (Java/Spring Boot)[cite: 1], a Library Management System (Python/Tkinter), and his personal Portfolio Website!";
    } else if (query.includes("skill") || query.includes("technology") || query.includes("stack") || query.includes("know")) {
        return "Nimesh specializes in Data Science, Machine Learning, Java, Spring Boot, Python, Web Development, and SQL!";
    } else if (query.includes("education") || query.includes("degree") || query.includes("university")) {
        return "Nimesh is currently an IT Undergraduate in Sri Lanka focusing on Data Science & Software Engineering.";
    } else if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("hire")) {
        return "You can reach Nimesh via the Contact section below, or email directly using the link!";
    } else if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
        return "Hello there! How can I assist you regarding Nimesh's portfolio and projects?";
    } else {
        return "Thank you for reaching out! I'm a simple portfolio assistant. You can ask me about Nimesh's 'name', 'skills', 'projects', 'education', or 'contact' details!";
    }
}

// Message Send Logic
function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (text !== "") {
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user-message");
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.classList.add("message", "bot-message");
            botMsg.textContent = getAIResponse(text);
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
}

// Event Listeners for Send
if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}
