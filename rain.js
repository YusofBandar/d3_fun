let wind = 10;

function renderRain(amount = 500, options = {}) {

    options = defaultRainOptions(options);


    let drag = d3.drag().on("drag", dragMovement);


    let w = 960,
        h = 500;

    function dragMovement(d) {
        let dX = d3.event.x;
        let dY = d3.event.y;

        let width = Number(d3.select(this).attr('width'));
        let height = Number(d3.select(this).attr('height'));

        console.log(dX+width);

        if(dX + (width/2) > w){dX = w-(width/2);}
        else if(dX-(width/2) < 0){dX = width/2;}


        if(dY + (height/2) > h){dY = h-(height/2);}
        else if(dY-(height/2) < 0){dY = height/2;}

        d3.select(this).attr('x', dX - width / 2)
            .attr('y', dY - height / 2);
    }





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
            zIndex = getRandomArbitrary(0, 10);
            return {
                x: w * Math.random(),
                y: getRandomArbitrary(-100, -600),
                z: zIndex,
                d: map(zIndex, 0, 10, 3, 10),
                length: map(zIndex, 0, 10, options.minLength, options.maxLength),
                hidden: false,
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
            return d.x + wind;
        })
        .attr("y2", function (d) {
            return d.y + d.length;
        });



    d3.timer(function () {
        raindrops
            .attr("x1", function (d) {
                d.x += wind;
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
                    d.y = getRandomArbitrary(-100, -600);
                }
                return d.y;
            }).attr("x2", function (d) {
                return d.x + wind;
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