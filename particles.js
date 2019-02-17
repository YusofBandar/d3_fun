function renderParticles(amount = 500, options = {}) {

    options = defaultOptions(options);

    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    let particles = svg.selectAll("circle")
        .data(d3.range(amount).map(function () {
            return {
                x: w * Math.random(),
                y: h * Math.random(),
                r : getRandomArbitrary(options.minSize,options.maxSize),
                dx: getRandomArbitrary(options.minSpeed,options.maxSpeed),
                dy: getRandomArbitrary(options.minSpeed,options.maxSpeed)
            };
        }))
        .enter().append("circle")
        .attr("r",function(d){
            return d.r;
        });


    d3.timer(function () {
        // Update the circle positions.
        particles
            .attr("cx", function (d) {
                d.x += d.dx;
                if (d.x > w) d.x -= w;
                else if (d.x < 0) d.x += w;
                return d.x;
            })
            .attr("cy", function (d) {
                d.y += d.dy;
                if (d.y > h) d.y -= h;
                else if (d.y < 0) d.y += h;
                return d.y;
            });
    });
}



function distance(x0,y0,x1,y1){
    return Math.hypot(x1 -x0,y1-y0);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function defaultOptions(options) {
    const MINSIZE = 1,
        MAXSIZE = 10;

    const MINSPEED = 1,
        MAXSPEED = 5;

    if (!('minSize' in options)) {
        options.minSize = MINSIZE;
    }

    if (!('maxSize' in options)) {
        options.maxSize = MAXSIZE;
    }

    if (!('minSpeed' in options)) {
        options.minSpeed = MINSPEED;
    }

    if (!('maxSpeed' in options)) {
        options.maxSpeed = MAXSPEED;
    }

    return options;
}


renderParticles(50);