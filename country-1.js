const svgns = "http://www.w3.org/2000/svg";

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoOP4pczUtchLr3Oep7S5__9UnYhVczOc2J_yvkc0X3UHiLRKq-GSRFNw_krFflYwevyFV4oL-I9hT/pub?gid=0&single=true&output=csv";

var countryName = "Zambia"
var dataset = [60, 40, 100, 62, 66, 20, 44, 80, 32];
var dataLabels = [];

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
