// const xhr = new XMLHttpRequest();
// xhr.open(
//   "GET",
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
//   true
// );
// xhr.send();
// xhr.onload = function () {
//   const json = JSON.parse(xhr.responseText);
//   insertInHeading(json);
//   insertInParagraph(json);
// };

// fetch(
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     insertInHeading(data);
//   });

document.addEventListener("DOMContentLoaded", function () {
  d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  ).then(function (data) {
    const dataset = data.data.map((element) => element[1]);
    drawChart(dataset);
  });
});

function drawChart(dataset) {
  const svgWidth = 700,
    svgHeight = 460;

  const barWidth = svgWidth / dataset.length;

  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // const xScale = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(dataset)])
  //   .range([0, svgWidth]);

  const xAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight - 60]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight - 60, 0]);

  const xAxis = d3.axisBottom().scale(xAxisScale);
  const yAxis = d3.axisLeft().scale(yAxisScale);

  svg.append("g").attr("transform", "translate(60, 400)").call(xAxis);

  svg.append("g").attr("transform", "translate(60, 0)").call(yAxis);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - yScale(d);
    })
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("width", barWidth)
    .attr("transform", function (d, i) {
      let translate = [barWidth * i, 0];
      return "translate(" + translate + ")";
    });
}
