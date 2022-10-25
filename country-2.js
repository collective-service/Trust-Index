
const svgns = "http://www.w3.org/2000/svg";
var countryName = "Zambia";
var dataset = [60, 40, 100, 62, 66, 20, 44, 80, 32];

const colorArray = ["#C39BD3", "#9B59B6", "#5499C7", "#2471A3", "#2039ff", "#82E0AA", "#239B56", "#F4D03F", "#D35400"];
const angleArray = [0, 40, 80, 120, 160, 200, 240, 280, 320];

var svgWidth = 400, svgHeight = 300, barPadding = 5;

// value 80 degree line for center offset calculation

var offset = Math.cos(10)*90;
var center = svgWidth/2;
var average = dataset.reduce((a, b) => a + b, 0) / dataset.length;


//svg.setAttribute("width", svgWidth);
//svg.setAttribute("height", svgHeight);
//svg.setAttribute("class", "svg_wrapper");

var svg = d3.select('#bar-js')
   .attr("width", svgWidth)
   .attr("height", svgHeight)
   .attr("transform", function (d, i) {
       var translate = [100,10];
       return "translate("+ translate +")";
   });

   var barChart = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("height", function(d) {
          return d * 1+20;
      })
      .attr("width", 20)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("opacity", 0.7)
      .attr("fill", function(d, i) { return colorArray[i]})
      .attr("transform", function (d, i) {
          var translate = [svgWidth/2 + offset, svgHeight/2];
          var rotate = angleArray[i];
          return "translate("+ translate +") rotate("+ rotate +")";
      });
