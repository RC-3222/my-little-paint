type Args = {
    startX?: number
    startY?: number
    currentX: number
    currentY: number
    context: CanvasRenderingContext2D | null | undefined
    brushColor: string
    brushSize: number
}

export function drawBrush({
    startX,
    startY,
    currentX,
    currentY,
    context,
    brushColor,
    brushSize,
}: Args) {
    if (!context) return

    context.fillStyle = brushColor
    context.strokeStyle = brushColor

    context.beginPath()
    context.arc(currentX, currentY, brushSize, 0, 2 * Math.PI)
    context.fill()

    if (startX && startY) {
        context.beginPath()
        context.moveTo(startX, startY)
        context.lineTo(currentX, currentY)
        context.lineWidth = brushSize * 2
        context.stroke()
    }
}
