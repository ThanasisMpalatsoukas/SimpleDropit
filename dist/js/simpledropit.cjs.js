/**
 * SimpleDropit.js - v0.1.0
 * Drag-n-drop files, Simple for modern browsers
 * https://nishantk02.github.io/SimpleDropit
 *
 * Made by Nishant K
 * Under MIT License
 */

'use strict';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

var SimpleDropit = /*#__PURE__*/function () {
  /**
   * SimpleDropit Object
   * @param {String} selector Element object
   * @param {Object} options User options
   */
  function SimpleDropit(selector, options) {
    var _this = this;

    this.isAdvancedUpload = function () {
      var div = document.createElement('div');
      return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && 'FormData' in window && 'FileReader' in window;
    };

    this.onChange = function (event) {
      _this.boxEl.classList.add('is-dropped');

      SimpleDropit.showFiles(_this.filenameEl, event.target.files);
    };

    this.dragIn = function (event) {
      if (!hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.add('is-dragover');
    };

    this.dragOut = function (event) {
      if (hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.remove('is-dragover');
    };

    this.drop = function (event) {
      _this.boxEl.classList.add('is-dropped');

      _this.droppedFiles = event.dataTransfer.files;
      SimpleDropit.showFiles(_this.filenameEl, _this.droppedFiles);
    };

    this.preventEventPropagation = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };

    try {
      if (typeof selector === 'string') {
        throw new Error('Invalid Element Object.');
      } else if (typeof selector === 'object' && selector !== null) {
        this.el = selector;
      } else {
        throw new Error('Element Object does not exists.');
      }
    } catch (error) {
      console.error(error.name + ': ' + error.message);
      return;
    }

    this.options = _extends({}, SimpleDropit.defaultOptions, options);
    this.classNames = _extends({}, SimpleDropit.defaultOptions.classNames, this.options.classNames);

    if (SimpleDropit.instances.has(this.el)) {
      return;
    }

    this.init();
  }

  var _proto = SimpleDropit.prototype;

  _proto.init = function init() {
    // Save a reference to the instance, so we know this DOM node has already been instanciated
    SimpleDropit.instances.set(this.el, this);
    this.initDom();
    this.initListeners();
  };

  _proto.initDom = function initDom() {
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
      this.el.classList.add('sd-file-input', 'sd-file-input-hide');
      this.supportedLabelEl.innerHTML = this.options.supportedLabel + '&nbsp;';
      this.labelWrapperEl.appendChild(this.supportedLabelEl);
      this.labelWrapperEl.appendChild(this.filenameEl);
      this.browseLabelEl.innerHTML = 'Browse <span class="sd-box-browse-file">File</span></span>';
      this.labelWrapperEl.appendChild(this.browseLabelEl);
      this.labelWrapperEl.appendChild(elClone);
      this.boxWrapperEl.appendChild(this.labelWrapperEl);
      this.boxEl.appendChild(this.boxWrapperEl);
      this.el.after(this.boxEl);
      this.el.remove();
      this.el = elClone;
    }

    if (this.isAdvancedUpload) {
      this.boxEl.classList.add('sd-advanced-upload');
    }
  };

  _proto.initListeners = function initListeners() {
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
  };

  SimpleDropit.showFiles = function showFiles(el, files) {
    el.innerText = files.length > 1 ? files.length + ' files selected / ' : files[0].name + ' / ';
  };

  return SimpleDropit;
}();

SimpleDropit.instances = new WeakMap();
SimpleDropit.defaultOptions = {
  supportedLabel: 'Drop file here /',
  classNames: {
    boxEl: 'sd-box',
    boxWrapperEl: 'sd-box-wrapper',
    labelWrapperEl: 'sd-label',
    supportedLabelEl: 'sd-box-dragndrop',
    filenameEl: 'sd-box-file-name',
    browseLabelEl: 'sd-label'
  }
};

module.exports = SimpleDropit;
