
import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { height, width } = canvasSize

export const Pixels = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      const random = Random.createRandom(props.sha)
      const canvas = canvasRef.current
      
    const ctx = canvas.getContext('2d')


    const findClosest = (x, y, points) => {
      let closestDist = 100000000;
      let closestPoint;
      points.forEach((p) => {
          const dist = (p.x - x)^2 + (p.y - y)^2;
          if (dist < closestDist) {
              closestDist = dist;
              closestPoint = p;
          }
      })
      return closestPoint;
    }

    const generatePoints = (count) => {
      const points = [];
      for (let col = 0; col < count; col++) {
          for (let row = 0; row < count; row++) {
            const px = row / (count - 1)
            const py = col / (count - 1)
            const value = random.noise2D(px, py)

            points.push({px, py, value})
          }
      }

      return points;
    }

    const draw = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
      ctx.fill()
      ctx.fillStyle = 'black'
        ctx.globalAlpha = 0.05
        const margin = height * 0.1
        const count = 40
        const density = 0.5
        const points = generatePoints(count);
        const shuffledPoints = random.shuffle(points)
        const start = shuffledPoints.pop();
        points.forEach(({px, py, value}) => {
          if (value < density && value > 0-density) {
            const rectSize = Math.abs(value * height * 0.2)
            const x = lerp(0, width, px)
            const y = lerp(0, height, py)
            ctx.fillRect(x, y, rectSize, rectSize)
          }
        })
    }

    draw()
    }, [])

    return (
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    )
}