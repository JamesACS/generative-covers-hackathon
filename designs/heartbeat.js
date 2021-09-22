
import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { height, width } = canvasSize

export const Heartbeat = (props) => {
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
      const steps = 120;
      const centerY = height/2
      clear()
      ctx.moveTo(0, centerY)
      for (let i = 0; i < steps; i++) {
        const px = i / (steps - 1)
        const pnx = (i+1) / (steps -1)
        const x = lerp(0, width, px)
        const nx = lerp(0, width, pnx)
        const noise = random.noise1D(px * 2)
        const pingpong = (0 - Math.cos(lerp(0, Math.PI * 2, px)) + 1)/2
        const amplitude = height * noise * pingpong
        const cpY = i % 2 ?  centerY + amplitude : centerY - amplitude
        const cpX = (x + nx) / 2



        ctx.quadraticCurveTo(cpX, cpY, nx, centerY)
      }
      ctx.stroke()
      ctx.restore()
    }

    draw()
    }, [])

    return (
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    )
}