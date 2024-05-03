import { Shape } from "./shape"

export class Star extends Shape {
    protected drawShape() {
        const radiusX = (this.currentX - this.startX) / 2
        const radiusY = (this.currentY - this.startY) / 2
        const centerX = this.startX + radiusX
        const centerY = this.startY + radiusY

        const outerRadius = Math.sqrt(
            Math.pow(radiusX, 2) + Math.pow(radiusY, 2),
        )
        const innerRadius = outerRadius / 2

        const spikes = 5
        const step = Math.PI / spikes

        let x = centerX
        let y = centerY
        let rotation = (Math.PI / 2) * 3

        this.context.moveTo(centerX, centerY - outerRadius)
        for (let i = 0; i < spikes; i++) {
            x = centerX + Math.cos(rotation) * outerRadius
            y = centerY + Math.sin(rotation) * outerRadius
            this.context.lineTo(x, y)
            rotation += step

            x = centerX + Math.cos(rotation) * innerRadius
            y = centerY + Math.sin(rotation) * innerRadius
            this.context.lineTo(x, y)
            rotation += step
        }
        this.context.lineTo(centerX, centerY - outerRadius)
    }
}
