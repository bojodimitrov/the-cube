class Ball {
    constructor(defaultLocation, size) {
        this.currentLocation = defaultLocation;
        this.ball = new Sphere(this.currentLocation, size);
        this.ball.color = [153 / 255, 100 / 255, 255 / 255];
        this.inertia = [0, 0]
    }

    draw() {
        this.ball.draw();
    }

    collide(upcomingMovement, borders, objects) {
        upcomingMovement = Intersector.northBorder(upcomingMovement, borders, this.currentLocation);
        upcomingMovement = Intersector.eastBorder(upcomingMovement, borders, this.currentLocation);
        upcomingMovement = Intersector.westBorder(upcomingMovement, borders, this.currentLocation);
        upcomingMovement = Intersector.southBorder(upcomingMovement, borders, this.currentLocation);
        upcomingMovement = Intersector.objects(upcomingMovement, objects, this.currentLocation)
        return upcomingMovement;
    }

    update(direction, borders, objects) {
        var updatedDirection = [direction[0] + this.inertia[0], direction[1] + this.inertia[1]]
        var nextBallPositions = this.collide(updatedDirection, borders, objects)
        this.currentLocation[0] += nextBallPositions[0];
        this.currentLocation[1] += nextBallPositions[1];
        if (nextBallPositions[0] == 0) {
            this.inertia[0] = -this.inertia[0] / 2;
        } else {
            this.inertia[0] += direction[0] / 20;
        }
        if (nextBallPositions[1] == 0) {
            this.inertia[1] = 0;
        } else {
            this.inertia[1] += direction[1] / 32;
        }
        this.ball.center = this.currentLocation;
        this.ball.color = [153 / 255, 100 / 255, 255 / 255];
    }

    getLocation() {
        return this.currentLocation;
    }
}


class Intersector {
    static objects(upcomingMovement, objects, ballCoords) {
        var nextBallCoords = [
            ballCoords[0] + upcomingMovement[0],
            ballCoords[1] + upcomingMovement[1]
        ]
        for (var i = 0; i < objects.length; i++) {
            upcomingMovement = this.collideObjectNorthWall(objects[i], ballCoords, nextBallCoords, upcomingMovement);
            upcomingMovement = this.collideObjectSouthWall(objects[i], ballCoords, nextBallCoords, upcomingMovement);
            upcomingMovement = this.collideObjectWestWall(objects[i], ballCoords, nextBallCoords, upcomingMovement);
            upcomingMovement = this.collideObjectEastWall(objects[i], ballCoords, nextBallCoords, upcomingMovement);
        }
        return upcomingMovement;
    }

    static collideObjectNorthWall(object, ballCoords, nextBallCoords, upcomingMovement) {
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, object["north"][0], object["north"][1]
        );
        if (result.onFirstLine && result.onSecondLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        if (ballCoords[0] >= object["north"][0][0] && ballCoords[0] <= object["north"][1][0] &&
            ballCoords[1] == object["north"][0][1] &&
            upcomingMovement[1] < 0) {
            return [upcomingMovement[0], 0];
        }
        return upcomingMovement;
    }

    static collideObjectSouthWall(object, ballCoords, nextBallCoords, upcomingMovement) {
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, object["south"][0], object["south"][1]
        );
        if (result.onFirstLine && result.onSecondLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        if (ballCoords[0] >= object["south"][0][0] && ballCoords[0] <= object["south"][1][0] &&
            ballCoords[1] == object["south"][0][1] &&
            upcomingMovement[1] > 0) {
            return [upcomingMovement[0], 0];
        }
        return upcomingMovement;
    }

    static collideObjectWestWall(object, ballCoords, nextBallCoords, upcomingMovement) {
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, object["west"][0], object["west"][1]
        );
        if (result.onFirstLine && result.onSecondLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        if (ballCoords[1] >= object["west"][0][1] && ballCoords[1] <= object["west"][1][1] &&
            ballCoords[0] == object["west"][0][0] &&
            upcomingMovement[0] > 0) {
            return [0, upcomingMovement[1]];
        }
        return upcomingMovement;
    }

