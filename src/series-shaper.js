class Series {
  constructor({
    data,
    chartType = undefined,
    xCol = undefined,
    yCols = undefined,
    colors = undefined,
    zIndex = undefined,
    seriesTypes = undefined,
    filters = undefined,
    transform = undefined,
    valuesCol = undefined,
    xName = "x",
  }) {
    this._data = data;
    this._chartType = chartType;
    this._xCol = xCol;
    this._yCols = yCols;
    this._colors = colors;
    this._zIndex = zIndex;
    this._seriesTypes = seriesTypes;
    this._filters = filters;
    this._transform = transform;
    this._valuesCol = valuesCol;
    this._xName = xName;
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = newData;
  }

  get chartType() {
    return this._chartType;
  }

  set chartType(chartType) {
    this._chartType = chartType;
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

  get colors() {
    return this._colors;
  }

  set colors(newColors) {
    this._colors = newColors;
  }

  get zIndex() {
    return this._zIndex;
  }

  set zIndex(newZ) {
    this._zIndex = newZ;
  }

  get seriesTypes() {
    return this._seriesTypes;
  }

  set seriesTypes(newTypes) {
    this._seriesTypes = newTypes;
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

  /**
   *
   * @param {*} newParams Object specifying new parameters for your Series class. Typical pattern involves calling update and then generate.
   */
  update(newParams) {
    if (newParams.hasOwnProperty("data")) {
      this.data = newParams.data;
    }
    if (newParams.hasOwnProperty("chartType")) {
      this.chartType = newParams.chartType;
    }
    if (newParams.hasOwnProperty("xCol")) {
      this.xCol = newParams.xCol;
    }
    if (newParams.hasOwnProperty("yCols")) {
      this.yCols = newParams.yCols;
    }
    if (newParams.hasOwnProperty("colors")) {
      this.colors = newParams.colors;
    }
    if (newParams.hasOwnProperty("zIndex")) {
      this.zIndex = newParams.zIndex;
    }
    if (newParams.hasOwnProperty("filters")) {
      this.filters = newParams.filters;
    }
    if (newParams.hasOwnProperty("transform")) {
      this.transform = newParams.transform;
    }
    if (newParams.hasOwnProperty("valuesCol")) {
      this.valuesCol = newParams.valuesCol;
    }
    if (newParams.hasOwnProperty("xName")) {
      this.xName = newParams.xName;
    }
  }

  /**
   * For best performance, data should be pre-filtered where possible. filter should only be called prior to generating a new series with "generate"
   * @param {*} filterObj Object specifying key(s) (column name) and values (column value). A subset of the original data will be returned where the column name equals the value.
   */
  filter(filterObj) {
    for (const [key, value] of Object.entries(filterObj)) {
      if (!Array.isArray(value)) {
        this.data = this.data.filter((row) => row[key] == value);
      } else {
        value.map((filterValue) => {
          this.data = this.data.filter((row) => row[key] == filterValue);
        });
      }
    }
    return this.data;
  }
  /**
   * For best performance, data should be pre-sorted. Sort should only be called prior to generating a new series with "generate"
   * @param {*} by The column name to sort on. This column will typically be the data "index", such as a date.
   * @param {*} how Enter either "asc" (ascending order) or "desc" (descending order). Default is "asc"
   */
  sort(by, how = "asc") {
    let sortedData = [];
    if (how == "asc") {
      sortedData = this.data.slice().sort((a, b) => b[by] - a[by]);
    } else if (how == "desc") {
      sortedData = this.data.slice().sort((a, b) => a[by] - b[by]);
    }
    this.data = sortedData;
    return this.data;
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
    for (var item, i = 0; (item = this.data[i++]); ) {
      var name = item[filterColumns];
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }
    return result;
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

  #nonTidyOperation(xCol, yCols, transform, xName) {
    if (this.filters) {
      this.filter(this.filters);
    }
    const seriesData = {};
    const colTotals = {};
    yCols.map((col) => {
      seriesData[col] = [];
      colTotals[col] = 0;
    });
    this.#properxName(xName);
    const yOperator = this.#yValues(transform);
    this.data.map((row) => {
      yCols.map((col) => {
        seriesData[col].push({
          [this.xName]: row[xCol],
          y: yOperator(row, col),
        });
        colTotals[col] = colTotals[col] + row[col];
      });
    });
    return seriesData;
  }

  #tidyOperation(xCol, yCols, transform, valuesCol, xName) {
    if (this.filters) {
      this.filter(this.filters);
    }
    const variableColumn = this.#getUnique(yCols);
    const yOperator = this.#yValues(transform);
    this.#properxName(xName);
    const dataResult = {};
    const seriesData = variableColumn.map((v) => {
      const variableSeries = this.data.filter((row) => row[yCols] == v);
      const hcData = variableSeries.map((r) => {
        return {
          [this.xName]: r[xCol],
          y: yOperator(r, valuesCol),
        };
      });
      dataResult[v] = hcData;
    });
    return dataResult;
  }

  #addProperty(propertyName, source, target) {
    let newProperty = {};
    for (const [key, value] of Object.entries(target)) {
      newProperty[key] = { [propertyName]: value };
    }

    for (const [key, value] of Object.entries(newProperty)) {
      if (source.hasOwnProperty(key)) {
        source[key] = { ...source[key], ...newProperty[key] };
      } else {
        source[key] = newProperty[key];
      }
    }
    return source;
  }

  //TODO: change this to get series() or get hcdata() and remove series from constructor
  get hcSeries() {
    let newSeries = {};
    this.#findDataType(this.yCols, this.valuesCol);
    let dataResult = undefined;
    if (this.dataType == "non-tidy") {
      dataResult = this.#nonTidyOperation(
        this.xCol,
        this.yCols,
        this.transform,
        this.xName
      );
    } else {
      dataResult = this.#tidyOperation(
        this.xCol,
        this.yCols,
        this.transform,
        this.valuesCol,
        this.xName
      );
    }
    //add the series properties starting with data
    newSeries = this.#addProperty("data", newSeries, dataResult);
    if (this.colors) {
      newSeries = this.#addProperty("color", newSeries, this.colors);
    }
    if (this.zIndex) {
      newSeries = this.#addProperty("zIndex", newSeries, this.zIndex);
    }
    if (this.seriesTypes) {
      newSeries = this.#addProperty("type", newSeries, this.seriesTypes);
    }
    //convert the series into a list, adding the keys as series names:
    let seriesList = [];
    for (let [key, value] of Object.entries(newSeries)) {
      value.name = key;
      seriesList.push(value);
    }
    return seriesList;
  }
}
module.exports = Series;
