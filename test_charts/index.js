const Series = require("../series-shaper.js");
const getData = (Url) => {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return JSON.parse(Httpreq.responseText);
};
const nonTidy = getData("../test_data/non-tidy.json");
const tidy = getData("../test_data/tidy.json");

const loadChart = (series, div) => {
  return new Highcharts.chart(div, {
    chart: {
      type: "line",
      zoomType: "x",
      borderWidth: 1,
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    series: series,
  });
};

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

const filters = { Product: "Propane", Origin: "Canada" };

const createTidyChart = (data, filters) => {
  let t0 = performance.now();
  const series = new Series({ df: data, chartType: "line", colors: colors });
  series.xCol = "Period";
  series.yCols = "Mode of Transportation";
  series.valuesCol = "Volume (Mb/d)";
  series.filter(filters);
  let hcSeries = series.generateSeries();

  let tidyChart = loadChart(hcSeries, "container-tidy");
  let t1 = performance.now();
  tidyChart.update({
    title: {
      text: `Tidy load time: ${(t1 - t0).toFixed(1)} milliseconds`,
    },
  });
  return [tidyChart, series];
};

const createNonTidyChart = (data, filters) => {
  let t0 = performance.now();
  const series = new Series({ df: data, chartType: "line", colors: colors });
  series.xCol = "Period";
  series.yCols = ["Marine", "Pipeline", "Railway", "Truck"];
  series.filter(filters);
  let hcSeries = series.generateSeries();
  let nonTidyChart = loadChart(hcSeries, "container-nonTidy");
  let t1 = performance.now();
  nonTidyChart.update({
    title: {
      text: `Non-tidy load time: ${(t1 - t0).toFixed(1)} milliseconds`,
    },
  });
  return [nonTidyChart, series];
};

let [chartTidy, seriesTidy] = createTidyChart(tidy, filters);
let [chartNonTidy, seriesNonTidy] = createNonTidyChart(nonTidy, filters);

let selectProduct = document.getElementById("select-product");
selectProduct.addEventListener("change", (selectProduct) => {
  filters.Product = selectProduct.target.value;
  let t0TidyProduct = performance.now();
  seriesTidy.df = tidy;
  seriesTidy.filter(filters);
  chartTidy.update({
    series: seriesTidy.generateSeries(),
    title: {
      text: `Tidy update time ${(performance.now() - t0TidyProduct).toFixed(
        1
      )} milliseconds`,
    },
  });

  let t0NonTidyProduct = performance.now();
  seriesNonTidy.df = nonTidy;
  seriesNonTidy.filter(filters);
  chartNonTidy.update({
    series: seriesNonTidy.generateSeries(),
    title: {
      text: `Non-tidy update time ${(
        performance.now() - t0NonTidyProduct
      ).toFixed(1)} milliseconds`,
    },
  });
});
