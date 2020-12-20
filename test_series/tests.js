const nonTidy = require("../test_data/non-tidy.json");
const tidy = require("../test_data/tidy.json");
const Series = require("../series-shaper");

const transform = {
  conversion: 6.2898,
  operator: "*",
  decimals: 2,
};

//non-tidy example
// const colors = {
//   Marine: "Red",
//   Pipeline: "Blue",
//   Railway: "Green",
//   Truck: "Yellow",
// };
// const series = new Series(nonTidy, "line");
// let data = series.filter({ Product: "Propane", Origin: "Canada" });
// data = series.sort("Period", "desc");
// let hcSeries = series.generateSeries(
//   "Period",
//   ["Marine", "Pipeline", "Railway", "Truck"],
//   transform,
//   undefined,
//   colors
// );
// console.log(hcSeries[0]);

//tidy example
const colors = {
  "PADD I": "Red",
  "PADD II": "Blue",
  "PADD III": "Orange",
  "PADD IV": "Green",
  "PADD V": "Yellow",
  Other: "Grey",
};

const series = new Series(tidy, "line");
series.sort("Year", "desc");
let hcSeries = series.generateSeries(
  "Year",
  "PADD",
  transform,
  "Value",
  colors
);
console.log(hcSeries[0]);
