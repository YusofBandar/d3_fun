var dataset = [
    { name: 'IE', percent: 39.10 },
    { name: 'Chrome', percent: 32.51 },
    { name: 'Safari', percent: 13.68 },
    { name: 'Firefox', percent: 8.71 },
    { name: 'Others', percent: 6.01 }
];

var pie = d3.pie()
    .value(function (d) { return d.percent })
    .sort(null)
    .padAngle(.03);

var w = 300, h = 300;

var outerRadius = w / 2;
var innerRadius = 100;



var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append('g')
    .attr("transform", 'translate(' + w / 2 + ',' + h / 2 + ')')


var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr("id", function (d) {
        return d.data.name;
    })
    .attr("d", arc)
    





svg.select("#Chrome")
    .attr("fill", "#ff33dd")
    .transition()
    .duration(1000)
    .attrTween('d', function (d) {
        var interpolate = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    });


