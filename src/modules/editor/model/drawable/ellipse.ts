import { Shape } from "./shape"

export class Ellipse extends Shape {
    protected drawShape() {
        const startX = Math.min(this.startX, this.currentX)
        const endX = Math.max(this.startX, this.currentX)
        const startY = Math.min(this.startY, this.currentY)
        const endY = Math.max(this.startY, this.currentY)

        const radiusX = (endX - startX) / 2
        const radiusY = (endY - startY) / 2
        const centerX = startX + radiusX
        const centerY = startY + radiusY

        this.context.ellipse(
            centerX,
            centerY,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2,
        )
    }
}
