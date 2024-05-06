export abstract class Shape {
    constructor(
        protected context: CanvasRenderingContext2D,
        protected startX: number,
        protected startY: number,
        protected currentX: number,
        protected currentY: number,
    ) {}

    public abstract draw(): void
}
