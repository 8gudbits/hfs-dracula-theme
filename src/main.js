// Load plugin configuration values from HFS
const cfg = HFS.getPluginConfig();

// Extract star rendering parameters from config, with fallback defaults
let starsAmount = cfg.number_of_background_stars || 30;
let minRadius = cfg.smallest_star_size_in_px || 1;
let maxRadius = cfg.largest_star_size_in_px || 2;

// Create a canvas element to serve as the background layer
const canvas = document.createElement("canvas");
canvas.id = "sky";

// Apply styling to position the canvas behind all other content
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

// Insert the canvas into the DOM before any other body content
document.body.insertBefore(canvas, document.body.firstChild);

// Set the canvas resolution to match the viewport dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the 2D drawing context for rendering shapes
const ctx = canvas.getContext("2d");

// Loop to draw each star with randomized position and size
for (let i = 0; i < starsAmount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const r = Math.random() * (maxRadius - minRadius) + minRadius;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

