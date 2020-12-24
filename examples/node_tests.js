const nonTidy = require("./test_data/non-tidy.json");
const tidy = require("./test_data/tidy.json");
const Series = require("../src/series-shaper.js");

const transform = {
  conversion: 6.2898,
  operator: "*",
  decimals: 2,
};

const filters = { Product: "Propane", Origin: "Canada" };

const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};

const seriesTidy = new Series({
  data: tidy,
  chartType: "line",
  colors: colors,
});
seriesTidy.update({
  xCol: "Period",
  yCols: "Mode of Transportation",
  valuesCol: "Volume (Mb/d)",
  filters: filters,
  //transform: transform,
});
//console.log(seriesTidy.series)

const seriesNonTidy = new Series({
  data: nonTidy,
  chartType: "line",
  colors: colors,
});
seriesNonTidy.xCol = "Period";
seriesNonTidy.yCols = ["Marine", "Pipeline", "Railway", "Truck"];
seriesNonTidy.filters = filters;
console.log(seriesNonTidy.series);
