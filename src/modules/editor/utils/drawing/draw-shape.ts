import type { Shape } from "@appModules/editor/model/drawable/shape"

type Args = {
    context: CanvasRenderingContext2D | null | undefined
    startX: number
    startY: number
    currentX: number
    currentY: number
    ShapeClass: new (...args: ConstructorParameters<typeof Shape>) => Shape
    fillColor: string
    strokeColor?: string
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
}: Args) => {
    if (!context) return

    new ShapeClass(
        context,
        startX,
        startY,
        currentX,
        currentY,
        fillColor,
        strokeColor,
    ).draw()
}
