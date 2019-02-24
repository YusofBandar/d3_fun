let stopped = false;

function renderCircles() {



    const xamount = 10;
    const yamount = 10;

    let w = (140*2) + 80 * xamount,
        h = (140*2) + 80 * yamount;

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
    });
    generateOrbit(orbits, yamount, 'yaxis', function (index) {
        return 100
    }, function (index) {
        return ((index + 1) * 80) + 100
    });


    let t = 0;
    d3.timer(function () {
        // Update the circle positions.
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


        let xsatellites = orbits.selectAll(".xaxis .satellite").data();
        let ysatellites = orbits.selectAll(".yaxis .satellite").data();

        for (let i = 0, xlength = xsatellites.length; i < xlength; i++) {
            for (let j = 0, ylength = ysatellites.length; j < ylength; j++) {

                context.beginPath();
                context.rect(xsatellites[i].x, ysatellites[j].y, 1, 1);
                context.fillStyle = "red";
                context.fill();
                context.closePath();
            }
        }

        t = t + 1;
    });
}

function rotate(cx, cy, x, y, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}


function generateOrbit(node, amount = 8, axisName, xfn, yfn) {


    orbits = node.append("g")
        .attr("class", axisName);

    //

    orbits = orbits.selectAll(".orbit")
        .data(d3.range(amount).map(function (index) {
            return {
                startingX: xfn(index),
                startingY: yfn(index),
                x: xfn(index),
                y: yfn(index),
                rotationSpeed: (index + 1) * 0.4,
                orbitRadius: 30,
                index
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

    return orbits;
}




renderCircles();