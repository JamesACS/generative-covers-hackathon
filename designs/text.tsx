import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { width, height } = canvasSize

export const Text = (props) => {
  const canvasRef = useRef(null)


  useEffect(() => {
    const random = Random.createRandom(props.sha)
    const canvas = canvasRef.current

    const ctx = canvas.getContext('2d')
    ctx.save()

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.save()

    ctx.font = `bold 40px monospace`;
    ctx.textBaseline = 'baseline'
    ctx.textAlign = 'center'

    const text = props.title + ''

    const lines = random.rangeFloor(150, 200)
    for (let line = 0; line < lines; line++) {
        ctx.save()
        const p = line / (lines - 1)
        ctx.globalAlpha = lerp(0.1, 0, p)
        ctx.translate(width / 2, height / 2)
        ctx.rotate(lerp(0, Math.PI, p))
        ctx.fillText(text, 0, 0);
        ctx.restore()
    }
  }, [])

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}