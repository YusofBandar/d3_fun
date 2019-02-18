let stopped = false;

function renderCircles() {



    let w = 960,
        h = 500;

    let svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);




    let circles = svg.selectAll("circle")
        .data(d3.range(1).map(function () {
            return {
                x: (w / 2) + 100,
                y: (h / 2) + 100,
            };
        }))
        .enter().append("circle")
        .attr('class', 'circle')
        .attr("r", function (d) {
            return 5;
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        });


    let point = svg.append("circle")
        .attr('class', 'circle')
        .attr("r", function (d) {
            return 5;
        })
        .attr("cx", function (d) {
            return w / 2;
        })
        .attr("cy", function (d) {
            return h / 2;
        });


    let t = 0;

    d3.timer(function () {
        // Update the circle positions.

        circles
        .attr("transform",function(d){
            return `rotate(${t},${w/2},${h/2})`
        })

        t = t + 5;


    });
}




renderCircles();