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

function extendPath(path,x,y,matrixLength,w,h){
    path.select(".line").attr("points", function (d) {
        d.currentX = map(x, 0, matrixLength, 0, w);
        d.currentY = map(y, 0, matrixLength, 0, h);
        d.path += ` ${d.currentX},${d.currentY}`;
        return d.path;
    })

    path.select(".points").append("circle")
        .attr("class", "point")
        .attr("r", 1)
        .attr("cx", function (d) {
            return d.currentX;
        })
        .attr("cy", function (d) {
            return d.currentY;
        });
}

function renderPath(svg,w,h,matrix,movements) {

    console.log(movements);

    svg.selectAll("*").remove();


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



    let position = [(matrix.length / 2) - 1, (matrix.length / 2) - 1];
    matrix[(matrix.length / 2) - 1][(matrix.length / 2) - 1] = -1;

    

    path.call(extendPath,position[0],position[1],matrix.length,w,h);

    let possiable = true;
    while (possiable) {
        possiable = false;
        let least = 99999999999;
        let leastx;
        let leasty;

        for (let i = 0, length = movements.length; i < length; i++) {
            let x = Number(movements[i][0]) + position[0];
            let y = Number(movements[i][1]) + position[1];

            console.log(x,y);

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
            position[0] = leastx;
            position[1] = leasty;

            path.call(extendPath,position[0],position[1],matrix.length,w,h);


            console.log(leastx, leasty, "at index ", least);
            possiable = true;
        }

    }
}

let w = 1000,
h = 1000;

let matrix = spiralMatrix(50)

let svg = d3.select("body").append("svg")
        .attr("class", "trappedKnightCanvas")
        .attr("width", w)
        .attr("height", h);

function draw()
{
    let movement = document.getElementById("movement").value;
    movement = (movement.split(" "));

    let movementArray = [];

    for(let i=0,length=movement.length;i<length;i++){
        let coord = (movement[i].split(","))
        movementArray.push(coord);
    }

    renderPath(svg,w,h,matrix,movementArray);
    
    return false;
}

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

let kingMovements = [
    [1,0],
    [0,1],
    [-1,0],
    [0,-1]
]

let diamondMovements = [
    [1, -2],
    [-1, -2],
    [1, 2],
    [-1, 2]
]



renderPath(svg,w,h,matrix,knightMovements);

