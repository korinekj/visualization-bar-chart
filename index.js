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
    drawChart(dataset, data);
  });
});

function drawChart(dataset, data) {
  const margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 40,
  };

  const svgWidth = 700 - margin.left - margin.right;
  const svgHeight = 500 - margin.top - margin.bottom;

  const barWidth = (svgWidth + 8) / dataset.length;

  const svg = d3
    .select("svg")
    .attr("width", svgWidth + margin.left + margin.right)
    .attr("height", svgHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // const xScale = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(dataset)])
  //   .range([0, svgWidth]);

  const datum = data.data.map((element) => {
    return parseInt(element[0].substring(0, 4));
  });

  const xAxisScale = d3
    .scaleLinear()
    .domain([datum[0], datum[datum.length - 1]])
    .range([0, svgWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight, 0]);

  const xAxis = d3.axisBottom().scale(xAxisScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft().scale(yAxisScale);

  //x-axis
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + svgHeight + ")")
    .call(xAxis);

  //y-axis
  svg.append("g").attr("id", "y-axis").call(yAxis);

  // Define the div for the tooltip
  let div = d3
    .select(".container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg
    .selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => {
      return d[0];
    })
    .attr("data-gdp", (d) => {
      return d[1];
    })
    .attr("y", function (d) {
      return svgHeight - yScale(d[1]);
    })
    .attr("height", function (d) {
      return yScale(d[1]);
    })
    .attr("width", barWidth)
    .attr("transform", function (d, i) {
      let translate = [barWidth * i, 0];
      return "translate(" + translate + ")";
    })
    .on("mouseover", (event, d) => {
      const x = event.pageX;
      const y = event.pageY;

      div.style("opacity", 0.9);
      div
        .html(d[0] + "<br>" + "$" + d[1] + " Billion")
        .style("left", x + 10 + "px")
        .style("top", y - 60 + "px")
        .attr("data-date", d[0])
        .attr("id", "tooltip");
    })
    .on("mouseout", () => {
      div.style("opacity", 0);
    });
}
