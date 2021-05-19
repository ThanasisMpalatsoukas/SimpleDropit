/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/helpers.js
// Helper functions
function getElementDocument(element) {
  if (!element || !element.ownerDocument) {
    return document;
  }

  return element.ownerDocument;
}
function hasClass(element, className) {
  if (element) {
    return element.classList.contains(className);
  } else {
    return null;
  }
}
function triggerClick(element) {
  if (element.click) {
    element.click();
  } else if (document.createEvent) {
    var eventObj = document.createEvent('MouseEvents');
    eventObj.initEvent('click', true, true);
    element.dispatchEvent(eventObj);
  }
}
;// CONCATENATED MODULE: ./src/index.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var SimpleDropit = /*#__PURE__*/function () {
  /**
   * SimpleDropit Object
   * @param {String} selector Element object
   * @param {Object} options User options
   */
  function SimpleDropit(selector, options) {
    var _this = this;

    _classCallCheck(this, SimpleDropit);

    _defineProperty(this, "isAdvancedUpload", function () {
      var div = document.createElement('div');
      return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && 'FormData' in window && 'FileReader' in window;
    });

    _defineProperty(this, "onChange", function (event) {
      _this.boxEl.classList.add('is-dropped');

      SimpleDropit.showFiles(_this.filenameEl, event.target.files);
    });

    _defineProperty(this, "dragIn", function (event) {
      if (!hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.add('is-dragover');
    });

    _defineProperty(this, "dragOut", function (event) {
      if (hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.remove('is-dragover');
    });

    _defineProperty(this, "drop", function (event) {
      _this.boxEl.classList.add('is-dropped');

      _this.droppedFiles = event.dataTransfer.files;
      SimpleDropit.showFiles(_this.filenameEl, _this.droppedFiles);
    });

    _defineProperty(this, "preventEventPropagation", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });

    try {
      if (typeof selector === 'string') {
        throw new Error('Invalid Element Object.');
      } else if (_typeof(selector) === 'object' && selector !== null) {
        this.el = selector;
      } else {
        throw new Error('Element Object does not exists.');
      }
    } catch (error) {
      console.error(error.name + ': ' + error.message);
      return;
    }

    this.options = _objectSpread(_objectSpread({}, SimpleDropit.defaultOptions), options);
    this.classNames = _objectSpread(_objectSpread({}, SimpleDropit.defaultOptions.classNames), this.options.classNames);

    if (SimpleDropit.instances.has(this.el)) {
      return;
    }

    this.init();
  }

  _createClass(SimpleDropit, [{
    key: "init",
    value: function init() {
      // Save a reference to the instance, so we know this DOM node has already been instanciated
      SimpleDropit.instances.set(this.el, this);
      this.initDom();
      this.initListeners();
    }
  }, {
    key: "initDom",
    value: function initDom() {
      // Assuring this element doesn't have the wrapper elements yet
      if (this.el.closest('.' + this.classNames.boxEl) !== null) {
        // Assume that element has his DOM already initiated
        this.boxEl = this.el.closest('.' + this.classNames.boxEl);
        this.boxWrapperEl = this.boxEl.querySelector('.' + this.classNames.boxWrapperEl);
        this.labelWrapperEl = this.boxEl.querySelector('.' + this.classNames.labelWrapperEl);
        this.supportedLabelEl = this.boxEl.querySelector('.' + this.classNames.supportedLabelEl);
        this.filenameEl = this.boxEl.querySelector('.' + this.classNames.filenameEl);
        this.browseLabelEl = this.boxEl.querySelector('.' + this.classNames.browseLabelEl);
      } else {
        // Prepare DOM
        var elClone = this.el.cloneNode(true);
        this.boxEl = document.createElement('div');
        this.boxWrapperEl = document.createElement('div');
        this.labelWrapperEl = document.createElement('div');
        this.supportedLabelEl = document.createElement('span');
        this.filenameEl = document.createElement('span');
        this.browseLabelEl = document.createElement('label');
        this.boxEl.classList.add(this.classNames.boxEl);
        this.boxWrapperEl.classList.add(this.classNames.boxWrapperEl);
        this.labelWrapperEl.classList.add(this.classNames.labelWrapperEl);
        this.supportedLabelEl.classList.add(this.classNames.supportedLabelEl);
        this.filenameEl.classList.add(this.classNames.filenameEl);
        this.browseLabelEl.classList.add(this.classNames.browseLabelEl);
        this.el.classList.add('sdd-file-input', 'sdd-file-input-hide');
        this.supportedLabelEl.innerHTML = this.options.supportedLabel + '&nbsp;';
        this.labelWrapperEl.appendChild(this.supportedLabelEl);
        this.labelWrapperEl.appendChild(this.filenameEl);
        this.browseLabelEl.innerHTML = 'Browse <span class="sdd-box-browse-file">File</span></span>';
        this.labelWrapperEl.appendChild(this.browseLabelEl);
        this.labelWrapperEl.appendChild(elClone);
        this.boxWrapperEl.appendChild(this.labelWrapperEl);
        this.boxEl.appendChild(this.boxWrapperEl);
        this.el.after(this.boxEl);
        this.el.remove();
        this.el = elClone;
      }

      if (this.isAdvancedUpload) {
        this.boxEl.classList.add('sdd-advanced-upload');
      }
    }
  }, {
    key: "initListeners",
    value: function initListeners() {
      var _this2 = this;

      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (e) {
        getElementDocument(_this2.boxEl).addEventListener(e, _this2.preventEventPropagation, false);

        _this2.boxEl.addEventListener(e, _this2.preventEventPropagation, false);
      });
      ['dragenter', 'dragover'].forEach(function (e) {
        getElementDocument(_this2.boxEl).addEventListener(e, _this2.dragIn, true);
      });
      ['dragleave', 'drop'].forEach(function (e) {
        getElementDocument(_this2.boxEl).addEventListener(e, _this2.dragOut, true);
      });
      this.boxEl.addEventListener('drop', this.drop, true);
      this.el.addEventListener('change', this.onChange, true);
      this.browseLabelEl.addEventListener('click', function (event) {
        triggerClick(_this2.el);
      });
    }
  }], [{
    key: "showFiles",
    value: function showFiles(el, files) {
      el.innerText = files.length > 1 ? files.length + ' files selected / ' : files[0].name + ' / ';
    }
  }]);

  return SimpleDropit;
}();

_defineProperty(SimpleDropit, "instances", new WeakMap());

_defineProperty(SimpleDropit, "defaultOptions", {
  supportedLabel: 'Drag & Drop file or',
  classNames: {
    boxEl: 'sdd-input-file-box',
    boxWrapperEl: 'sdd-input-file-box-wrapper',
    labelWrapperEl: 'sdd-input-file-label',
    supportedLabelEl: 'sdd-box-dragndrop',
    filenameEl: 'sdd-box-file-name',
    browseLabelEl: 'sdd-label'
  }
});

/* harmony default export */ const src = (SimpleDropit);
;// CONCATENATED MODULE: ./dev/index.js

var simpleDropit1 = new src(document.getElementById('sdd-fileinput2'));
var simpleDropit2 = new src(document.getElementById('sdd-fileinput1'));
/******/ })()
;
//# sourceMappingURL=bundle.js.map