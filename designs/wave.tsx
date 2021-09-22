import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { width, height } = canvasSize

export const Wave = (props) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const random = Random.createRandom(props.sha)
    const canvas = canvasRef.current

    const ctx = canvas.getContext('2d')
    ctx.save()

    const clear = () => {
      ctx.clearRect(0, 0, width, height)
    }

    clear()
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)
      ctx.fill()
      ctx.fillStyle = 'white'
      const lines = 50
      const steps = 50
      for (let line = 0; line < lines; line++) {
        const p = line / (lines - 1)
        const startX = 0
        const endX = width
        const y = lerp(0, height, p)
        ctx.beginPath()
        const pingPong = (0 - Math.cos(lerp(0, Math.PI * 2, p)) + 1)/2

        for (let step = 0; step < steps; step++) {
          const stepP = step / (steps - 1)
          const n = random.noise2D(stepP, p)
          const lineX = lerp(startX, endX, stepP)
          const lineY = y + n * (height / 4) * pingPong
          ctx.lineTo(lineX, lineY)
        }
        ctx.stroke()
      }
      ctx.restore()

  }, [])

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}