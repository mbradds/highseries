"use strict";

var _findDataType, _getUnique, _seriesProperties, _properxName, _yValues, _nonTidyOperation, _tidyOperation, _temp, _findDataType2, _getUnique2, _seriesProperties2, _properxName2, _yValues2, _nonTidyOperation2, _tidyOperation2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

module.exports = (_temp = (_findDataType = _classPrivateFieldLooseKey("findDataType"), _getUnique = _classPrivateFieldLooseKey("getUnique"), _seriesProperties = _classPrivateFieldLooseKey("seriesProperties"), _properxName = _classPrivateFieldLooseKey("properxName"), _yValues = _classPrivateFieldLooseKey("yValues"), _nonTidyOperation = _classPrivateFieldLooseKey("nonTidyOperation"), _tidyOperation = _classPrivateFieldLooseKey("tidyOperation"), /*#__PURE__*/function () {
  function Series(_ref) {
    var df = _ref.df,
        _ref$chartType = _ref.chartType,
        chartType = _ref$chartType === void 0 ? undefined : _ref$chartType,
        _ref$xCol = _ref.xCol,
        _xCol = _ref$xCol === void 0 ? undefined : _ref$xCol,
        _ref$yCols = _ref.yCols,
        _yCols = _ref$yCols === void 0 ? undefined : _ref$yCols,
        _ref$filters = _ref.filters,
        filters = _ref$filters === void 0 ? undefined : _ref$filters,
        _ref$transform = _ref.transform,
        _transform = _ref$transform === void 0 ? undefined : _ref$transform,
        _ref$valuesCol = _ref.valuesCol,
        _valuesCol = _ref$valuesCol === void 0 ? undefined : _ref$valuesCol,
        _ref$colors = _ref.colors,
        _colors = _ref$colors === void 0 ? undefined : _ref$colors,
        _ref$xName = _ref.xName,
        _xName = _ref$xName === void 0 ? "x" : _ref$xName;

    _classCallCheck(this, Series);

    Object.defineProperty(this, _tidyOperation, {
      value: _tidyOperation2
    });
    Object.defineProperty(this, _nonTidyOperation, {
      value: _nonTidyOperation2
    });
    Object.defineProperty(this, _yValues, {
      value: _yValues2
    });
    Object.defineProperty(this, _properxName, {
      value: _properxName2
    });
    Object.defineProperty(this, _seriesProperties, {
      value: _seriesProperties2
    });
    Object.defineProperty(this, _getUnique, {
      value: _getUnique2
    });
    Object.defineProperty(this, _findDataType, {
      value: _findDataType2
    });
    this._df = df;
    this._chartType = chartType;
    this._xCol = _xCol;
    this._yCols = _yCols;
    this._filters = filters;
    this._transform = _transform;
    this._valuesCol = _valuesCol;
    this._colors = _colors;
    this._xName = _xName;
    this._series = undefined;
  }

  _createClass(Series, [{
    key: "update",
    value: function update(_ref2) {
      var _ref2$df = _ref2.df,
          df = _ref2$df === void 0 ? this._df : _ref2$df,
          _ref2$chartType = _ref2.chartType,
          chartType = _ref2$chartType === void 0 ? this._chartType : _ref2$chartType,
          _ref2$xCol = _ref2.xCol,
          xCol = _ref2$xCol === void 0 ? this._xCol : _ref2$xCol,
          _ref2$yCols = _ref2.yCols,
          yCols = _ref2$yCols === void 0 ? this._yCols : _ref2$yCols,
          _ref2$filters = _ref2.filters,
          filters = _ref2$filters === void 0 ? this._filters : _ref2$filters,
          _ref2$transform = _ref2.transform,
          transform = _ref2$transform === void 0 ? this._transform : _ref2$transform,
          _ref2$valuesCol = _ref2.valuesCol,
          valuesCol = _ref2$valuesCol === void 0 ? this._valuesCol : _ref2$valuesCol,
          _ref2$colors = _ref2.colors,
          colors = _ref2$colors === void 0 ? this._colors : _ref2$colors,
          _ref2$xName = _ref2.xName,
          xName = _ref2$xName === void 0 ? this._xName : _ref2$xName;
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

  }, {
    key: "filter",
    value: function filter(filterObj) {
      var _this = this;

      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (!Array.isArray(value)) {
          _this.df = _this.df.filter(function (row) {
            return row[key] == value;
          });
        } else {
          value.map(function (filterValue) {
            _this.df = _this.df.filter(function (row) {
              return row[key] == filterValue;
            });
          });
        }
      };

      for (var _i = 0, _Object$entries = Object.entries(filterObj); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return this.df;
    }
    /**
     * For best performance, data should be pre-sorted. Sort should only be called prior to generating a new series with "generate"
     * @param {*} by The column name to sort on. This column will typically be the data "index", such as a date.
     * @param {*} how Enter either "asc" (ascending order) or "desc" (descending order). Default is "asc"
     */

  }, {
    key: "sort",
    value: function sort(by) {
      var how = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";
      var sortedData = [];

      if (how == "asc") {
        sortedData = this.df.slice().sort(function (a, b) {
          return b[by] - a[by];
        });
      } else if (how == "desc") {
        sortedData = this.df.slice().sort(function (a, b) {
          return a[by] - b[by];
        });
      }

      this.df = sortedData;
      return this.df;
    }
  }, {
    key: "generate",
    value: function generate() {
      _classPrivateFieldLooseBase(this, _findDataType)[_findDataType](this.yCols, this.valuesCol);

      if (this.filters) {
        this.filter(this.filters);
      }

      if (this.dataType == "non-tidy") {
        this._series = _classPrivateFieldLooseBase(this, _nonTidyOperation)[_nonTidyOperation](this.xCol, this.yCols, this.transform, this.colors, this.xName);
      } else {
        this._series = _classPrivateFieldLooseBase(this, _tidyOperation)[_tidyOperation](this.xCol, this.yCols, this.transform, this.colors, this.valuesCol, this.xName);
      }

      return this._series;
    }
  }, {
    key: "df",
    get: function get() {
      return this._df;
    },
    set: function set(newData) {
      this._df = newData;
    }
  }, {
    key: "chartType",
    get: function get() {
      return this._chartType;
    },
    set: function set(chartType) {
      this._chartType = chartType;
    }
  }, {
    key: "colors",
    get: function get() {
      return this._colors;
    },
    set: function set(newColors) {
      this._colors = newColors;
    }
  }, {
    key: "xCol",
    get: function get() {
      return this._xCol;
    },
    set: function set(newxCol) {
      this._xCol = newxCol;
    }
  }, {
    key: "yCols",
    get: function get() {
      return this._yCols;
    },
    set: function set(newyCols) {
      this._yCols = newyCols;
    }
  }, {
    key: "filters",
    get: function get() {
      return this._filters;
    },
    set: function set(newFilters) {
      this._filters = newFilters;
    }
  }, {
    key: "transform",
    get: function get() {
      return this._transform;
    },
    set: function set(newtransform) {
      this._transform = newtransform;
    }
  }, {
    key: "valuesCol",
    get: function get() {
      return this._valuesCol;
    },
    set: function set(newvaluesCol) {
      this._valuesCol = newvaluesCol;
    }
  }, {
    key: "xName",
    get: function get() {
      return this._xName;
    },
    set: function set(newxName) {
      this._xName = newxName;
    }
  }, {
    key: "dataType",
    get: function get() {
      return this._dataType;
    },
    set: function set(newDataType) {
      this._dataType = newDataType;
    }
  }]);

  return Series;
}()), _findDataType2 = function _findDataType2(y, valuesCol) {
  if (Array.isArray(y) && valuesCol == undefined) {
    this._dataType = "non-tidy";
  } else {
    this._dataType = "tidy";
  }
}, _getUnique2 = function _getUnique2(filterColumns) {
  var lookup = {};
  var result = [];

  for (var item, i = 0; item = this.df[i++];) {
    var name = item[filterColumns];

    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
    }
  }

  return result;
}, _seriesProperties2 = function _seriesProperties2(colors) {
  if (colors !== undefined) {
    return function (seriesName, seriesData, customColors) {
      return {
        name: seriesName,
        data: seriesData,
        color: customColors[seriesName]
      };
    };
  } else {
    return function (seriesName, seriesData, customColors) {
      return {
        name: seriesName,
        data: seriesData
      };
    };
  }
}, _properxName2 = function _properxName2(xName) {
  if (xName !== undefined) {
    return xName;
  }

  if (this._chartType == undefined) {
    this.xName = "x";
    return "x";
  } else if (["line", "area"].includes(this._chartType)) {
    this.xName = "x";
  } //TODO: add more chart types here

}, _yValues2 = function _yValues2(transform) {
  if (!transform) {
    return function (r, c) {
      return r[c];
    };
  } else if (transform && transform.hasOwnProperty("decimals") && !transform.hasOwnProperty("operator")) {
    return function (r, c) {
      return r[c] !== null ? +r[c].toFixed(transform.decimals) : r[c];
    };
  } else if (transform && transform.hasOwnProperty("operator")) {
    if (transform.hasOwnProperty("decimals")) {
      if (transform.operator == "*") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] * transform.conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (transform.operator == "/") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] / transform.conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (transform.conversion == "+") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] + transform.conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (transform.conversion == "-") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] - transform.conversion).toFixed(transform.decimals) : r[c];
        };
      }
    } else {
      if (transform.operator == "*") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] * transform.conversion) : r[c];
        };
      } else if (transform.operator == "/") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] / transform.conversion) : r[c];
        };
      } else if (transform.conversion == "+") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] + transform.conversion) : r[c];
        };
      } else if (transform.conversion == "-") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] - transform.conversion) : r[c];
        };
      }
    }
  }
}, _nonTidyOperation2 = function _nonTidyOperation2(xCol, yCols, transform, colors, xName) {
  var _this2 = this;

  var seriesData = {};
  var colTotals = {};
  yCols.map(function (col) {
    seriesData[col] = [];
    colTotals[col] = 0;
  });

  _classPrivateFieldLooseBase(this, _properxName)[_properxName](xName);

  var yOperator = _classPrivateFieldLooseBase(this, _yValues)[_yValues](transform);

  this.df.map(function (row) {
    yCols.map(function (col) {
      var _seriesData$col$push;

      seriesData[col].push((_seriesData$col$push = {}, _defineProperty(_seriesData$col$push, _this2.xName, row[xCol]), _defineProperty(_seriesData$col$push, "y", yOperator(row, col)), _seriesData$col$push));
      colTotals[col] = colTotals[col] + row[col];
    });
  });
  var seriesResult = [];

  var seriesOperator = _classPrivateFieldLooseBase(this, _seriesProperties)[_seriesProperties](colors);

  for (var _i2 = 0, _Object$entries2 = Object.entries(seriesData); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    if (colTotals[key] !== 0) {
      seriesResult.push(seriesOperator(key, value, colors));
    }
  }

  return seriesResult;
}, _tidyOperation2 = function _tidyOperation2(xCol, yCols, transform, colors, valuesCol, xName) {
  var _this3 = this;

  var variableColumn = _classPrivateFieldLooseBase(this, _getUnique)[_getUnique](yCols);

  var yOperator = _classPrivateFieldLooseBase(this, _yValues)[_yValues](transform);

  var seriesOperator = _classPrivateFieldLooseBase(this, _seriesProperties)[_seriesProperties](colors);

  _classPrivateFieldLooseBase(this, _properxName)[_properxName](xName);

  var seriesData = variableColumn.map(function (v) {
    var variableSeries = _this3.df.filter(function (row) {
      return row[yCols] == v;
    });

    var hcData = variableSeries.map(function (r) {
      var _ref3;

      return _ref3 = {}, _defineProperty(_ref3, _this3.xName, r[xCol]), _defineProperty(_ref3, "y", yOperator(r, valuesCol)), _ref3;
    });
    return seriesOperator(v, hcData, colors);
  });
  return seriesData;
}, _temp);
