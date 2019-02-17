function renderRain(amount = 500, options = {}) {

    options = defaultRainOptions(options);
    console.log(options)
    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("class", "rainCanvas")
        .attr("width", w)
        .attr("height", h);

    let raindrops = svg.selectAll("circle")
        .data(d3.range(amount).map(function () {
            length = getRandomArbitrary(options.minLength, options.maxLength);
            return {
                x: w * Math.random(),
                y: h * Math.random(),
                d: length * 0.8,
                length
            }
        }))
        .enter().append("line")
        .attr('class', 'raindrop')
        .attr("x1", function (d) {
            return d.x;
        })
        .attr("y1", function (d) {
            return d.y;
        })
        .attr("x2", function (d) {
            return d.x + d.length;
        })
        .attr("y2", function (d) {
            return d.y + d.length;
        });



    d3.timer(function () {
        raindrops
            .attr("x1", function (d) {
                d.x += d.d;
                if (d.x > w) d.x -= w;
                else if (d.x < 0) d.x += w;
                return d.x;
            })
            .attr("y1", function (d) {
                d.y += d.d;
                if (d.y > h) d.y -= h;
                else if (d.y < 0) d.y += h;
                return d.y;
            }).attr("x2", function (d) {
                return d.x + d.length;
            })
            .attr("y2", function (d) {
                return d.y + d.length;
            });
    })


}



function defaultRainOptions(options) {
    const MINLENGTH = 5,
        MAXLENGTH = 20;

    const MINSPEED = 1,
        MAXSPEED = 5;

    if (!('minLength' in options)) {
        options.minLength = MINLENGTH;
    }

    if (!('maxLength' in options)) {
        options.maxLength = MAXLENGTH;
    }

    if (!('minSpeed' in options)) {
        options.minSpeed = MINSPEED;
    }

    if (!('maxSpeed' in options)) {
        options.maxSpeed = MAXSPEED;
    }


    return options;
}


renderRain(400);