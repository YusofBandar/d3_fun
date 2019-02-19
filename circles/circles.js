let stopped = false;

function renderCircles() {

    let w = 960,
        h = 1000;

    let svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    const amount = 10;

    //orbits
    let orbits = svg.append("g")
        .attr("class", "orbits");

    //patterns
    svg.append("g")
        .attr("class","pattern");

    //x axis
    generateOrbit(orbits,amount,'xaxis',function(index){return ((index + 1) * 80) + 100},function(index){return 100});
    //y axis
    generateOrbit(orbits,amount,'yaxis',function(index){return 100},function(index){return ((index + 1) * 80) + 100});


    let t = 0;
    d3.timer(function () {
        // Update the circle positions.
        orbits.selectAll(".satellite")
            .attr("transform", function (d) {
                return `rotate(${t * d.rotationSpeed},${d.x},${d.y})`
            })

        t = t>360 ? 0 : t + 1;
    });
}

function generateOrbit(node,amount=8,axisName,xfn,yfn) {
   
    
    orbits = node.append("g")
        .attr("class",axisName);

    orbits = orbits.selectAll(".orbit")
        .data(d3.range(amount).map(function (index) {
            return {
                x: xfn(index),
                y: yfn(index),
                rotationSpeed: index + 1,
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