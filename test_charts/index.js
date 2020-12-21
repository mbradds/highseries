const Series = require('../series-shaper.js')

const getData = (Url) => {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return JSON.parse(Httpreq.responseText);
};
//const tidy = getData("../test_data/tidy.json");
const nonTidy = getData("../test_data/non-tidy.json");

const transform = {
  conversion: 6.2898,
  operator: "*",
  decimals: 2,
};

const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};
const series = new Series(nonTidy, "line");
let data = series.filter({ Product: "Propane", Origin: "Canada" });
data = series.sort("Period", "desc");
let hcSeries = series.generateSeries(
  "Period",
  ["Marine", "Pipeline", "Railway", "Truck"],
  transform,
  undefined,
  colors
);
console.log(series);

Highcharts.chart("container", {
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },

  series: hcSeries
});
