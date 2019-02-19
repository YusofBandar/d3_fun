let stopped = false;

function renderCircles() {



    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);



    let orbits = svg.selectAll(".orbit")
        .data(d3.range(8).map(function (index) {
            return {
                x: (index + 1) * 100,
                y: 100,
                rotationSpeed: index+0.5,
                orbitRadius: 30
            }
        }))
        .enter().append("g")
        .attr("class", "orbit")



    svg.selectAll(".orbit")
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

    svg.selectAll(".orbit")
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





    let t = 0;
    d3.timer(function () {
        // Update the circle positions.
        orbits.selectAll(".satellite")
            .attr("transform", function (d) {
                return `rotate(${t * d.rotationSpeed},${d.x},${d.y})`
            })

        t = t + 1;
    });
}




renderCircles();