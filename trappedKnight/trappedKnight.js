function spiralMatrix(size=10) {
    let matrix = [];

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(-1);
        }
        matrix.push(row);
    }

    let coords = [(size/2)-1, (size/2)-1];

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

    console.log(xDistance, yDistance);


    return matrix;
}

console.log(spiralMatrix(30));