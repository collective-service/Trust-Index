const svgns = "http://www.w3.org/2000/svg";

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoOP4pczUtchLr3Oep7S5__9UnYhVczOc2J_yvkc0X3UHiLRKq-GSRFNw_krFflYwevyFV4oL-I9hT/pub?gid=0&single=true&output=csv";

var countryName = "Zambia"
var dataset = [60, 40, 100, 62, 66, 20, 44, 80, 32];
var dataLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const colorArray = ["#C39BD3", "#9B59B6", "#5499C7", "#2471A3", "#2039ff", "#82E0AA", "#239B56", "#F4D03F", "#D35400"];
const angleArray = [0, 40, 80, 120, 160, 200, 240, 280, 320];

var svgWidth = 400,
    svgHeight = 300,
    barPadding = 5;
var barWidth = (svgWidth / dataset.length);



// la function get les data de gspreadsheet, le filtre sur le country donné en param et les aggrège sur
// colonne "Component" en faisant la somme de DataValue
// Ne retourne rien mais modifie dataset en ajoutant les valeurs pour chaque component, donc dataset doit etre initialisé a []
function getScoresData(country) {
    d3.csv(dataURL).then(function(data) {
        // filter the country
        // data = data.filter(d => d["Country"] == country);

        // cette partie split n'est pas necessaire, vire les % des donnees seulement, si c'est clean depuis les data, on peut
        // s'en passer
        data.forEach(element => {
            var spt = element["DataValue"].split("%");
            element["DataValue"] = spt[0];
        });

        var nestedData = d3.nest()
            .key(function(d) { return d['Component']; })
            .rollup(function(v) { return d3.sum(v, function(d) { return d["DataValue"]; }) })
            .entries(data);

        console.log(nestedData);

        nestedData.forEach(component => {
            dataLabels.push(component.key);
            dataset.push(component.value);
        });

    })

} //getScoresData


getScoresData();

// value 80 degree line for center offset calculation

var offset = Math.cos(10) * 90;
var center = svgWidth / 2
var average = dataset.reduce((a, b) => a + b, 0) / dataset.length;



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


var average = g
    .append("average")
    attr("x", svgWidth / 2 - 7);
    attr("y", svgHeight / 2 + 5);
    attr("class", "label");

// ISOTYPE chart
//create svg element
var svgDoc = d3.select("#grid")
  .append("svg")
  .attr("viewBox", "0 0 100 100");

// Define the gradient
var gradient = svgDoc.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("y1", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 1);

//define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
svgDoc.append("defs")
    .append("g")
    .attr("id", "iconCustom")
  //  .attr('fill', 'url(#gradient)')
    .append("path")
            .attr("d", "M3.5,2H2.7C3,1.8,3.3,1.5,3.3,1.1c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.4,0.2,0.7,0.6,0.9H1.1C0.7,2,0.4,2.3,0.4,2.6v1.9c0,0.3,0.3,0.6,0.6,0.6h0.2c0,0,0,0.1,0,0.1v1.9c0,0.3,0.2,0.6,0.3,0.6h1.3c0.2,0,0.3-0.3,0.3-0.6V5.3c0,0,0-0.1,0-0.1h0.2c0.3,0,0.6-0.3,0.6-0.6V2.6C4.1,2.3,3.8,2,3.5,2z");


//background rectangle
svgDoc.append("rect").attr("width", 100).attr("height", 100);

//specify the number of columns and rows for pictogram layout
var numCols = 5;
var numRows = 5;

//padding for the grid
var xPadding = 10;
var yPadding = 15;

//horizontal and vertical spacing between the icons
var hBuffer = 9;
var wBuffer = 8;

//generate a d3 range for the total number of required elements
var myIndex = d3.range(numCols * numRows);



//text element to display number of icons highlighted
svgDoc.append("text")
    .attr("id", "txtValue")
    .attr("x", xPadding)
    .attr("y", yPadding)
    .attr("dy", -3)
    .text("0");

//create group element and create an svg <use> element for each icon
svgDoc.append("g")
    .attr("id", "pictoLayer")
    .selectAll("use")
    .data(myIndex)
    .enter()
    .append("use")
        .attr("xlink:href", "#iconCustom")
        .attr("id", function (d) {
            return "icon" + d;
        })
        .attr("x", function (d) {
            var remainder = d % numCols;//calculates the x position (column number) using modulus
            return xPadding + (remainder * wBuffer);//apply the buffer and return value
        })
          .attr("y", function (d) {
              var whole = Math.floor(d / numCols)//calculates the y position (row number)
              return yPadding + (whole * hBuffer);//apply the buffer and return the value
          })
        .classed("iconPlain", true);

var data = { percent: 5.0 };

function drawIsotype(dataObject) {
    var valueLit = dataObject.percent,
    total = numCols * numRows,
    valuePict = total * (dataObject.percent / 100),
    valueDecimal = (valuePict % 1);

    d3.select("#txtValue").text(valueLit + '%');

    d3.selectAll("use").attr("fill", function (d, i) {
        if (d < valuePict - 1) {
          return "orange";
        } else if (d > (valuePict - 1) && d < (valuePict)){
          gradient.append("svg:stop")
            .attr("offset", (valueDecimal * 100) + '%')
            .attr("stop-color", "orange")
            .attr("stop-opacity", 1);
          gradient.append("svg:stop")
            .attr("offset", (valueDecimal * 100) + '%')
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);
         gradient.append("svg:stop")
            .attr("offset", '100%')
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);
          return "url(#gradient)";
        } else {
          return "white";
        }
    });
}
drawIsotype(data);
