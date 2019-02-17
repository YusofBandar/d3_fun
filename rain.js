function renderRain(amount = 500, options = {}) {

    options = defaultRainOptions(options);


    let drag = d3.drag().on("drag", dragMovement);

    function dragMovement(d) {
        let dX = d3.event.x;
        let dY = d3.event.y;

        let width = d3.select(this).attr('width');
        let height = d3.select(this).attr('height');

        d3.select(this).attr('x', dX - width / 2)
            .attr('y', dY - height / 2);
    }



    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("class", "rainCanvas")
        .attr("width", w)
        .attr("height", h);

    let rectWidth = 200;
    let rectHeight = 100;

    let rect = svg.append('rect')
        .attr('x', (w / 2) - (rectWidth / 2))
        .attr('y', h - rectHeight)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .call(drag)


    let raindrops = svg.selectAll("circle")
        .data(d3.range(amount).map(function () {
            length = getRandomArbitrary(options.minLength, options.maxLength);
            return {
                x: w * Math.random(),
                y: getRandomArbitrary(-100,-200),
                d: length * 0.3,
                hidden :false,
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
                if (d.x > w) {
                    d.hidden = false;
                    d.x -= w;
                }
                return d.x;
            })
            .attr("y1", function (d) {
                d.y += d.d;
                if (d.y > h) {
                    d.hidden = false;
                    d.y = getRandomArbitrary(-100,-200);
                }
                return d.y;
            }).attr("x2", function (d) {
                return d.x + d.length;
            })
            .attr("y2", function (d) {
                return d.y + d.length;
            }).attr("visibility", function (d) {

                if (d.hidden) {
                    return 'hidden';
                }

                if (d.x >= Number(rect.attr('x')) && d.x <= (Number(rect.attr('x')) + Number(rect.attr('width')))) {
                    if (d.y >= Number(rect.attr('y')) && d.y <= (Number(rect.attr('y')) + Number(rect.attr('height')))) {
                        d.hidden = true;
                        return 'hidden';
                    }

                }
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