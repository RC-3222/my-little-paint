export abstract class Shape {
    constructor(
        protected context: CanvasRenderingContext2D,
        protected startX: number,
        protected startY: number,
        protected currentX: number,
        protected currentY: number,
        protected strokeColor: string,
        protected fillColor: string,
    ) {}

    public draw() {
        this.context.fillStyle = this.fillColor
        this.context.strokeStyle = this.strokeColor

        this.context.beginPath()

        this.drawShape()

        this.context.stroke()
        this.context.fill()

        this.context.closePath()
    }

    protected drawShape() {
        throw new Error("Not implemented")
    }
}
