

function renderCircles() {



    const xamount = 10;
    const yamount = 10;

    let w = (140 * 2) + 80 * xamount,
        h = (140 * 2) + 80 * yamount;

    let div = d3.select("body").append("div")
        .attr("id", "circles")

    let svg = div.append("svg")
        .attr("id", "circlesSvg")
        .attr("width", w)
        .attr("height", h);

    let canvas = div
        .append('canvas')
        .attr("id", "circlesCanvas")
        .attr('width', w)
        .attr('height', h);

    let context = canvas.node().getContext('2d');




    //orbits
    let orbits = svg.append("g")
        .attr("class", "orbits");

    generateOrbit(orbits, xamount, 'xaxis', function (index) {
        return ((index + 1) * 80) + 100
    }, function (index) {
        return 100
    }, w, h);
    generateOrbit(orbits, yamount, 'yaxis', function (index) {
        return 100
    }, function (index) {
        return ((index + 1) * 80) + 100
    }, w, h);

    

    let t = 0;
    d3.timer(function () {
        //Update the circle positions.
        orbits.selectAll(" .satellite")
            .attr("cx", function (d) {
                let rc = rotate(d.startingX, d.startingY, d.orbitRadius + d.startingX, d.startingY, -d.rotationSpeed * t);
                d.x = rc[0];
                d.y = rc[1];

                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })

        orbits.selectAll(".xaxis .line")
            .attr("x1", function (d) {
                return d.x;
            })
            .attr("x2", function (d) {
                return d.x;
            })

        orbits.selectAll(".yaxis .line")
            .attr("y1", function (d) {
                return d.y;
            })
            .attr("y2", function (d) {
                return d.y;
            })


        let xsatellites = orbits.selectAll(".xaxis .satellite").data();
        let ysatellites = orbits.selectAll(".yaxis .satellite").data();

        for (let i = 0, xlength = xsatellites.length; i < xlength; i++) {
            for (let j = 0, ylength = ysatellites.length; j < ylength; j++) {

                context.beginPath();
                context.rect(xsatellites[i].x, ysatellites[j].y, 1, 1);
                context.fillStyle = xsatellites[i].colour;
                context.fill();
                context.closePath();
            }
        }

        t = t + 1;
    });
}







function generateOrbit(node, amount = 8, axisName, xfn, yfn, width, height) {


    orbits = node.append("g")
        .attr("class", axisName);

    

    orbits = orbits.selectAll(".orbit")
        .data(d3.range(amount).map(function (index) {
            return {
                colour: d3.interpolateLab("#00b3ff", "#70ff40")(map(index, 0, amount, 0, 1)),
                startingX: xfn(index),
                startingY: yfn(index),
                x: xfn(index),
                y: yfn(index),
                rotationSpeed: (index + 1) * 0.8,
                orbitRadius: 30,
                index: `_${index}`
            }
        }))
        .enter()
        .append("g")
        .attr("class", "orbit")
        .attr("id", function (d) {
            return d.index;
        })

    orbits
        .append("circle")
        .attr("class", "planet")
        .attr("r", function (d) {
            return d.orbitRadius;
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .style("stroke", function (d) {
            return d.colour;
        })

    orbits
        .append("circle")
        .attr("class", "satellite")
        .attr("r", function (d) {
            return d.orbitRadius / 10
        })
        .attr("cx", function (d) {
            return d.x + d.orbitRadius;
        })
        .attr("cy", function (d) {
            return d.y;
        })

    orbits
        .append("line")
        .attr("class", "line")
        .attr("x1", function (d) {
            if (axisName === 'xaxis') {
                return d.x + d.orbitRadius;
            }
            return 0;


        })
        .attr("y1", function (d) {
            if (axisName === 'xaxis') {
                return 0
            }
            return d.y;

        })
        .attr("x2", function (d) {
            if (axisName === 'xaxis') {
                return d.x + d.orbitRadius;
            }
            return width;

        })
        .attr("y2", function (d) {
            if (axisName === 'xaxis') {
                return height;
            }
            return d.y;

        });


    return orbits;
}




renderCircles();