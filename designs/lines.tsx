import Random from 'canvas-sketch-util/random'
import { useEffect, useRef } from 'react'
import { canvasSize } from '../utils/canvas'

const { width, height } = canvasSize

export const Lines = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        console.log('effect')
        const random = Random.createRandom(props.sha)
        const canvas = canvasRef.current

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        ctx.save()

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
        ctx.fill()
        ctx.fillStyle = 'black'

        const grid = props.title.length
        for (let line = 0; line < grid; line++) {
            for (let step = 0; step < grid; step++) {
                const rectSize = random.range(2, height / grid)
                const centerX = random.range(width / 4, width - width / 4)
                const centerY = random.range(height / 4, height - height / 4)

                ctx.strokeRect(centerX - (rectSize / 2), centerY - (rectSize / 2), rectSize, rectSize)
            }
        }
        ctx.restore()

    }, [])

    return (
        <canvas ref={canvasRef} width={width} height={height} />
    )
}