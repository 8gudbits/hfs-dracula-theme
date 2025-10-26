const cfg = HFS.getPluginConfig()
let starsAmount = cfg.number_of_background_stars || 30
let minRadius = cfg.smallest_star_size_in_px || 1
let maxRadius = cfg.largest_star_size_in_px || 2

const canvas = document.createElement("canvas")
canvas.id = "sky"
canvas.style.position = "fixed"
canvas.style.top = "0"
canvas.style.left = "0"
canvas.style.width = "100vw"
canvas.style.height = "100vh"
canvas.style.zIndex = "-1"
canvas.style.pointerEvents = "none"
document.body.insertBefore(canvas, document.body.firstChild)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")

// Create stars with positions and movement properties
const stars = []
for (let i = 0; i < starsAmount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * (maxRadius - minRadius) + minRadius,
    // Add subtle movement properties
    dx: (Math.random() - 0.5) * 0.1, // Very slow horizontal movement
    dy: (Math.random() - 0.5) * 0.1, // Very slow vertical movement
    opacity: Math.random() * 0.5 + 0.5, // Slight opacity variation
  })
}

function animate() {
  ctx.fillStyle = "rgb(14, 13, 17)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Update and draw each star
  stars.forEach((star) => {
    // Update position
    star.x += star.dx
    star.y += star.dy

    // Wrap around edges
    if (star.x < 0) star.x = canvas.width
    if (star.x > canvas.width) star.x = 0
    if (star.y < 0) star.y = canvas.height
    if (star.y > canvas.height) star.y = 0

    // Draw star
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
    ctx.fill()
  })

  requestAnimationFrame(animate)
}

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Start animation
animate()

