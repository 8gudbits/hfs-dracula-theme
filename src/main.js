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

// Create stars
const stars = []
for (let i = 0; i < starsAmount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100), // Keep stars above ground area
    r: Math.random() * (maxRadius - minRadius) + minRadius,
    // Add subtle movement properties
    dx: (Math.random() - 0.5) * 0.1, // Very slow horizontal movement
    dy: (Math.random() - 0.5) * 0.1, // Very slow vertical movement
    opacity: Math.random() * 0.5 + 0.5, // Slight opacity variation
  })
}

function drawGround() {
  const groundHeight = 80 // Slightly taller ground
  const groundY = canvas.height - groundHeight

  ctx.fillStyle = "rgb(14, 13, 17)"

  // Create more realistic wavy ground path
  ctx.beginPath()
  ctx.moveTo(0, canvas.height)

  // More waves with varied amplitudes for natural look
  const waveCount = 16 // More waves for detail
  const waveWidth = canvas.width / waveCount

  for (let i = 0; i <= waveCount; i++) {
    const x = i * waveWidth
    // Mix different sine waves for organic variation
    const wave1 = Math.sin(i * 0.8) * 15 // Primary wave
    const wave2 = Math.sin(i * 2.3) * 6 // Secondary detail
    const wave3 = Math.sin(i * 5.7) * 3 // Tertiary detail
    const y = groundY + wave1 + wave2 + wave3

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      // Use more control points for smoother curves
      const prevX = (i - 1) * waveWidth
      const prevY =
        groundY +
        Math.sin((i - 1) * 0.8) * 15 +
        Math.sin((i - 1) * 2.3) * 6 +
        Math.sin((i - 1) * 5.7) * 3

      const cpX = prevX + waveWidth * 0.5
      const cpY =
        groundY +
        Math.sin((i - 0.5) * 0.8) * 15 +
        Math.sin((i - 0.5) * 2.3) * 6 +
        Math.sin((i - 0.5) * 5.7) * 3

      ctx.quadraticCurveTo(cpX, cpY, x, y)
    }
  }

  // Complete the path
  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineTo(0, canvas.height)
  ctx.closePath()
  ctx.fill()

  // Add some subtle texture to the ground
  ctx.fillStyle = "rgba(12, 11, 15, 0.3)"
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = groundY + Math.random() * 30
    const size = Math.random() * 3 + 1
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function animate() {
  // Create gradient background (only for sky portion)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 60)
  gradient.addColorStop(0, "rgb(26, 23, 38)") // Top color
  gradient.addColorStop(1, "rgb(85, 74, 138)") // Bottom color

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Update and draw each star
  stars.forEach((star) => {
    // Update position
    star.x += star.dx
    star.y += star.dy

    // Wrap around edges (but keep above ground)
    if (star.x < 0) star.x = canvas.width
    if (star.x > canvas.width) star.x = 0
    if (star.y < 0) star.y = canvas.height - 100
    if (star.y > canvas.height - 100) star.y = 0

    // Draw star with the new color
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(226, 225, 232, ${star.opacity})`
    ctx.fill()
  })

  // Draw the ground on top
  drawGround()

  requestAnimationFrame(animate)
}

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Start animation
animate()

