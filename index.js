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
d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(function (data) {
  console.log(data);
  const svgWidth = 500,
    svgHeight = 300;

  const barWidth = svgWidth / data.data.length;

  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  console.log(data.data);

  svg
    .selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - d[1] / 10;
    })
    .attr("height", function (d) {
      return d[1];
    })
    .attr("width", barWidth)
    .attr("transform", function (d, i) {
      let translate = [barWidth * i, 0];
      return "translate(" + translate + ")";
    });
});
