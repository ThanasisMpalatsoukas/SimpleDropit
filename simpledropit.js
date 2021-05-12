/**
 * SimpleDropit.js - v1.0.0
 * Drag-n-drop files, Simple for modern browsers.
 * https://nishantk02.github.io/simple-dropit/
 *
 * Made by Nishant K
 * Under MIT License
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.SimpleDropit = factory());
}(this, function () { 'use strict';
    
    'use strict';

    // Helper functions
    function getElementDocument(element) {
        if (!element || !element.ownerDocument) {
            return document;
        }  
        return element.ownerDocument;
    }

    function hasClass(element, className) {
        if(element) {
            return element.classList.contains(className);
        } else {
            return null;
        }
    }

    function triggerClick(element) {
        if(element.click) {
            element.click();
        } else if(document.createEvent) {
            var eventObj = document.createEvent('MouseEvents');
            eventObj.initEvent('click', true, true);
            element.dispatchEvent(eventObj);
        }
    }

    /**
     * SimpleDropit Object
     * @param {String} selector value
     * @param {Object} options User options
     */
    var SimpleDropit = function() {

        SimpleDropit.showFiles = function (el, files) {
            el.innerText = files.length > 1 ? (files.length + ' files selected / ') : files[ 0 ].name + ' / ';
        }

        function SimpleDropit(selector, options = null) {
            var _this = this;

            try {
                if(typeof selector === 'string') {
                    throw new Error('Invalid Element Object.');
                } else if(typeof selector === 'object' && selector !== null) {
                    this.el = selector;
                } else {
                    throw new Error('Element Object does not exists.');
                }
            } catch(error) {
                console.error(error.name + ': ' + error.message);
                return;
            }

            this.isAdvancedUpload = function() {
                var div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            };

            this.onChange = function(event) {
                _this.boxEl.classList.add('is-dropped');
                SimpleDropit.showFiles(_this.filenameEl, event.target.files);
            };

            this.dragIn = function(event) {
                if(!hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.add('is-dragover');
            };

            this.dragOut = function(event) {
                if(hasClass(_this.boxEl, 'is-dragover')) _this.boxEl.classList.remove('is-dragover');
            };

            this.drop = function(event) {
                _this.boxEl.classList.add('is-dropped');
                _this.droppedFiles = event.dataTransfer.files;
                SimpleDropit.showFiles(_this.filenameEl, _this.droppedFiles);
            };

            this.preventEventPropagation = function(event) {
                event.preventDefault();
                event.stopPropagation();
            };

            this.options = Object.assign({}, SimpleDropit.defaultOptions, {}, options);
            this.classNames = Object.assign({}, SimpleDropit.defaultOptions.classNames, {}, this.options.classNames);

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
        }

        _proto.initDom = function initDom() {
            var _this2 = this;

            // Assuring this element doesn't have the wrapper elements yet
            if(this.el.closest('.' + _this2.classNames.boxEl) !== null) {
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

                this.supportedLabelEl.innerHTML = this.options.supportedLabel+'&nbsp;';
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

            if(this.isAdvancedUpload) {
                this.boxEl.classList.add('sdd-advanced-upload');
            }
        }

        _proto.initListeners = function initListeners() {
            var _this3 = this;

            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (e) {
                getElementDocument(_this3.boxEl).addEventListener(e, _this3.preventEventPropagation, false);
                _this3.boxEl.addEventListener(e, _this3.preventEventPropagation, false);
            });
            ['dragenter', 'dragover'].forEach(function (e) {
                getElementDocument(_this3.boxEl).addEventListener(e, _this3.dragIn, true);
            });
            ['dragleave', 'drop'].forEach(function (e) {
                getElementDocument(_this3.boxEl).addEventListener(e, _this3.dragOut, true);
            });
            this.boxEl.addEventListener('drop', _this3.drop, true);
            this.el.addEventListener('change', _this3.onChange, true);
            this.browseLabelEl.addEventListener('click', function(event) { triggerClick(_this3.el); });
        }

        return SimpleDropit;
    }();

    SimpleDropit.defaultOptions = {
        supportedLabel: 'Drag & Drop file or',
        classNames: {
            boxEl: 'sdd-input-file-box',
            boxWrapperEl: 'sdd-input-file-box-wrapper',
            labelWrapperEl: 'sdd-input-file-label',
            supportedLabelEl: 'sdd-box-dragndrop',
            filenameEl: 'sdd-box-file-name',
            browseLabelEl: 'sdd-label'
        }
    };
    SimpleDropit.instances = new WeakMap();

    return SimpleDropit;

}));