function renderParticles() {
    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    let particles = svg.selectAll("circle")
        .data(d3.range(1000).map(function () {
            return {
                x: w * Math.random(),
                y: h * Math.random(),
                dx: Math.random(),
                dy: Math.random()
            };
        }))
        .enter().append("circle")
        .attr("r", 2.5);


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


renderParticles();