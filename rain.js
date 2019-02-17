function renderRain(amount = 500, options = {}) {

    options = defaultRainOptions(options);
    

    let drag = d3.drag();

    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("class", "rainCanvas")
        .attr("width", w)
        .attr("height", h);

    let rectWidth = 200;
    let rectHeight = 100;

    let rect = svg.append('rect')
        .attr('x',(w/2)-(rectWidth/2))
        .attr('y',h-rectHeight)
        .attr('width',rectWidth)
        .attr('height',rectHeight)
        

    let raindrops = svg.selectAll("circle")
        .data(d3.range(amount).map(function () {
            length = getRandomArbitrary(options.minLength, options.maxLength);
            return {
                x: w * Math.random(),
                y: h * Math.random(),
                d: length * 0.3,
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

    if (!('minLength' in options)) {
        options.minLength = MINLENGTH;
    }

    if (!('maxLength' in options)) {
        options.maxLength = MAXLENGTH;
    }




    return options;
}


renderRain(800);