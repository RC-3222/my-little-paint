import { Shape } from "./shape"

export class Rectangle extends Shape {
    protected drawShape() {
        const startX = Math.min(this.startX, this.currentX)
        const endX = Math.max(this.startX, this.currentX)
        const startY = Math.min(this.startY, this.currentY)
        const endY = Math.max(this.startY, this.currentY)

        const width = endX - startX
        const height = endY - startY

        this.context.rect(startX, startY, width, height)

        /*this.context.moveTo(this.startX, this.startY)
        this.context.lineTo(this.currentX, this.startY)
        this.context.lineTo(this.currentX, this.currentY)
        this.context.lineTo(this.startX, this.currentY)
        this.context.lineTo(this.startX, this.startY)*/
    }
}
