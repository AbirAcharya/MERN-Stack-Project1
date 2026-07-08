import React, { useEffect, useRef } from 'react'

const Starfield = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas size to cover the entire page
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Generate stars
    const numStars = 150
    const stars = []

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3, // size variations
        // Speed variation (slight drift downward)
        speedY: Math.random() * 0.2 + 0.05, 
        // Twinkle speed variation
        alpha: Math.random(),
        alphaSpeed: Math.random() * 0.02 + 0.005,
      })
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach((star) => {
        // Handle Twinkle effect (fading opacity up and down)
        star.alpha += star.alphaSpeed
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.alphaSpeed = -star.alphaSpeed // reverse fade direction
        }

        // Handle Drift effect (slow movement)
        star.y += star.speedY
        if (star.y > canvas.height) {
          star.y = 0 // loop star back to top if it leaves screen
          star.x = Math.random() * canvas.width
        }

        // Draw the star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default Starfield