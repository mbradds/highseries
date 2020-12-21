const nonTidy = require("../test_data/non-tidy.json");
const tidy = require("../test_data/tidy.json");
const Series = require("../series-shaper");

const transform = {
  conversion: 6.2898,
  operator: "*",
  decimals: 2,
};

//tidy example
const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};
// const tidySeries = new Series({ df: tidy, chartType: "line", colors: colors });
// tidySeries.transform = transform;
// tidySeries.filter({ Product: "Propane", Origin: "Canada" });
// let hcSeries = tidySeries.generateSeries({
//   xCol: "Period",
//   yCols: "Mode of Transportation",
//   valuesCol: "Volume (Mb/d)",
//   //transform: false,
// });
// console.log(hcSeries[0]);

// //non-tidy example
const nonTidySeries = new Series({
  df: nonTidy,
  chartType: "line",
  xCol: "Period",
  colors: colors,
});
nonTidySeries.transform = transform;
const filteredData = nonTidySeries.filter({
  Product: "Propane",
  Origin: "Canada",
});

let hcNonTidy = nonTidySeries.generateSeries({
  yCols: ["Marine", "Pipeline", "Railway", "Truck"],
});
//console.log(nonTidySeries);
console.log(hcNonTidy[0]);
