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





drawDonut(techCompanies[0]);




function drawDonut(company, w = 400, h = 400, tranTime = 1000) {
    prepareData(company);
    var pie = d3.pie()
        .value(function (d) { return d.percent })
        .sort(null)
        .padAngle(.03);

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


    var segThickness = 20;

    var outerRadius = w / 2;
    var innerRadius = outerRadius - segThickness;

    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);





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

    segements.append("circle")
        .attr("r", 5)
        .attr("cx",function(d){
            return arc.centroid(d)[0];
        })
        .attr("cy",function(d){
            return arc.centroid(d)[1];
        })
        .attr("fill", "red")
}















