class Series {
  constructor({
    df,
    chartType = undefined,
    xCol = undefined,
    yCols = undefined,
    filters = undefined,
    transform = undefined,
    valuesCol = undefined,
    colors = undefined,
    xName = "x",
  }) {
    this._df = df;
    this._chartType = chartType;
    this._xCol = xCol;
    this._yCols = yCols;
    this._filters = filters;
    this._transform = transform;
    this._valuesCol = valuesCol;
    this._colors = colors;
    this._xName = xName;
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

  get colors() {
    return this._colors;
  }

  set colors(newColors) {
    this._colors = newColors;
  }

  get xCol() {
    return this._xCol;
  }

  set xCol(newxCol) {
    this._xCol = newxCol;
  }

  get yCols() {
    return this._yCols;
  }

  set yCols(newyCols) {
    this._yCols = newyCols;
  }

  get filters() {
    return this._filters;
  }

  set filters(newFilters) {
    this._filters = newFilters;
  }

  get transform() {
    return this._transform;
  }

  set transform(newtransform) {
    this._transform = newtransform;
  }

  get valuesCol() {
    return this._valuesCol;
  }

  set valuesCol(newvaluesCol) {
    this._valuesCol = newvaluesCol;
  }

  get xName() {
    return this._xName;
  }

  set xName(newxName) {
    this._xName = newxName;
  }

  get dataType() {
    return this._dataType;
  }

  set dataType(newDataType) {
    this._dataType = newDataType;
  }

  update({
    df = this._df,
    chartType = this._chartType,
    xCol = this._xCol,
    yCols = this._yCols,
    filters = this._filters,
    transform = this._transform,
    valuesCol = this._valuesCol,
    colors = this._colors,
    xName = this._xName,
  }) {
    this.df = df;
    this.chartType = chartType;
    this.xCol = xCol;
    this.yCols = yCols;
    this.filters = filters;
    this.transform = transform;
    this.valuesCol = valuesCol;
    this.colors = colors;
    this.xName = xName;
  }

  /**
   * For best performance, data should be pre-filtered where possible. filter should only be called prior to generating a new series with "generate"
   * @param {*} filterObj Object specifying key(s) (column name) and values (column value). A subset of the original data will be returned where the column name equals the value.
   */
  filter(filterObj) {
    for (const [key, value] of Object.entries(filterObj)) {
      if (!Array.isArray(value)) {
        this.df = this.df.filter((row) => row[key] == value);
      } else {
        value.map((filterValue) => {
          this.df = this.df.filter((row) => row[key] == filterValue);
        });
      }
    }
    return this.df;
  }
  /**
   * For best performance, data should be pre-sorted. Sort should only be called prior to generating a new series with "generate"
   * @param {*} by The column name to sort on. This column will typically be the data "index", such as a date.
   * @param {*} how Enter either "asc" (ascending order) or "desc" (descending order). Default is "asc"
   */
  sort(by, how = "asc") {
    let sortedData = [];
    if (how == "asc") {
      sortedData = this.df.slice().sort((a, b) => b[by] - a[by]);
    } else if (how == "desc") {
      sortedData = this.df.slice().sort((a, b) => a[by] - b[by]);
    }
    this.df = sortedData;
    return this.df;
  }

  #findDataType(y, valuesCol) {
    if (Array.isArray(y) && valuesCol == undefined) {
      this._dataType = "non-tidy";
    } else {
      this._dataType = "tidy";
    }
  }

  #getUnique(filterColumns) {
    var lookup = {};
    var result = [];
    for (var item, i = 0; (item = this.df[i++]); ) {
      var name = item[filterColumns];
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result;
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
      this.xName = "x";
      return "x";
    } else if (["line", "area"].includes(this._chartType)) {
      this.xName = "x";
    } //TODO: add more chart types here
  }

  #yValues(transform) {
    if (!transform) {
      return (r, c) => r[c];
    } else if (
      transform &&
      transform.hasOwnProperty("decimals") &&
      !transform.hasOwnProperty("operator")
    ) {
      return (r, c) =>
        r[c] !== null ? +r[c].toFixed(transform.decimals) : r[c];
    } else if (transform && transform.hasOwnProperty("operator")) {
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
    this.#properxName(xName);
    const yOperator = this.#yValues(transform);
    this.df.map((row) => {
      yCols.map((col) => {
        seriesData[col].push({
          [this.xName]: row[xCol],
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
    this.#properxName(xName);
    const seriesData = variableColumn.map((v) => {
      const variableSeries = this.df.filter((row) => row[yCols] == v);
      const hcData = variableSeries.map((r) => {
        return {
          [this.xName]: r[xCol],
          y: yOperator(r, valuesCol),
        };
      });
      return seriesOperator(v, hcData, colors);
    });

    return seriesData;
  }

  generate() {
    this.#findDataType(this.yCols, this.valuesCol);
    if (this.filters) {
      this.filter(this.filters);
    }
    if (this.dataType == "non-tidy") {
      this._series = this.#nonTidyOperation(
        this.xCol,
        this.yCols,
        this.transform,
        this.colors,
        this.xName
      );
    } else {
      this._series = this.#tidyOperation(
        this.xCol,
        this.yCols,
        this.transform,
        this.colors,
        this.valuesCol,
        this.xName
      );
    }
    return this._series;
  }
}
module.exports = Series;
