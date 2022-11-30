var dataset = [60, 40, 100, 62, 66];
var average = dataset.reduce((a, b) => a + b, 0) / dataset.length;


//create svg element
var svgSkills = d3.select("#grid1")
  .append("svg")
  .attr("id", "skills")
  .attr("viewBox", "0 0 100 100");


// Define the gradient
var gradientSkills = svgSkills.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient-skills")
    .attr("y1", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
gradientSkills.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#00518E")
    .attr("stop-opacity", 1);

//define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
svgSkills.append("defs")
    .append("g")
    .attr("id", "iconCustom")
  //  .attr('fill', 'url(#gradient)')
    .append("path")
            .attr("d", "M3.5,2H2.7C3,1.8,3.3,1.5,3.3,1.1c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.4,0.2,0.7,0.6,0.9H1.1C0.7,2,0.4,2.3,0.4,2.6v1.9c0,0.3,0.3,0.6,0.6,0.6h0.2c0,0,0,0.1,0,0.1v1.9c0,0.3,0.2,0.6,0.3,0.6h1.3c0.2,0,0.3-0.3,0.3-0.6V5.3c0,0,0-0.1,0-0.1h0.2c0.3,0,0.6-0.3,0.6-0.6V2.6C4.1,2.3,3.8,2,3.5,2z");


//specify the number of columns and rows for pictogram layout
var numCols = 10;
var numRows = 3;

//padding for the grid
var xPadding = 0;
var yPadding = 15;

//horizontal and vertical spacing between the icons
var hBuffer = 9;
var wBuffer = 7;

//generate a d3 range for the total number of required elements
var myIndex = d3.range(numCols * numRows);



//text element to display number of icons highlighted
svgSkills.append("text")
    .attr("id", "txtValue1")
    .attr("x", xPadding)
    .attr("y", yPadding)
    .attr("dy", -3)
    .attr("fill","#00518E")
    .text("0");


//create group element and create an svg <use> element for each icon
svgSkills.append("g")
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

var data = { percent: average };

function drawIsotype1(dataObject) {
    var valueLit = dataObject.percent,
    total = numCols * numRows,
    valuePict = total * (dataObject.percent / 100),
    valueDecimal = (valuePict % 1);

    d3.select("#txtValue1").text('Skills ' + valueLit + '%');

    d3.select("#pictoLayer").selectAll("use").attr("fill", function (d, i) {
        if (d < valuePict - 1) {
          return "#00518E";
        } else if (d > (valuePict - 1) && d < (valuePict)){
          gradientSkills.append("svg:stop")
            .attr("offset", (valueDecimal * 100) + '%')
            .attr("stop-color", "#00518E")
            .attr("stop-opacity", 1);
          gradientSkills.append("svg:stop")
            .attr("offset", (valueDecimal * 100) + '%')
            .attr("stop-color", "#B8CDEE")
            .attr("stop-opacity", 1);
         gradientSkills.append("svg:stop")
            .attr("offset", '100%')
            .attr("stop-color", "#B8CDEE")
            .attr("stop-opacity", 1);
          return "url(#gradient-skills)";
        } else {
          return "#B8CDEE";
        }
    });
}
drawIsotype1(data);
