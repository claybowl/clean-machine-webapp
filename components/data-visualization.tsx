"use client"

import { useEffect, useRef } from "react"

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      return { width: rect.width, height: rect.height }
    }

    const { width, height } = setCanvasDimensions()

    // Animation variables
    let animationFrameId: number
    let time = 0
    const centerX = width / 2
    const centerY = height / 2

    // Colors
    const darkBlue = "#0A1929"
    const mediumBlue = "#13315C"
    const lightBlue = "#134074"
    const accentBlue = "#0076FF"
    const white = "#FFFFFF"
    const gold = "#D4AF37"
    const teal = "#00CCCC"

    // Particle system for anti-gravity effect
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      trail: { x: number; y: number }[]
      trailLength: number
      type: string

      constructor(x: number, y: number, type: string) {
        this.x = x
        this.y = y
        this.type = type

        if (type === "rocket") {
          this.size = Math.random() * 3 + 2
          this.speedX = (Math.random() - 0.5) * 0.5
          this.speedY = -Math.random() * 3 - 2
          this.color = Math.random() > 0.7 ? gold : teal
          this.opacity = Math.random() * 0.7 + 0.3
          this.trail = []
          this.trailLength = Math.floor(Math.random() * 10) + 5
        } else if (type === "star") {
          this.size = Math.random() * 2 + 0.5
          this.speedX = (Math.random() - 0.5) * 0.2
          this.speedY = -Math.random() * 0.5 - 0.1
          this.color = white
          this.opacity = Math.random() * 0.5 + 0.3
          this.trail = []
          this.trailLength = 0
        } else if (type === "floater") {
          this.size = Math.random() * 15 + 10
          this.speedX = (Math.random() - 0.5) * 0.3
          this.speedY = -Math.random() * 0.4 - 0.2
          this.color = accentBlue
          this.opacity = Math.random() * 0.2 + 0.1
          this.trail = []
          this.trailLength = 0
        }
      }

      update() {
        // Add current position to trail
        if (this.trailLength > 0) {
          this.trail.push({ x: this.x, y: this.y })
          if (this.trail.length > this.trailLength) {
            this.trail.shift()
          }
        }

        // Update position
        this.x += this.speedX
        this.y += this.speedY

        // Accelerate upward for rocket particles to simulate takeoff
        if (this.type === "rocket") {
          this.speedY -= 0.01
        }

        // Reset if off screen
        if (this.y < -50 || this.x < -50 || this.x > width + 50) {
          if (this.type === "rocket") {
            this.x = Math.random() * width
            this.y = height + 10
            this.speedY = -Math.random() * 3 - 2
            this.trail = []
          } else if (this.type === "star") {
            this.x = Math.random() * width
            this.y = height + 10
            this.speedY = -Math.random() * 0.5 - 0.1
          } else if (this.type === "floater") {
            this.x = Math.random() * width
            this.y = height + 20
            this.speedY = -Math.random() * 0.4 - 0.2
          }
        }
      }

      draw() {
        // Draw trail
        if (this.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(this.trail[0].x, this.trail[0].y)

          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
          }

          ctx.strokeStyle = `rgba(${this.color === gold ? "212, 175, 55" : "0, 204, 204"}, ${this.opacity * 0.5})`
          ctx.lineWidth = this.size / 2
          ctx.stroke()
        }

        // Draw particle
        if (this.type === "floater") {
          // Draw circular gradient for floaters
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
          gradient.addColorStop(0, `rgba(0, 118, 255, ${this.opacity + 0.1})`)
          gradient.addColorStop(1, `rgba(0, 118, 255, 0)`)

          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        } else {
          // Draw regular particles
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

          if (this.type === "star") {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
          } else {
            ctx.fillStyle =
              this.color === gold ? `rgba(212, 175, 55, ${this.opacity})` : `rgba(0, 204, 204, ${this.opacity})`
          }

          ctx.fill()
        }
      }
    }

    // Create particles
    const particles: Particle[] = []

    // Rocket trail particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(Math.random() * width, height + Math.random() * 50, "rocket"))
    }

    // Background stars
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(Math.random() * width, Math.random() * height, "star"))
    }

    // Floating elements
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(Math.random() * width, height + Math.random() * 50 + i * 20, "floater"))
    }

    // Draw spacecraft/rocket
    const drawSpacecraft = (x: number, y: number, size: number, time: number) => {
      const rocketHeight = size * 3
      const rocketWidth = size * 1.5

      // Save context
      ctx.save()
      ctx.translate(x, y)

      // Add slight oscillation
      ctx.rotate(Math.sin(time * 0.5) * 0.05)

      // Rocket body
      const gradient = ctx.createLinearGradient(0, -rocketHeight / 2, 0, rocketHeight / 2)
      gradient.addColorStop(0, "#FFFFFF")
      gradient.addColorStop(0.5, "#DDDDDD")
      gradient.addColorStop(1, "#AAAAAA")

      ctx.beginPath()
      ctx.moveTo(0, -rocketHeight / 2)
      ctx.lineTo(rocketWidth / 2, rocketHeight / 4)
      ctx.lineTo(rocketWidth / 2, rocketHeight / 2)
      ctx.lineTo(-rocketWidth / 2, rocketHeight / 2)
      ctx.lineTo(-rocketWidth / 2, rocketHeight / 4)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 1
      ctx.stroke()

      // Rocket nose
      ctx.beginPath()
      ctx.moveTo(-rocketWidth / 2, rocketHeight / 4)
      ctx.lineTo(0, -rocketHeight / 2)
      ctx.lineTo(rocketWidth / 2, rocketHeight / 4)
      ctx.closePath()
      ctx.fillStyle = accentBlue
      ctx.fill()
      ctx.stroke()

      // Rocket fins
      ctx.beginPath()
      ctx.moveTo(-rocketWidth / 2, rocketHeight / 3)
      ctx.lineTo(-rocketWidth, rocketHeight / 2)
      ctx.lineTo(-rocketWidth / 2, rocketHeight / 2)
      ctx.closePath()
      ctx.fillStyle = gold
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(rocketWidth / 2, rocketHeight / 3)
      ctx.lineTo(rocketWidth, rocketHeight / 2)
      ctx.lineTo(rocketWidth / 2, rocketHeight / 2)
      ctx.closePath()
      ctx.fillStyle = gold
      ctx.fill()
      ctx.stroke()

      // Rocket window
      ctx.beginPath()
      ctx.arc(0, 0, size / 3, 0, Math.PI * 2)
      ctx.fillStyle = teal
      ctx.fill()
      ctx.strokeStyle = "#333333"
      ctx.stroke()

      // Rocket flame
      const flameHeight = rocketHeight * (0.5 + Math.sin(time * 10) * 0.2)

      const flameGradient = ctx.createLinearGradient(0, rocketHeight / 2, 0, rocketHeight / 2 + flameHeight)
      flameGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
      flameGradient.addColorStop(0.3, "rgba(255, 200, 0, 0.8)")
      flameGradient.addColorStop(0.8, "rgba(255, 100, 0, 0.4)")
      flameGradient.addColorStop(1, "rgba(255, 50, 0, 0)")

      ctx.beginPath()
      ctx.moveTo(-rocketWidth / 4, rocketHeight / 2)
      ctx.quadraticCurveTo(0, rocketHeight / 2 + flameHeight * 1.5, rocketWidth / 4, rocketHeight / 2)
      ctx.fillStyle = flameGradient
      ctx.fill()

      // Restore context
      ctx.restore()
    }

    // Draw floating text
    const drawText = () => {
      // Calculate vertical position with smooth oscillation
      const yOffset = Math.sin(time * 0.5) * 10

      // Draw main title
      ctx.font = "bold 24px Arial"
      ctx.textAlign = "center"
      ctx.fillStyle = white
      ctx.fillText("TAKEOFF WITH CURVE AI SOLUTIONS", centerX, centerY - 60 + yOffset)

      // Draw subtitle
      ctx.font = "18px Arial"
      ctx.fillStyle = gold
      ctx.fillText("THE ANTI-GRAVITY FOR BUSINESS", centerX, centerY - 30 + yOffset)

      // Draw tagline
      ctx.font = "16px Arial"
      ctx.fillStyle = teal
      ctx.fillText("BREAKAWAY WITH NO RESISTANCE", centerX, centerY + yOffset)
    }

    // Draw curved path
    const drawCurvedPath = () => {
      const pathWidth = width * 0.8
      const pathHeight = height * 0.6
      const pathX = width * 0.1
      const pathY = height * 0.3

      // Draw curved path
      ctx.beginPath()
      ctx.moveTo(pathX, pathY + pathHeight)

      // Create a curved path that goes up
      ctx.bezierCurveTo(
        pathX + pathWidth * 0.3,
        pathY + pathHeight * 0.8,
        pathX + pathWidth * 0.7,
        pathY + pathHeight * 0.3,
        pathX + pathWidth,
        pathY,
      )

      // Style the path
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 + Math.sin(time) * 0.1})`
      ctx.lineWidth = 2
      ctx.stroke()

      // Add dots along the path
      const dotCount = 12
      for (let i = 0; i < dotCount; i++) {
        const t = i / (dotCount - 1)

        // Parametric bezier curve formula
        const u = 1 - t
        const x =
          u * u * u * pathX +
          3 * u * u * t * (pathX + pathWidth * 0.3) +
          3 * u * t * t * (pathX + pathWidth * 0.7) +
          t * t * t * (pathX + pathWidth)

        const y =
          u * u * u * (pathY + pathHeight) +
          3 * u * u * t * (pathY + pathHeight * 0.8) +
          3 * u * t * t * (pathY + pathHeight * 0.3) +
          t * t * t * pathY

        // Draw dot
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? gold : i % 3 === 1 ? teal : white
        ctx.fill()
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, darkBlue)
      gradient.addColorStop(1, "#000000")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw stars (small dots in background)
      for (let i = 0; i < 100; i++) {
        const x = (i * 17) % width
        const y = (i * 23) % height
        const size = Math.sin(time + i) * 0.5 + 1

        ctx.beginPath()
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
      }

      // Draw curved path
      drawCurvedPath()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw spacecraft
      drawSpacecraft(centerX, centerY + 50, 20, time)

      // Draw text
      drawText()

      // Update time
      time += 0.01

      // Continue animation
      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle window resize
    const handleResize = () => {
      const { width, height } = setCanvasDimensions()
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[332px] rounded-lg" // Adjusted to 15% smaller than previous 390px
      style={{
        background: "linear-gradient(135deg, #0A1929 0%, #000000 100%)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        border: "1px solid #D4AF37", // Gold border
        transform: "scale(0.94)", // Reduced scale by 15%
        margin: "3% auto", // Reduced margin to match smaller size
      }}
    />
  )
}
