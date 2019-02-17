function distance(x0, y0, x1, y1) {
    return Math.hypot(x1 - x0, y1 - y0);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function map (num, in_min, in_max, out_min, out_max){
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}