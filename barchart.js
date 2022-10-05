const arr = ['a', 'b', 'a', 'a', 'c', 'c'];

const count = {};

for (const element of arr) {
  if (count[element]) {
    count[element] += 1;
  } else {
    count[element] = 1;
  }
}



d3.select("#item-1").append("span")
    .text(count['a']);

d3.select("#item-2").append("span")
        .text(count['b']);

d3.select("#item-3").append("span")
        .text(count['c']);
