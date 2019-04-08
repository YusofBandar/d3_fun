var dataset = [
    { name: 'IE', percent: 39.10 },
    { name: 'Chrome', percent: 32.51 },
    { name: 'Safari', percent: 13.68 },
    { name: 'Firefox', percent: 8.71 },
    { name: 'Others', percent: 6.01 }
];

function sum(accum, curr) {
    if ('amount' in curr) {
        return accum + curr.amount;
    } else {
        return accum;
    }
}

function percent(data) {
    var total = Number(this);
    return Number(((data.amount / total) * 100).toFixed(2));
}

function pushPercent(segement, percents) {
    for (var i = 0, n = percents.length; i < n; i++) {
        segement.data[i].percent = percents[i]
    }
}

function prepareData(company) {
    var total = company.data.reduce(sum, 0).toFixed(2);
    var percents = company.data.map(percent, total)
    pushPercent(company, percents);
    return company;
}


function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }





drawDonut(techCompanies[0]);




function drawDonut(company, w = 800, h = 800, tranTime = 1000) {
    prepareData(company);
    var pie = d3.pie()
        .value(function (d) { return d.percent })
        .sort(null)

    var svg = d3.select("body")
        .append("svg")
        .attr("viewBox", `0 0 ${w} ${h}`)
        .attr("width", w)
        .attr("height", h)
        .append('g')
        .attr("class", "donut")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("transform", 'translate(' + w / 2 + ',' + h / 2 + ')')


    var radius = Math.min(w, h) / 2;

    var arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.73)

    var labelArc = d3.arc()
        .outerRadius(radius * 0.85)
        .innerRadius(radius * 0.85);





    var segements = svg.selectAll('.segement')
        .data(pie(company.data))
        .enter()
        .append("g")
        .attr("class", "segement")

    var segArcs = segements.append('path')
        .attr("fill", function (d, i) {
            return company.colors[i % company.colors.length];
        })


    segArcs.transition()
        .duration(tranTime)
        .attrTween('d', function (d) {
            var interpolate = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        })
        .delay(function (d, i) {
            return tranTime * i
        })

    segements.append("text")
        .text(function (d) {
            return d.data.label;
        })
        .attr('transform', function (d) {
            var pos = labelArc.centroid(d);
            return 'translate(' + pos + ')';
        }).style('text-anchor', function (d) {
            // if slice centre is on the left, anchor text to start, otherwise anchor to end
            return (midAngle(d)) < Math.PI ? 'start' : 'end';
        });

}















