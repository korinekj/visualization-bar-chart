document.addEventListener("DOMContentLoaded", () => {
  d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  ).then((data) => {
    const dataset = data.data.map((element) => element);

    drawChart(dataset);
  });
});

const drawChart = (dataset) => {
  const svg = d3.select("svg").attr("width", 700).attr("height", 500);

  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const yValue = (d) => d[1];

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const barWidth = innerWidth / dataset.length;

  const xYearStart = new Date(dataset[0][0]);
  const xYearEnd = new Date(dataset[dataset.length - 1][0]);

  const xScale = d3
    .scaleTime()
    .domain([xYearStart, xYearEnd])
    .range([0, innerWidth]);
  console.log(xScale.domain());

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, yValue)])
    .range([0, innerHeight]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, yValue)])
    .range([innerHeight, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yAxisScale);

  //Margin convention
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Define the div for the tooltip
  const div = d3
    .select(".container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  //Add axes
  g.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${0}, ${innerHeight})`)
    .call(xAxis);

  g.append("g").attr("id", "y-axis").call(yAxis);

  g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", yValue)
    .attr("y", (d) => innerHeight - yScale(yValue(d)))
    .attr("height", (d) => yScale(yValue(d)))
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
};
