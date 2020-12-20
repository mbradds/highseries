const nonTidy = require("./test_data/non-tidy.json");
const tidy = require("./test_data/tidy.json");

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

  get series() {
    return this._series;
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

  #getUnique = (filterColumns) => {
    var lookup = {};
    var result = [];
    for (var item, i = 0; (item = this._df[i++]); ) {
      var name = item[filterColumns];
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result;
  };

  #yValues(decimals) {
    if (decimals !== undefined) {
      return (r, c) => (r[c] !== null ? +r[c].toFixed(decimals) : r[c]);
    } else {
      return (r, c) => r[c];
    }
  }

  #seriesProperties(colors) {
    if (colors !== undefined) {
      return (seriesName, seriesData, customColors) => ({
        name: seriesName,
        data: seriesData,
        color: customColors[seriesName],
      });
    } else {
      return (seriesName, seriesData, customColors) => ({
        name: seriesName,
        data: seriesData,
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
        seriesResult.push(seriesOperator(key, value, colors));
      }
    }
    return seriesResult;
  }

  #tidyOperation(xCol, yCols, colors, decimals, valuesCol, xName) {
    const variableColumn = this.#getUnique(yCols);
    const yOperator = this.#yValues(decimals);
    const seriesOperator = this.#seriesProperties(colors);
    xName = this.#properxName(xName);
    const seriesData = variableColumn.map((v) => {
      const variableSeries = this._df.filter((row) => row[yCols] == v);
      const hcData = variableSeries.map((r) => {
        return {
          [xName]: r[xCol],
          y: yOperator(r, valuesCol),
        };
      });
      return seriesOperator(v, hcData, colors);
    });

    return seriesData;
  }

  generateSeries(
    xCol,
    yCols,
    colors = undefined,
    decimals = undefined,
    valuesCol = undefined, //only for tidy data with one numeric/values column.
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
    } else {
      this._series = this.#tidyOperation(
        xCol,
        yCols,
        colors,
        decimals,
        valuesCol,
        xName
      );
    }
    return this._series;
  }
}

// const colors = {
//   Marine: "Red",
//   Pipeline: "Blue",
//   Railway: "Green",
//   Truck: "Yellow",
// };
// const series = new Series(nonTidy, "non-tidy", "line");
// let data = series.filter({ Product: "Propane", Origin: "Canada" });
// data = series.sort("Period", "descending");
// let hcSeries = series.generateSeries(
//   "Period",
//   ["Marine", "Pipeline", "Railway", "Truck"],
//   colors,
//   1
// );
// console.log(hcSeries[0]);

const colors = {
  "PADD I": "Red",
  "PADD II": "Blue",
  "PADD III": "Orange",
  "PADD IV": "Green",
  "PADD V": "Yellow",
  Other: "Grey",
};
const series = new Series(tidy, "tidy", "line");
series.sort("Year", "descending");
let hcSeries = series.generateSeries(
  "Year",
  "PADD",
  colors,
  undefined,
  "Value"
);
console.log(hcSeries[0]);