    static collideObjectEastWall(object, ballCoords, nextBallCoords, upcomingMovement) {
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, object["east"][0], object["east"][1]
        );
        if (result.onFirstLine && result.onSecondLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        if (ballCoords[1] >= object["east"][0][1] && ballCoords[1] <= object["east"][1][1] &&
            ballCoords[0] == object["east"][0][0] &&
            upcomingMovement[0] < 0) {
            return [0, upcomingMovement[1]];
        }
        return upcomingMovement;
    }

    static northBorder(upcomingMovement, border, ballCoords) {
        var nextBallCoords = [
            ballCoords[0] + upcomingMovement[0],
            ballCoords[1] + upcomingMovement[1]
        ]
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, [-border / 2, border / 2], [border / 2, border / 2]
        );
        if (Math.round(ballCoords[1]) >= border / 2 && upcomingMovement[1] > 0) {
            return [upcomingMovement[0], 0];
        }
        if (result.onFirstLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        return upcomingMovement;
    }

    static westBorder(upcomingMovement, border, ballCoords) {
        var nextBallCoords = [
            ballCoords[0] + upcomingMovement[0],
            ballCoords[1] + upcomingMovement[1]
        ]
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, [-border / 2, border / 2], [-border / 2, -border / 2]
        );
        if (Math.round(ballCoords[0]) <= -border / 2 && upcomingMovement[0] < 0) {
            return [0, upcomingMovement[1]]
        }
        if (result.onFirstLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        return upcomingMovement;
    }

    static eastBorder(upcomingMovement, border, ballCoords) {
        var nextBallCoords = [
            ballCoords[0] + upcomingMovement[0],
            ballCoords[1] + upcomingMovement[1]
        ]
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, [border / 2, border / 2], [border / 2, -border / 2]
        );
        if (Math.round(ballCoords[0]) >= border / 2 && upcomingMovement[0] > 0) {
            return [0, upcomingMovement[1]]
        }
        if (result.onFirstLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        return upcomingMovement;
    }

    static southBorder(upcomingMovement, border, ballCoords) {
        var nextBallCoords = [
            ballCoords[0] + upcomingMovement[0],
            ballCoords[1] + upcomingMovement[1]
        ]
        var result = this.checkLineIntersection(
            ballCoords, nextBallCoords, [-border / 2, -border / 2], [border / 2, -border / 2]
        );
        if (Math.round(ballCoords[1]) <= -border / 2 && upcomingMovement[1] < 0) {
            return [upcomingMovement[0], 0];
        }
        if (result.onFirstLine) {
            return [result.x - ballCoords[0], result.y - ballCoords[1]];
        }
        return upcomingMovement;
    }

    static checkLineIntersection(firstLineStart, firstLineEnd, secondLineStart, secondLineEnd) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
            x: 0,
            y: 0,
            onFirstLine: false,
            onSecondLine: false
        };
        denominator = ((secondLineEnd[1] - secondLineStart[1]) * (firstLineEnd[0] - firstLineStart[0])) - ((secondLineEnd[0] - secondLineStart[0]) * (firstLineEnd[1] - firstLineStart[1]));
        if (denominator == 0) {
            return result;
        }
        a = firstLineStart[1] - secondLineStart[1];
        b = firstLineStart[0] - secondLineStart[0];
        numerator1 = ((secondLineEnd[0] - secondLineStart[0]) * a) - ((secondLineEnd[1] - secondLineStart[1]) * b);
        numerator2 = ((firstLineEnd[0] - firstLineStart[0]) * a) - ((firstLineEnd[1] - firstLineStart[1]) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = firstLineStart[0] + (a * (firstLineEnd[0] - firstLineStart[0]));
        result.y = firstLineStart[1] + (a * (firstLineEnd[1] - firstLineStart[1]));
        /*
                // it is worth noting that this should be the same as:
                x = secondLineStart[0] + (b * (secondLineEnd[0] - secondLineStart[0]));
                y = secondLineStart[0] + (b * (secondLineEnd[1] - secondLineStart[1]));
                */
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            result.onFirstLine = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            result.onSecondLine = true;
        }
        // if line1 and line2 are segments, they intersect if both of the above are true
        return result;
    };
}