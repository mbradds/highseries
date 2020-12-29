import Series from "../dist/index.js";
const getData = (Url) => {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return JSON.parse(Httpreq.responseText);
};

const nonTidy = getData("./test_data/non-tidy.json");
const tidy = getData("./test_data/tidy.json");

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
    yAxis: {
      title: {
        text: "Exports (Mb/d)",
      },
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    series: series,
  });
};

let transform = {
  conversion: 159,
  operator: "*",
  decimals: 2,
};
let colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};
let zIndex = {
  Marine: 4,
  Pipeline: 3,
  Railway: 2,
  Truck: 1,
};

let filters = { Product: "Propane", Origin: "Canada" };
let units = { baseUnits: "Mb/d", secondaryUnits: "m3/d" };

const createTidyChart = (data, filters) => {
  let t0 = performance.now();
  const series = new Series({ data: data, chartType: "line", colors: colors });
  series.xCol = "Period";
  series.yCols = "Mode of Transportation";
  series.valuesCol = "Volume (Mb/d)";
  series.filters = filters;
  series.zIndex = zIndex;

  let tidyChart = loadChart(series.hcSeries, "container-tidy");
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
  const series = new Series({ data: data, chartType: "line", colors: colors });
  series.xCol = "Period";
  series.yCols = ["Marine", "Pipeline", "Railway", "Truck"];
  series.filters = filters;
  series.zIndex = zIndex;
  let nonTidyChart = loadChart(series.hcSeries, "container-nonTidy");
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

const updateCharts = (chart, series, filters, data, div) => {
  let t0TidyProduct = performance.now();
  series.update({ data: data, filters: filters });
  if (div == "container-tidy") {
    chart = loadChart(series.hcSeries, "container-tidy");
    chart.update({
      title: {
        text: `Tidy update time ${(performance.now() - t0TidyProduct).toFixed(
          1
        )} milliseconds`,
      },
    });
  } else {
    chart = loadChart(series.hcSeries, "container-nonTidy");
    chart.update({
      title: {
        text: `Non-tidy update time ${(
          performance.now() - t0TidyProduct
        ).toFixed(1)} milliseconds`,
      },
    });
  }
  return [chart, series];
};

const updateChartUnits = (chart, series, data, currentUnits, div) => {
  let t0Units = performance.now();
  if (currentUnits == units.baseUnits) {
    series.update({ data: data, transform: false });
  } else {
    series.update({ data: data, transform: transform });
  }
  let title = "";
  if (div == "container-tidy") {
    title = "Tidy update time:";
  } else {
    title = "Non-tidy update time:";
  }

  chart.update({
    title: {
      text: `${title} ${(performance.now() - t0Units).toFixed(1)} milliseconds`,
    },
    series: series.hcSeries,
    yAxis: {
      title: {
        text: `Exports ${currentUnits}`,
      },
    },
  });
};

let selectProduct = document.getElementById("select-product");
selectProduct.addEventListener("change", (selectProduct) => {
  filters.Product = selectProduct.target.value;
  [chartTidy, seriesTidy] = updateCharts(
    chartTidy,
    seriesTidy,
    filters,
    tidy,
    "container-tidy"
  );

  [chartNonTidy, seriesNonTidy] = updateCharts(
    chartNonTidy,
    seriesNonTidy,
    filters,
    nonTidy,
    "container-nonTidy"
  );
});

let selectRegion = document.getElementById("select-region");
selectRegion.addEventListener("change", (selectRegion) => {
  filters.Origin = selectRegion.target.value;
  [chartTidy, seriesTidy] = updateCharts(
    chartTidy,
    seriesTidy,
    filters,
    tidy,
    "container-tidy"
  );
  [chartNonTidy, seriesNonTidy] = updateCharts(
    chartNonTidy,
    seriesNonTidy,
    filters,
    nonTidy,
    "container-nonTidy"
  );
});

let selectUnits = document.getElementById("select-units");
selectUnits.addEventListener("change", (selectUnits) => {
  let currentUnits = selectUnits.target.value;
  updateChartUnits(chartTidy, seriesTidy, tidy, currentUnits, "container-tidy");
  updateChartUnits(
    chartNonTidy,
    seriesNonTidy,
    nonTidy,
    currentUnits,
    "container-nonTidy"
  );
});
