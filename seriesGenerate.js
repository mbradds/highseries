const nonTidy = require("./test_data/non-tidy.json");

class Series {
  constructor(df, dataType = undefined, chartType = undefined) {
    this._df = df;
    this._dataType = dataType;
    this._chartType = chartType;
    this._series = undefined;
  }

  get df() {
    return this._df;
  }

  set df(newData) {
    this._df = newData;
  }

  get chartType() {
    return this._chartType;
  }

  set chartType(chartType) {
    this._chartType = chartType;
  }

  filter(filterObj) {
    for (const [key, value] of Object.entries(filterObj)) {
      if (!Array.isArray(value)) {
        this._df = this._df.filter((row) => row[key] == value);
      } else {
        value.map((filterValue) => {
          this._df = this._df.filter((row) => row[key] == filterValue);
        });
      }
    }
    return this._df;
  }

  sort(by, how = "ascending") {
    let sortedData = [];
    if (how == "ascending") {
      sortedData = this._df.slice().sort((a, b) => b[by] - a[by]);
    } else if (how == "descending") {
      sortedData = this._df.slice().sort((a, b) => a[by] - b[by]);
    }
    this._df = sortedData;
    return this._df;
  }

  #yValues(decimals) {
    if (decimals !== undefined) {
      return (r, c) => (r[c] !== null ? +r[c].toFixed(decimals) : r[c]);
    } else {
      return (r, c) => r[c];
    }
  }

  #seriesProperties(colors) {
    if (colors !== undefined) {
      return (key, data, seriesName, customColors) => ({
        name: key,
        data: data,
        color: customColors[seriesName],
      });
    } else {
      return (key, data, seriesName, customColors) => ({
        name: key,
        data: data,
      });
    }
  }

  #properxName(xName) {
    if (xName !== undefined) {
      return xName;
    }
    if (this._chartType == undefined) {
      return "x";
    } else if (["line", "area"].includes(this._chartType)) {
      return "x";
    } //TODO: add more chart types here
  }

  #nonTidyOperation(xCol, yCols, colors, decimals, xName) {
    const seriesData = {};
    const colTotals = {};
    yCols.map((col) => {
      seriesData[col] = [];
      colTotals[col] = 0;
    });
    xName = this.#properxName(xName);
    const yOperator = this.#yValues(decimals);
    this._df.map((row) => {
      yCols.map((col) => {
        seriesData[col].push({
          [xName]: row[xCol],
          y: yOperator(row, col),
        });
        colTotals[col] = colTotals[col] + row[col];
      });
    });
    const seriesResult = [];

    const seriesOperator = this.#seriesProperties(colors);
    for (const [key, value] of Object.entries(seriesData)) {
      if (colTotals[key] !== 0) {
        seriesResult.push(seriesOperator(key, value, key, colors));
      }
    }

    return seriesResult;
  }

  generateSeries(
    xCol,
    yCols,
    colors = undefined,
    decimals = undefined,
    xName = undefined
  ) {
    if (this._dataType == "non-tidy") {
      this._series = this.#nonTidyOperation(
        xCol,
        yCols,
        colors,
        decimals,
        xName
      );
    }
    return this._series;
  }
}

const colors = {
  Marine: "Red",
  Pipeline: "Blue",
  Railway: "Green",
  Truck: "Yellow",
};

const series = new Series(nonTidy, "non-tidy", "line");
let data = series.filter({ Product: "Propane", Origin: "Canada" });
data = series.sort("Period", "descending");
let hcSeries = series.generateSeries(
  "Period",
  ["Marine", "Pipeline", "Railway", "Truck"],
  colors,
  1
);

console.log(hcSeries[0]);
