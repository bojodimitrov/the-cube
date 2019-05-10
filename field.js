class Field {
    constructor(location, size) {
        this.field = new Cuboid(location, size);
        this.field.color = [0.5, 0.5, 0.5];
        this.addBuildings();
        this.addTarget();
    }

    addTarget() {
        this.targetLocation = [70, -70, 0];
        this.target = new Torus(this.targetLocation, 1, 4, 1);
        this.target.color = [1, 0, 0];
    }

    getTargetLocation() {
        return this.targetLocation;
    }

    addBuildings() {
        this.buildings = [];
        this.edges = [];
        this.buildings.push(
            new Cuboid([30, 0, 0], [10, 10, 40])
        )
        this.edges.push({
            "north": [
                [25, 5],
                [35, 5]
            ],
            "south": [
                [25, -5],
                [35, -5]
            ],
            "east": [
                [35, -5],
                [35, 5]
            ],
            "west": [
                [25, -5],
                [25, 5]
            ],
        })
        this.buildings[0].color = [0.8, 0.1, 0]

        this.buildings.push(
            new Cuboid([0, 60, 0], [120, 6, 30])
        )
        this.edges.push({
            "north": [
                [-60, 63],
                [60, 63]
            ],
            "south": [
                [-60, 57],
                [60, 57]
            ],
            "east": [
                [60, 57],
                [60, 63]
            ],
            "west": [
                [-60, 57],
                [-60, 63]
            ],
        })
        this.buildings[1].color = [0.4, 0.9, 0.2]

        this.buildings.push(
            new Cuboid([-60, 0, 0], [6, 100, 20])
        )
        this.edges.push({
            "north": [
                [-64, 51],
                [-56, 51]
            ],
            "south": [
                [-64, -51],
                [-56, -51]
            ],
            "east": [
                [-56, -51],
                [-56, 51]
            ],
            "west": [
                [-64, -51],
                [-64, 51]
            ],
        })
        this.buildings[2].color = [0.4, 0.9, 0.2]

        this.buildings.push(
            new Cuboid([-40, 20, 0], [10, 80, 50])
        )
        this.edges.push({
            "north": [
                [-46, 61],
                [-34, 61]
            ],
            "south": [
                [-46, -21],
                [-34, -21]
            ],
            "east": [
                [-34, -21],
                [-34, 61]
            ],
            "west": [
                [-46, -21],
                [-46, 61]
            ],
        })
        this.buildings[3].color = [0.4, 0.1, 0.2]

        this.buildings.push(
            new Cuboid([40, 20, 0], [66, 4, 50])
        )
        this.edges.push({
            "north": [
                [6, 23],
                [74, 23]
            ],
            "south": [
                [6, 17],
                [74, 17]
            ],
            "east": [
                [74, 17],
                [74, 23]
            ],
            "west": [
                [6, 17],
                [6, 23]
            ],
        })
        this.buildings[4].color = [0.4, 0.1, 0.9]

        this.buildings.push(
            new Cuboid([-16, 20, 0], [36, 4, 50])
        )
        this.edges.push({
            "north": [
                [-35, 23],
                [3, 23]
            ],
            "south": [
                [-35, 17],
                [3, 17]
            ],
            "east": [
                [3, 17],
                [3, 23]
            ],
            "west": [
                [-35, 17],
                [-35, 23]
            ],
        })
        this.buildings[5].color = [0.1, 0.6, 0.9]

        this.buildings.push(
            new Cuboid([10, -30, 0], [120, 4, 50])
        )
        this.edges.push({
            "north": [
                [-51, -27],
                [71, -27]
            ],
            "south": [
                [-51, -33],
                [71, -33]
            ],
            "east": [
                [71, -27],
                [71, -33]
            ],
            "west": [
                [-51, -27],
                [-51, -33]
            ]
        })
        this.buildings[4].color = [0.4, 0.1, 0.9]

        this.buildings.push(
            new Cuboid([10, -60, 0], [16, 16, 70])
        )
        this.edges.push({
            "north": [
                [1, -51],
                [19, -51]
            ],
            "south": [
                [1, -69],
                [19, -69]
            ],
            "east": [
                [19, -51],
                [19, -69]
            ],
            "west": [
                [1, -51],
                [1, -69]
            ],
        })
        this.buildings[6].color = [0.9, 0.8, 0.2]
    }

    draw() {
        this.field.draw();
        this.target.draw();
        this.buildings.forEach((building) => {
            building.draw();
        })
    }

    getEdges() {
        return this.edges;
    }
}