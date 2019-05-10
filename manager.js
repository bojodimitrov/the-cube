class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.objectContainer = [];
        this.border = 160;
        this.field = new Field([0, 0, -25], [this.border, this.border, 50])
        this.ball = new Ball([-70, 70, 1], 2)
        this.transformedMousePosX = 0;
        this.transformedMousePosY = 0;
    }

    loadEvents() {
        this.canvas.addEventListener("mousemove", (event) => {
            var _canvasCenterX = this.canvas.width / 2;
            var _canvasCenterY = this.canvas.height / 2;
            this.transformedMousePosX = (event.offsetX - _canvasCenterX) / 3.7;
            this.transformedMousePosY = (_canvasCenterY - event.offsetY) / 3.7;
        })
    }

    rotateView() {
        var direction = this.getDirection();
        rotateView([0, -0.1, 400], [0, 0, 0], [0, 0, 1], [-direction[0] * 20, direction[1] * 20, 0])
    }

    getDirection() {
        var directionX = (this.transformedMousePosX - this.ball.getLocation()[0]) / 50;
        var directionY = (this.transformedMousePosY - this.ball.getLocation()[1]) / 50;
        return [directionX, directionY];
    }

    updateBall() {
        var direction = this.getDirection();
        this.ball.update(direction, this.border, this.field.getEdges());
    }

    checkTarget() {
        var target = this.field.getTargetLocation();
        var ball = this.ball.getLocation();
        if (target[0] + 2 > ball[0] && target[0] - 2 < ball[0] &&
            target[1] - 2 < ball[1] && target[1] + 2 > ball[1]) {
            alert("You win!");
            this.ball.currentLocation = [-70, 70, 0];
        }
    }

    draw() {
        this.updateBall()
        this.ball.draw();
        this.field.draw();
    }
}