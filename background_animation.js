// backgroundAnimation.js

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration for HoloWorld
const holoColors = ["#0f0c29", "#302b63", "#24243e"];
const holograms = [];
const hologramCount = 50;

// Utility function to create a gradient background
function drawHoloBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    holoColors.forEach((color, index) => {
        gradient.addColorStop(index / (holoColors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to create holographic elements
function createHolograms() {
    for (let i = 0; i < hologramCount; i++) {
        holograms.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 50 + 10,
            glow: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.8)`
        });
    }
}

// Function to draw holographic elements
function drawHolograms() {
    holograms.forEach((holo) => {
        ctx.beginPath();
        ctx.arc(holo.x, holo.y, holo.size, 0, Math.PI * 2);
        ctx.fillStyle = holo.color;
        ctx.shadowBlur = holo.glow * 10;
        ctx.shadowColor = holo.color;
        ctx.fill();
    });
}

// Update holographic elements
function updateHolograms() {
    holograms.forEach((holo) => {
        holo.x += holo.speedX;
        holo.y += holo.speedY;

        // Bounce off edges
        if (holo.x - holo.size < 0 || holo.x + holo.size > canvas.width) {
            holo.speedX *= -1;
        }
        if (holo.y - holo.size < 0 || holo.y + holo.size > canvas.height) {
            holo.speedY *= -1;
        }
    });
}

// Animation loop
function animateHoloWorld() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHoloBackground();
    drawHolograms();
    updateHolograms();
    requestAnimationFrame(animateHoloWorld);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    holograms.length = 0; // Clear existing holograms
    createHolograms();
});

// Initialize HoloWorld
createHolograms();
animateHoloWorld();
