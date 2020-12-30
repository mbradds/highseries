"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var _findDataType = _classPrivateFieldLooseKey("findDataType");

var _getUnique = _classPrivateFieldLooseKey("getUnique");

var _properxName = _classPrivateFieldLooseKey("properxName");

var _yValues = _classPrivateFieldLooseKey("yValues");

var _nonTidyOperation = _classPrivateFieldLooseKey("nonTidyOperation");

var _tidyOperation = _classPrivateFieldLooseKey("tidyOperation");

var _addProperty = _classPrivateFieldLooseKey("addProperty");

var Series = /*#__PURE__*/function () {
  /**
   *
   * @param {Object} param0
   * @param {JSON} param0.data - User JSON data for chart.
   * @param {String} param0.xCol
   * @param {String|Array} param0.yCols
   * @param {String} param0.valuesCol
   * @param {Object} param0.colors
   * @param {Object} param0.zIndex
   * @param {Object} param0.seriesTypes
   * @param {Object} param0.yAxis
   * @param {Object} param0.filters
   * @param {Object} param0.transform
   * @param {String} param0.xName
   */
  function Series(_ref) {
    var data = _ref.data,
        _xCol = _ref.xCol,
        _yCols = _ref.yCols,
        colors = _ref.colors,
        zIndex = _ref.zIndex,
        seriesTypes = _ref.seriesTypes,
        yAxis = _ref.yAxis,
        filters = _ref.filters,
        _ref$transform = _ref.transform,
        _transform = _ref$transform === void 0 ? {
      decimals: undefined,
      conv: undefined
    } : _ref$transform,
        _valuesCol = _ref.valuesCol,
        _ref$xName = _ref.xName,
        _xName = _ref$xName === void 0 ? "x" : _ref$xName;

    _classCallCheck(this, Series);

    Object.defineProperty(this, _addProperty, {
      value: _addProperty2
    });
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
    Object.defineProperty(this, _getUnique, {
      value: _getUnique2
    });
    Object.defineProperty(this, _findDataType, {
      value: _findDataType2
    });
    this._data = data;
    this._xCol = _xCol;
    this._yCols = _yCols;
    this._colors = colors;
    this._zIndex = zIndex;
    this._seriesTypes = seriesTypes;
    this._yAxis = yAxis;
    this._filters = filters;
    this._transform = _transform;
    this._valuesCol = _valuesCol;
    this._xName = _xName;
  }

  _createClass(Series, [{
    key: "update",

    /**
     *
     * @param {*} newParams Object specifying new parameters for your Series class. Typical pattern involves calling update and then generate.
     */
    value: function update(newParams) {
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

  }, {
    key: "filter",
    value: function filter(filterObj) {
      var _this = this;

      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (!Array.isArray(value)) {
          _this.data = _this.data.filter(function (row) {
            return row[key] == value;
          });
        } else {
          value.map(function (filterValue) {
            _this.data = _this.data.filter(function (row) {
              return row[key] == filterValue;
            });
          });
        }
      };

      for (var _i = 0, _Object$entries = Object.entries(filterObj); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return this.data;
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

      if (how == "asc") {
        this.data = this.data.slice().sort(function (a, b) {
          return b[by] - a[by];
        });
      } else if (how == "desc") {
        this.data = this.data.slice().sort(function (a, b) {
          return a[by] - b[by];
        });
      }

      return this.data;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(newData) {
      this._data = newData;
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
    key: "colors",
    get: function get() {
      return this._colors;
    },
    set: function set(newColors) {
      this._colors = newColors;
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this._zIndex;
    },
    set: function set(newZ) {
      this._zIndex = newZ;
    }
  }, {
    key: "seriesTypes",
    get: function get() {
      return this._seriesTypes;
    },
    set: function set(newTypes) {
      this._seriesTypes = newTypes;
    }
  }, {
    key: "yAxis",
    get: function get() {
      return this._yAxis;
    },
    set: function set(newyAxis) {
      this._yAxis = newyAxis;
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
    set: function set(newTransform) {
      if (newTransform.hasOwnProperty("decimals")) {
        this._transform.decimals = newTransform.decimals;
      }

      if (newTransform.hasOwnProperty("conv")) {
        this._transform.conv = newTransform.conv;
      }
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
  }, {
    key: "hcSeries",
    //TODO: change this to get series() or get hcdata() and remove series from constructor
    get: function get() {
      var newSeries = {};

      _classPrivateFieldLooseBase(this, _findDataType)[_findDataType](this.yCols, this.valuesCol);

      var dataResult = undefined;

      if (this.dataType == "non-tidy") {
        dataResult = _classPrivateFieldLooseBase(this, _nonTidyOperation)[_nonTidyOperation](this.xCol, this.yCols, this.transform, this.xName);
      } else {
        dataResult = _classPrivateFieldLooseBase(this, _tidyOperation)[_tidyOperation](this.xCol, this.yCols, this.transform, this.valuesCol, this.xName);
      } //add the series properties starting with data


      newSeries = _classPrivateFieldLooseBase(this, _addProperty)[_addProperty]("data", newSeries, dataResult);

      if (this.colors) {
        newSeries = _classPrivateFieldLooseBase(this, _addProperty)[_addProperty]("color", newSeries, this.colors);
      }

      if (this.zIndex) {
        newSeries = _classPrivateFieldLooseBase(this, _addProperty)[_addProperty]("zIndex", newSeries, this.zIndex);
      }

      if (this.seriesTypes) {
        newSeries = _classPrivateFieldLooseBase(this, _addProperty)[_addProperty]("type", newSeries, this.seriesTypes);
      }

      if (this.yAxis) {
        newSeries = _classPrivateFieldLooseBase(this, _addProperty)[_addProperty]("yAxis", newSeries, this.yAxis);
      } //convert the series into a list, adding the keys as series names:


      var seriesList = [];

      for (var _i2 = 0, _Object$entries2 = Object.entries(newSeries); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        value.name = key;
        seriesList.push(value);
      }

      return seriesList;
    }
  }]);

  return Series;
}();

var _findDataType2 = function _findDataType2(y, valuesCol) {
  if (Array.isArray(y) && valuesCol == undefined) {
    this._dataType = "non-tidy";
  } else {
    this._dataType = "tidy";
  }
};

var _getUnique2 = function _getUnique2(filterColumns) {
  var lookup = {};
  var result = [];

  for (var item, i = 0; item = this.data[i++];) {
    var name = item[filterColumns];

    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
    }
  }

  return result;
};

var _properxName2 = function _properxName2(xName) {
  if (xName !== undefined) {
    return xName;
  }

  if (this._chartType == undefined) {
    this.xName = "x";
    return "x";
  } else if (["line", "area"].includes(this._chartType)) {
    this.xName = "x";
  } //TODO: add more chart types here

};

var _yValues2 = function _yValues2(transform) {
  if (!transform.decimals && !transform.conv) {
    return function (r, c) {
      return r[c];
    };
  } else if (transform.decimals && !transform.conv) {
    return function (r, c) {
      return r[c] !== null ? +r[c].toFixed(transform.decimals) : r[c];
    };
  } else if (transform.conv) {
    var conversion = transform.conv[0];
    var operator = transform.conv[1];

    if (transform.decimals) {
      if (operator == "*") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] * conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (operator == "/") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] / conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (operator == "+") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] + conversion).toFixed(transform.decimals) : r[c];
        };
      } else if (conversion == "-") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] - conversion).toFixed(transform.decimals) : r[c];
        };
      }
    } else {
      if (operator == "*") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] * conversion) : r[c];
        };
      } else if (operator == "/") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] / conversion) : r[c];
        };
      } else if (conversion == "+") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] + conversion) : r[c];
        };
      } else if (conversion == "-") {
        return function (r, c) {
          return r[c] !== null ? +(r[c] - conversion) : r[c];
        };
      }
    }
  }
};

