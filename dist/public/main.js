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

const stars = []
for (let i = 0; i < starsAmount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100),
    r: Math.random() * (maxRadius - minRadius) + minRadius,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    opacity: Math.random() * 0.5 + 0.5,
  })
}

function drawGround() {
  const groundHeight = 80
  const groundY = canvas.height - groundHeight

  ctx.fillStyle = "rgb(14, 13, 17)"

  ctx.beginPath()
  ctx.moveTo(0, canvas.height)

  const waveCount = 16
  const waveWidth = canvas.width / waveCount

  for (let i = 0; i <= waveCount; i++) {
    const x = i * waveWidth
    const wave1 = Math.sin(i * 0.8) * 15
    const wave2 = Math.sin(i * 2.3) * 6
    const wave3 = Math.sin(i * 5.7) * 3
    const y = groundY + wave1 + wave2 + wave3

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
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

  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineTo(0, canvas.height)
  ctx.closePath()
  ctx.fill()

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
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 60)
  gradient.addColorStop(0, "rgb(26, 23, 38)")
  gradient.addColorStop(1, "rgb(85, 74, 138)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  stars.forEach((star) => {
    star.x += star.dx
    star.y += star.dy

    if (star.x < 0) star.x = canvas.width
    if (star.x > canvas.width) star.x = 0
    if (star.y < 0) star.y = canvas.height - 100
    if (star.y > canvas.height - 100) star.y = 0

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(226, 225, 232, ${star.opacity})`
    ctx.fill()
  })

  drawGround()
  requestAnimationFrame(animate)
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

animate()
