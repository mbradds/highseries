const nonTidy = require("./test_data/non-tidy.json");
const tidy = require("./test_data/tidy.json");
const Series = require("../dist/index.js");

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

const seriesTidy = new Series({ data: tidy, chartType: "line", colors: colors });
seriesTidy.xCol = "Period";
seriesTidy.yCols = "Mode of Transportation";
seriesTidy.valuesCol = "Volume (Mb/d)";
seriesTidy.filters = filters;
let hcTidy = seriesTidy.generate();
//console.log(hcTidy[0]);

const seriesNonTidy = new Series({
  data: nonTidy,
  chartType: "line",
  colors: colors,
});
seriesNonTidy.xCol = "Period";
seriesNonTidy.yCols = ["Marine", "Pipeline", "Railway", "Truck"];
seriesNonTidy.filters = filters;
let hcNonTidy = seriesNonTidy.generate();
console.log(hcNonTidy[0]);
