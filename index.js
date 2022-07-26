console.log("From index.js");

d3.select("h1").style("color", "blue");

function insertInHeading(json) {
  document.getElementById("nadpis").innerHTML = JSON.stringify(json);
}

function insertInParagraph(json) {
  document.getElementById("paragraph").innerHTML = JSON.stringify(json);
}

const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  true
);
xhr.send();
xhr.onload = function () {
  const json = JSON.parse(xhr.responseText);
  insertInHeading(json);
  insertInParagraph(json);
};
