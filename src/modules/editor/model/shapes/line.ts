import { Shape } from "./shape"

export class Line extends Shape {
    public draw() {
        this.context.moveTo(this.startX, this.startY)
        this.context.lineTo(this.currentX, this.currentY)
    }
}
