import { Shape } from "./shape"

export class Circle extends Shape {
    protected drawShape() {
        const radius = Math.sqrt(
            Math.pow(this.currentX - this.startX, 2) +
                Math.pow(this.currentY - this.startY, 2),
        )

        this.context.ellipse(
            this.startX,
            this.startY,
            radius,
            radius,
            0,
            0,
            Math.PI * 2,
        )
    }
}
