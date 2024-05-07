import type { Shape } from "@appModules/editor/model/shapes/shape"

type Args = {
    context: CanvasRenderingContext2D | null | undefined
    startX: number
    startY: number
    currentX: number
    currentY: number
    ShapeClass: new (...args: ConstructorParameters<typeof Shape>) => Shape
    fillColor: string
    strokeColor?: string
    strokeSize: number
}

export const drawShape = ({
    context,
    startX,
    startY,
    currentX,
    currentY,
    ShapeClass,
    fillColor,
    strokeColor = fillColor,
    strokeSize,
}: Args) => {
    if (!context) return

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor

    context.beginPath()

    context.lineWidth = strokeSize

    new ShapeClass(context, startX, startY, currentX, currentY).draw()

    context.fill()
    if (strokeSize) context.stroke()

    context.closePath()
}
