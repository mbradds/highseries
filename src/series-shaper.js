class Series {
  /**
   *
   * @param {Object} param0
   * @param {JSON} param0.data - User JSON data for chart.
   * @param {String} param0.xCol
   * @param {String|Array} param0.yCols
   * @param {String} param0.valuesCol
   * @param {Object} param0.colors
   * @param {Object} param0.names
   * @param {Object} param0.zIndex
   * @param {Object} param0.seriesTypes
   * @param {Object} param0.yAxis
   * @param {Object} param0.filters
   * @param {Object} param0.transform
   * @param {String} param0.xName
   */
  constructor({
    data,
    xCol,
    yCols,
    colors,
    names,
    zIndex,
    seriesTypes,
    yAxis,
    filters,
    transform = {
      decimals: undefined,
      conv: undefined,
    },
    valuesCol,
    xName = "x",
  }) {
    this._data = data;
    this._xCol = xCol;
    this._yCols = yCols;
    this._colors = colors;
    this._names = names;
    this._zIndex = zIndex;
    this._seriesTypes = seriesTypes;
    this._yAxis = yAxis;
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

  get yAxis() {
    return this._yAxis;
  }

  set yAxis(newyAxis) {
    this._yAxis = newyAxis;
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

  set transform(newTransform) {
    if (newTransform.hasOwnProperty("decimals")) {
      this._transform.decimals = newTransform.decimals;
    }
    if (newTransform.hasOwnProperty("conv")) {
      this._transform.conv = newTransform.conv;
    }
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
    if (how == "asc") {
      this.data = this.data.slice().sort((a, b) => b[by] - a[by]);
    } else if (how == "desc") {
      this.data = this.data.slice().sort((a, b) => a[by] - b[by]);
    }
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
    if (!transform.decimals && !transform.conv) {
      return (r, c) => r[c];
    } else if (transform.decimals && !transform.conv) {
      return (r, c) =>
        r[c] !== null ? +r[c].toFixed(transform.decimals) : r[c];
    } else if (transform.conv) {
      let conversion = transform.conv[0];
      let operator = transform.conv[1];
      if (transform.decimals) {
        if (operator == "*") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] * conversion).toFixed(transform.decimals)
              : r[c];
        } else if (operator == "/") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] / conversion).toFixed(transform.decimals)
              : r[c];
        } else if (operator == "+") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] + conversion).toFixed(transform.decimals)
              : r[c];
        } else if (conversion == "-") {
          return (r, c) =>
            r[c] !== null
              ? +(r[c] - conversion).toFixed(transform.decimals)
              : r[c];
        }
      } else {
        if (operator == "*") {
          return (r, c) => (r[c] !== null ? +(r[c] * conversion) : r[c]);
        } else if (operator == "/") {
          return (r, c) => (r[c] !== null ? +(r[c] / conversion) : r[c]);
        } else if (conversion == "+") {
          return (r, c) => (r[c] !== null ? +(r[c] + conversion) : r[c]);
        } else if (conversion == "-") {
          return (r, c) => (r[c] !== null ? +(r[c] - conversion) : r[c]);
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
    if (this.yAxis) {
      newSeries = this.#addProperty("yAxis", newSeries, this.yAxis);
    }
    //convert the series into a list, adding the keys as series names:
    let seriesList = [];
    for (let [key, value] of Object.entries(newSeries)) {
      if (this._names && this._names.hasOwnProperty(key)) {
        value.name = this._names[key];
      } else {
        value.name = key;
      }
      value.id = key;
      seriesList.push(value);
    }
    return seriesList;
  }
}
module.exports = Series;
