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

    let possiable = true;
    while (possiable) {
        possiable = false;
        let least = 99999999999;
        let leastcoord = [];
        
        for (let i = 0, length = knightMovements.length; i < length; i++) {
            let x = knightMovements[i][0] + knightPosition[0];
            let y = knightMovements[i][1] + knightPosition[1];

            if (y > -1 && y < (matrix.length - 1) && x > -1 && x < (matrix.length - 1)) {
                let index = matrix[y][x];
                if (index != -1 && index < least) {
                    least = index;
                    leastcoord.push(x);
                    leastcoord.push(y);
                    possiable = true;
                }
            }
        }
        
        if(possiable){
            matrix[leastcoord[1]][leastcoord[0]] = -1;
            knightPosition[0] = leastcoord[0];
            knightPosition[1] = leastcoord[1];
            console.log(leastcoord[0], leastcoord[1], "at index ", least);
            possiable = true;
        }
       
    }
}

knightMovement(spiralMatrix(30));