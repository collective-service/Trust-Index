// targeting the svg itself
const svg = document.querySelector("svg");

// variable for the namespace
const svgns = "http://www.w3.org/2000/svg";

// make a simple rectangle
let newRect = document.createElementNS(svgns, "rect");

newRect.setAttribute("x", "0");
newRect.setAttribute("y", "0");
newRect.setAttribute("width", "30");
newRect.setAttribute("height", "150");
newRect.setAttribute("fill", "#2039ff");
newRect.setAttribute("rx", "15");
newRect.setAttribute("ry", "15");
newRect.setAttribute("opacity", "0.7");
newRect.setAttribute("transform", "translate(100,100) rotate(45)");

// make a simple rectangle
let newRect2 = document.createElementNS(svgns, "rect");

newRect2.setAttribute("x", "0");
newRect2.setAttribute("y", "0");
newRect2.setAttribute("width", "30");
newRect2.setAttribute("height", "100");
newRect2.setAttribute("fill", "#F39C12");
newRect2.setAttribute("rx", "15");
newRect2.setAttribute("ry", "15");
newRect2.setAttribute("opacity", "0.7");
newRect2.setAttribute("transform", "translate(100,100) rotate(-22)");



// make a simple rectangle
let newRect3 = document.createElementNS(svgns, "rect");

newRect3.setAttribute("x", "0");
newRect3.setAttribute("y", "0");
newRect3.setAttribute("width", "30");
newRect3.setAttribute("height", "100");
newRect3.setAttribute("fill", "#7D3C98");
newRect3.setAttribute("rx", "15");
newRect3.setAttribute("ry", "15");
newRect3.setAttribute("opacity", "0.7");
newRect3.setAttribute("transform", "translate(100,100) rotate(122)");

// append the new rectangle to the svg
svg.appendChild(newRect);
// append the new rectangle to the svg
svg.appendChild(newRect2);
// append the new rectangle to the svg
svg.appendChild(newRect3);
