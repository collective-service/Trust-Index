const svgns = "http://www.w3.org/2000/svg";

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoOP4pczUtchLr3Oep7S5__9UnYhVczOc2J_yvkc0X3UHiLRKq-GSRFNw_krFflYwevyFV4oL-I9hT/pub?gid=0&single=true&output=csv";

var countryName = "Zambia"
var dataset = [60, 40, 100, 62, 66, 20, 44, 80, 32];

const colorArray = ["#C39BD3", "#9B59B6", "#5499C7", "#2471A3", "#2039ff", "#82E0AA", "#239B56", "#F4D03F", "#D35400"];
const angleArray = [0, 40, 80, 120, 160, 200, 240, 280, 320];

var svgWidth = 400,
    svgHeight = 300,
    barPadding = 5;
var barWidth = (svgWidth / dataset.length);

getScoresData();

// 
function getScoresData(country) {
    d3.csv(dataURL).then(function(data) {
        console.log(data)
            // filter the country
            // data = data.filter(d => d["Country"] == country);
        data.forEach(element => {
            var spt = element["DataValue"].split("%");
            element["DataValue"] = spt[0];
        });

        var nestedData = d3.nest()
            .key(function(d) { return d['Component']; })
            .rollup(function(v) { return d3.sum(v, function(d) { return d["DataValue"]; }) })
            .entries(data);

        console.log(nestedData);

    })

} //getScoresData


// value 80 degree line for center offset calculation

var offset = Math.cos(10) * 90;
var center = svgWidth / 2
var average = dataset.reduce((a, b) => a + b, 0) / dataset.length;


var radial = document.getElementById('bar1-js');
radial.setAttribute("width", svgWidth);
radial.setAttribute("height", svgHeight);
radial.setAttribute("class", "svg_wrapper");


for (var i = 0; i < dataset.length; i++) {

    var rect = document.createElementNS(svgns, 'rect');

    gsap.set(rect, {
        x: svgWidth / 2 + offset,
        y: svgHeight / 2 + 5,
        width: 20,
        height: dataset[i % dataset.length] * 1.8 + 20,
        fill: colorArray[i % colorArray.length],
        rx: 10,
        ry: 10,
        opacity: 0.7,
        svgOrigin: '-5 -5',
        xPercent: 400,
        yPercent: 0,
        rotate: angleArray[i % angleArray.length],

    });


    radial.appendChild(rect);
}


// Overall Value

var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("fill", "white");
circle.setAttribute("stroke", "grey");
circle.setAttribute("cx", svgWidth / 2);
circle.setAttribute("cy", svgHeight / 2);
circle.setAttribute("r", "15");
radial.appendChild(circle);


var overall = document.createElementNS("http://www.w3.org/2000/svg", "text");
var average = document.createTextNode(average);
overall.setAttribute("x", svgWidth / 2 - 7);
overall.setAttribute("y", svgHeight / 2 + 5);
overall.setAttribute("class", "label");

overall.appendChild(average);
radial.appendChild(overall);


// Chart 2


var svg = d3.select('#bar-js')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg_wrapper");

var g = svg.append("g")
    .attr("transform", function(d) {
        var translate = [svgWidth / 2, svgHeight / 2];
        return "translate(" + translate + ")";
    });


var barChart = g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("height", function(d) {
        return d * 1.8 + 20;
    })
    .attr("width", 20)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("opacity", 0.7)
    .attr("fill", function(d, i) { return colorArray[i] })
    .attr("transform", function(d, i) {
        var translate = "+5, +5";
        var rotate = angleArray[i];
        return "rotate(" + rotate + ") translate(" + translate + ") ";
    });

var circle = g
    .append("circle")
    .attr("fill", "white")
    .attr("stroke", "grey")
    .attr("cx", svgWidth / 2)
    .attr("cy", svgHeight / 2)
    .attr("r", "15")
    .attr("transform", function(d) {
        var translate = [svgWidth / 2, svgHeight / 2];
        return "translate(" + translate + ")";
    });