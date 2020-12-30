const nonTidy = require("./test_data/non-tidy.json");
const tidy = require("./test_data/tidy.json");
const Series = require("../src/series-shaper.js");

const transform = {
  decimals: 2,
  conv: [6.2898, "*"],
};

const filters = { Product: "Propane", Origin: "Canada" };

const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};
const zIndex = {
  Marine: 4,
  Pipeline: 3,
  Railway: 2,
  Truck: 1,
};

// const seriesTidy = new Series({
//   data: tidy,
//   colors: colors,
//   zIndex: zIndex,
// });
// seriesTidy.update({
//   xCol: "Period",
//   yCols: "Mode of Transportation",
//   valuesCol: "Volume (Mb/d)",
//   filters: filters,
//   transform: transform,
// });
// console.log(seriesTidy.hcSeries[0]);

const seriesNonTidy = new Series({
  data: nonTidy,
  colors: colors,
  transform: { decimals: 1 },
});
seriesNonTidy.update({
  data: nonTidy,
  transform: transform,
});
seriesNonTidy.xCol = "Period";
seriesNonTidy.yCols = ["Marine", "Pipeline", "Railway", "Truck"];
seriesNonTidy.filters = filters;
console.log(seriesNonTidy);
