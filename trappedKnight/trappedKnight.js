function spiralMatrix(size = 10) {
    let matrix = [];

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(-1);
        }
        matrix.push(row);
    }

    let coords = [(size / 2) - 1, (size / 2) - 1];

    let xDistance = 1;
    let yDistance = 1;

    let movement = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ]

    let area = size * size;

    let index = 1;
    matrix[coords[0]][coords[0]] = index;
    while (index <= area) {
        for (let i = 0, length = movement.length; i < length; i++) {

            let distance;

            if (i % 2 == 0) {
                distance = xDistance;
                xDistance++;
            } else {
                distance = yDistance;
                yDistance++;
            }

            for (let d = 0; d < distance; d++) {
                index++;
                if (index > area) {
                    break;
                }
                coords[0] += movement[i][0];
                coords[1] += movement[i][1];
                matrix[coords[1]][coords[0]] = index
            }

        }
    }

    console.log(matrix);
    return matrix;
}

function knightMovement(matrix) {

    let w = 1000,
        h = 1000;

    let svg = d3.select("body").append("svg")
        .attr("class", "trappedKnightCanvas")
        .attr("width", w)
        .attr("height", h);



    let path = svg.selectAll(".path")
        .data(d3.range(1).map(function () {
            return {
                path: '',
                currentX: 0,
                currentY: 0
            };
        }))
        .enter()
        .append("g")
        .attr("class", "path")

    let line = path.append("polyline")
        .attr('class', 'line')

    let points = path.append("g")
        .attr("class", "points");



    let knightMovements = [
        [1, -2],
        [-1, -2],
        [2, -1],
        [-2, -1],
        [2, 1],
        [-2, 1],
        [1, 2],
        [-1, 2]
    ];

    let knightPosition = [(matrix.length / 2) - 1, (matrix.length / 2) - 1];
    matrix[(matrix.length / 2) - 1][(matrix.length / 2) - 1] = -1;

    line.attr("points", function (d) {
        d.currentX = map(knightPosition[0], 0, matrix.length, 0, w);
        d.currentY = map(knightPosition[1], 0, matrix.length, 0, h);
        d.path += ` ${d.currentX},${d.currentY}`;
        return d.path;
    })

    points.append("circle")
        .attr("class", "point")
        .attr("r", 1)
        .attr("cx", function (d) {
            return d.currentX;
        })
        .attr("cy", function (d) {
            return d.currentY;
        });

    let possiable = true;
    while (possiable) {
        possiable = false;
        let least = 99999999999;
        let leastx;
        let leasty;

        for (let i = 0, length = knightMovements.length; i < length; i++) {
            let x = knightMovements[i][0] + knightPosition[0];
            let y = knightMovements[i][1] + knightPosition[1];

            if (y > -1 && y < (matrix.length - 1) && x > -1 && x < (matrix.length - 1)) {
                let index = matrix[y][x];
                if (index != -1 && index < least) {
                    least = index;
                    leastx = x;
                    leasty = y;
                    possiable = true;
                }
            }
        }

        if (possiable) {
            matrix[leasty][leastx] = -1;
            knightPosition[0] = leastx;
            knightPosition[1] = leasty;

            line.attr("points", function (d) {
                d.currentX = map(knightPosition[0], 0, matrix.length, 0, w);
                d.currentY = map(knightPosition[1], 0, matrix.length, 0, h);
                d.path += ` ${d.currentX},${d.currentY}`;
                return d.path;
            })

            points.append("circle")
                .attr("class", "point")
                .attr("r", 1)
                .attr("cx", function (d) {
                    return d.currentX;
                })
                .attr("cy", function (d) {
                    return d.currentY;
                });


            console.log(leastx, leasty, "at index ", least);
            possiable = true;
        }

    }
}


knightMovement(spiralMatrix(100));