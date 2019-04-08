var dataset = [
    { name: 'IE', percent: 39.10 },
    { name: 'Chrome', percent: 32.51 },
    { name: 'Safari', percent: 13.68 },
    { name: 'Firefox', percent: 8.71 },
    { name: 'Others', percent: 6.01 }
];

const tranTime = 1000;

var pie = d3.pie()
    .value(function (d) { return d.percent })
    .sort(null)
    .padAngle(.03);

var w = 400, h = 400;

var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", `0 0 ${w} ${h}`)
    .attr("width", w)
    .attr("height", h)
    .append('g')
    .attr("class","donut")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("transform", 'translate(' + w / 2 + ',' + h / 2 + ')')


var segThickness = 20;

var outerRadius = w / 2;
var innerRadius = outerRadius - segThickness;

var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);


var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr("id", function (d) {
        return d.data.name;
    })


path.attr("fill", "#ff33dd")
    .transition()
    .duration(tranTime)
    .attrTween('d', function (d) {
        var interpolate = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    }).delay(function (d, i) {
        return tranTime * i
    });



