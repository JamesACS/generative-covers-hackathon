
import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { height, width } = canvasSize

export const HeartbeatGradient = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      const random = Random.createRandom(props.sha)
      const canvas = canvasRef.current
      
      const ctx = canvas.getContext('2d')

      ctx.save()

    const clear = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
      ctx.fill()
    }

    const draw = () => {
      const steps = width;
      const centerY = height/2
      clear()
      ctx.moveTo(0, centerY)
      ctx.lineWidth = width/steps
      for (let i = 0; i < steps; i++) {
        const px = i / (steps - 1)
        const x = lerp(0, width, px)
        const noise = random.noise1D(px * 2)
        const pingpong = (0 - Math.cos(lerp(0, Math.PI * 2, px)) + 1)/2
        const amplitude = 0.5 * height * noise * pingpong
        ctx.lineStyle = i % 2 ? 'red' : 'black'
        ctx.moveTo(x, centerY + amplitude)
        ctx.lineTo(x, centerY - amplitude)
        ctx.stroke()
      }
      ctx.restore()
    }

    draw()
    }, [])

    return (
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    )
}