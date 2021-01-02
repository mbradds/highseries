import Series from "../../dist/index.js";
import nonTidyData from "../test_data/non-tidy.json";
import tidyData from "../test_data/tidy.json";

const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Orange",
};

let tidySeries = new Series({
  data: tidyData,
  xCol: "Period",
  yCols: "Mode of Transportation", //the unique values in this column will have their own series
  valuesCol: "Volume (Mb/d)",
  filters: { Product: "Propane", Origin: "Canada" },
  colors: colors,
});

let forHighchartsTidy = tidySeries.hcSeries;
// Generate the chart
Highcharts.chart("tidy", {
  // options - see https://api.highcharts.com/highcharts
  chart: {
    type: "line",
    borderWidth: 1,
  },
  title: { text: "Canada Propane Exports (Mb/d)" },
  yAxis: {
    title: {
      text: "Exports (Mb/d)",
    },
  },
  xAxis: {
    type: "datetime",
    crosshair: true,
  },
  series: forHighchartsTidy,
});

let nonTidySeries = new Series({
  data: nonTidyData,
  xCol: "Period",
  yCols: ["Marine", "Pipeline", "Railway", "Truck"], //these columns will have their own series
  filters: { Product: "Propane", Origin: "Canada" },
  colors: colors,
});

let forHighchartsNon = nonTidySeries.hcSeries;
// Generate the chart

Highcharts.chart("nonTidy", {
  // options - see https://api.highcharts.com/highcharts
  chart: {
    type: "line",
    borderWidth: 1,
  },
  title: { text: "Canada Propane Exports (Mb/d)" },
  yAxis: {
    title: {
      text: "Exports (Mb/d)",
    },
  },
  xAxis: {
    type: "datetime",
    crosshair: true,
  },
  series: forHighchartsNon,
});

nonTidySeries.update({
  data: nonTidyData,
  filters: { Product: "Butane", Origin: "Alberta" },
  transform: { conv: [159, "*"], decimals: 2 }, //multiply values by 159 to convert Mb/d to m3/d
});

console.log(nonTidySeries.hcSeries)

Highcharts.chart("update", {
    // options - see https://api.highcharts.com/highcharts
    chart: {
      type: "line",
      borderWidth: 1,
    },
    title: { text: "Alberta Butane Exports (m3/d)" },
    yAxis: {
      title: {
        text: "Exports (m3/d)",
      },
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    series: nonTidySeries.hcSeries,
  });