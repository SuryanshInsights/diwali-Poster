const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4.5 + 1.2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.size = Math.random() * 2.5 + 1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vx *= 0.985; this.vy = this.vy * 0.985 + 0.035;
    this.alpha -= 0.012;
  }
  draw() {
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function createFirework(x, y) {
  const colors = ["#ffcf33", "#ff4d9d", "#35e6ff", "#ffffff", "#ff8733", "#b58cff"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 65; i++) particles.push(new Particle(x, y, color));
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of particles) { p.update(); p.draw(); }
  particles = particles.filter(p => p.alpha > 0);
  requestAnimationFrame(animate);
}
animate();

// Fireworks start automatically as soon as the page loads.
function randomFirework() {
  createFirework(50 + Math.random() * (innerWidth - 100),
                 35 + Math.random() * innerHeight * 0.48);
}
setTimeout(randomFirework, 250);
setInterval(randomFirework, 950);

document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("greeting").textContent =
    "🪔 Happy Diwali! May your dreams come true! ❤️";
  for (let i = 0; i < 5; i++) {
    createFirework(Math.random() * innerWidth, Math.random() * innerHeight * 0.55);
  }
});
