class Series {
  constructor(df, chartType = undefined) {
    this._df = df;
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
  /**
   * For best performance, data should be pre-filtered where possible. filter should only be called prior to generating a new series with "generateSeries"
   * @param {*} filterObj Object specifying key(s) (column name) and values (column value). A subset of the original data will be returned where the column name equals the value.
   */
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
  /**
   * For best performance, data should be pre-sorted. Sort should only be called prior to generating a new series with "generateSeries"
   * @param {*} by The column name to sort on. This column will typically be the data "index", such as a date.
   * @param {*} how Enter either "asc" (ascending order) or "desc" (descending order). Default is "asc"
   */
  sort(by, how = "asc") {
    let sortedData = [];
    if (how == "asc") {
      sortedData = this._df.slice().sort((a, b) => b[by] - a[by]);
    } else if (how == "desc") {
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

  #yValues(transform) {
    if (
      transform.hasOwnProperty("decimals") &&
      !transform.hasOwnProperty("operator")
    ) {
      return (r, c) =>
        r[c] !== null ? +r[c].toFixed(transform.decimals) : r[c];
    } else if (
      !transform.hasOwnProperty("decimals") &&
      !transform.hasOwnProperty("operator")
    ) {
      return (r, c) => r[c];
    } else if (transform.hasOwnProperty("operator")) {
      if (transform.hasOwnProperty("decimals")) {
        if (transform.operator == "*") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] * transform.conversion).toFixed(transform.decimals)
              : r[c];
        } else if (transform.operator == "/") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] / transform.conversion).toFixed(transform.decimals)
              : r[c];
        } else if (transform.conversion == "+") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] + transform.conversion).toFixed(transform.decimals)
              : r[c];
        } else if (transform.conversion == "-") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] - transform.conversion).toFixed(transform.decimals)
              : r[c];
        }
      } else {
        if (transform.operator == "*") {
          return (r, c) =>
            r[c] !== null ? +(r[c] * transform.conversion) : r[c];
        } else if (transform.operator == "/") {
          return (r, c) =>
            r[c] !== null ? +(r[c] / transform.conversion) : r[c];
        } else if (transform.conversion == "+") {
          return (r, c) =>
            r[c] !== null ? +(r[c] + transform.conversion) : r[c];
        } else if (transform.conversion == "-") {
          return (r, c) =>
            r[c] !== null ? +(r[c] - transform.conversion) : r[c];
        }
      }
    }
  }

  #nonTidyOperation(xCol, yCols, transform, colors, xName) {
    const seriesData = {};
    const colTotals = {};
    yCols.map((col) => {
      seriesData[col] = [];
      colTotals[col] = 0;
    });
    xName = this.#properxName(xName);
    const yOperator = this.#yValues(transform);
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

  #tidyOperation(xCol, yCols, transform, colors, valuesCol, xName) {
    const variableColumn = this.#getUnique(yCols);
    const yOperator = this.#yValues(transform);
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

  #findDataType(y, valuesCol) {
    if (Array.isArray(y) && valuesCol == undefined) {
      this._dataType = "non-tidy";
    } else {
      this._dataType = "tidy";
    }
  }
  /**
   *
   * @param {*} xCol The data column intended for the chart xAxis. Typically a date or category.
   * @param {*} yCols Non-tidy data: The column name(s) that will be shaped into serie(s) names and chart y-values. Tidy data: The column name that contains discrete categories that will be shaped into series names and chart y-values.
   * @param {*} transform Object defining the transformation parameters for the series y-values. Parameters include: decimals, conversion, operator
   * @param {*} valuesCol Required for tidy data. The column name that contains numeric data. Typically called "values, value, prices, etc"
   * @param {*} colors Optional object specifying custom colors for each series name specified in "yCols"
   * @param {*} xName Optional. A custom key/name for the series "x" values/categories. Defaults to "x" for most chart types.
   */
  generateSeries(
    xCol,
    yCols,
    transform = false,
    valuesCol = undefined, //only for tidy data with one numeric/values column.
    colors = undefined,
    xName = undefined
  ) {
    this.#findDataType(yCols, valuesCol);
    if (this._dataType == "non-tidy") {
      this._series = this.#nonTidyOperation(
        xCol,
        yCols,
        transform,
        colors,
        xName
      );
    } else {
      this._series = this.#tidyOperation(
        xCol,
        yCols,
        transform,
        colors,
        valuesCol,
        xName
      );
    }
    return this._series;
  }
}
module.exports = Series;