var _nonTidyOperation2 = function _nonTidyOperation2(xCol, yCols, transform, xName) {
  var _this2 = this;

  if (this.filters) {
    this.filter(this.filters);
  }

  var seriesData = {};
  var colTotals = {};
  yCols.map(function (col) {
    seriesData[col] = [];
    colTotals[col] = 0;
  });

  _classPrivateFieldLooseBase(this, _properxName)[_properxName](xName);

  var yOperator = _classPrivateFieldLooseBase(this, _yValues)[_yValues](transform);

  this.data.map(function (row) {
    yCols.map(function (col) {
      var _seriesData$col$push;

      seriesData[col].push((_seriesData$col$push = {}, _defineProperty(_seriesData$col$push, _this2.xName, row[xCol]), _defineProperty(_seriesData$col$push, "y", yOperator(row, col)), _seriesData$col$push));
      colTotals[col] = colTotals[col] + row[col];
    });
  });
  return seriesData;
};

var _tidyOperation2 = function _tidyOperation2(xCol, yCols, transform, valuesCol, xName) {
  var _this3 = this;

  if (this.filters) {
    this.filter(this.filters);
  }

  var variableColumn = _classPrivateFieldLooseBase(this, _getUnique)[_getUnique](yCols);

  var yOperator = _classPrivateFieldLooseBase(this, _yValues)[_yValues](transform);

  _classPrivateFieldLooseBase(this, _properxName)[_properxName](xName);

  var dataResult = {};
  var seriesData = variableColumn.map(function (v) {
    var variableSeries = _this3.data.filter(function (row) {
      return row[yCols] == v;
    });

    var hcData = variableSeries.map(function (r) {
      var _ref2;

      return _ref2 = {}, _defineProperty(_ref2, _this3.xName, r[xCol]), _defineProperty(_ref2, "y", yOperator(r, valuesCol)), _ref2;
    });
    dataResult[v] = hcData;
  });
  return dataResult;
};

var _addProperty2 = function _addProperty2(propertyName, source, target) {
  var newProperty = {};

  for (var _i3 = 0, _Object$entries3 = Object.entries(target); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];

    newProperty[key] = _defineProperty({}, propertyName, value);
  }

  for (var _i4 = 0, _Object$entries4 = Object.entries(newProperty); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        _key = _Object$entries4$_i[0],
        _value = _Object$entries4$_i[1];

    if (source.hasOwnProperty(_key)) {
      source[_key] = _objectSpread(_objectSpread({}, source[_key]), newProperty[_key]);
    } else {
      source[_key] = newProperty[_key];
    }
  }

  return source;
};

module.exports = Series;
