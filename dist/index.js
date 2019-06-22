/*!
 * vue-image-chooser v0.5.3
 * (c) Stefan Jeremić
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styleInject = _interopDefault(require('../node_modules/style-inject/dist/style-inject.es.js'));
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "ImageChooser",
  props: {
    name: {
      required: true,
      type: String
    },
    baseSrc: {
      type: String,
      "default": ""
    },
    height: {
      type: String,
      "default": "350px"
    },
    error: {
      "default": null,
      validator: function validator(value) {
        return value === null || Array.isArray(value) || typeof value === "string";
      }
    },
    progress: {
      type: Number,
      "default": null
    }
  },
  data: function data() {
    return {
      src: null
    };
  },
  computed: {
    normalizedErrors: function normalizedErrors() {
      if (typeof this.error === "string") return [this.error];
      if (this.error instanceof Array) return _toConsumableArray(this.error);
      return [];
    },
    uploading: function uploading() {
      return this.progress !== null && this.progress !== 100;
    },
    style: function style() {
      var containerStyle = {
        height: this.height
      };

      if (this.src || this.baseSrc) {
        containerStyle.backgroundImage = "url(".concat(this.src || this.baseSrc, ")");
        containerStyle.backgroundSize = "cover";
      }

      if (this.error) {
        containerStyle.border = "1px solid red";
      }

      return containerStyle;
    }
  },
  methods: {
    displayFile: function displayFile(event) {
      var _this = this;

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          _this.src = e.target.result;
          var $event = {
            // data: e.target.result.replace(/^data:image\/[a-z]+;base64,/, ''),
            file: event.target.files[0],
            field: _this.name
          };

          _this.$emit("change", $event);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
};

var css = ".image-uploader[data-v-27ec874c]{cursor:pointer;display:flex;border:1px solid #aaa;border-radius:.5rem;box-shadow:0 0 5px 1px #aaa inset;flex-direction:column;justify-content:center;background:#fff;position:relative;overflow:hidden}.image-uploader label[data-v-27ec874c]{cursor:pointer;height:100%;box-sizing:border-box;padding-top:4rem;padding-bottom:1rem}.image-uploader p[data-v-27ec874c],.image-uploader svg[data-v-27ec874c]{display:block;color:#aaa;margin:0 auto}.image-uploader svg[data-v-27ec874c]{height:calc(100% - 8rem)}.image-uploader svg+p[data-v-27ec874c]{line-height:8rem;text-align:center}.image-uploader .progress-overlay[data-v-27ec874c]{height:100%;transition:all .3s;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.5);color:#aaa;bottom:0;text-align:center;position:absolute}.image-uploader .overlay[data-v-27ec874c]{opacity:0;transition:all .3s;width:100%;background:rgba(0,0,0,.5);color:#fff;bottom:0;display:flex;align-items:center;justify-content:center;position:absolute;height:100%}.image-uploader[data-v-27ec874c]:hover{box-shadow:0 0 10px 1px #ccc inset}.image-uploader:hover label[data-v-27ec874c]{opacity:.5}.image-uploader:hover .overlay[data-v-27ec874c]{opacity:1}.image-uploader ul.errors[data-v-27ec874c]{margin:0;padding:0;list-style:none;position:absolute;bottom:0;width:100%;background:red}.image-uploader ul.errors li[data-v-27ec874c]{color:#fff}";
styleInject(css);

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "image-uploader",
    style: _vm.style
  }, [_c('label', {
    attrs: {
      "for": _vm.name
    }
  }, [!_vm.src && !_vm.baseSrc ? _c('svg', {
    attrs: {
      "viewBox": "0 0 99 80",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('title', [_vm._v("icon_camera")]), _vm._v(" "), _c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "tours",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "MY_TOURS-create_a_tour",
      "transform": "translate(-218.000000, -767.000000)",
      "fill": "#aaaaaa",
      "fill-rule": "nonzero"
    }
  }, [_c('g', {
    attrs: {
      "id": "Group-12",
      "transform": "translate(67.000000, 698.000000)"
    }
  }, [_c('path', {
    attrs: {
      "id": "icon_camera",
      "d": "M151,93.4807644 L151,136.970832 C151,143.609002 156.390998,149 163.029168,149 L237.537591,149 C244.175761,149 249.566759,143.609002 249.566759,136.970832 L249.566759,93.4807644 C249.566759,87.1644456 244.437264,82.034951 238.120945,82.034951 L222.108876,82.034951 L221.726678,80.3653508 C220.177772,73.6668343 214.283882,69 207.404325,69 L193.142318,69 C186.282877,69 180.388987,73.6668343 178.819965,80.3653508 L178.437767,82.034951 L162.445813,82.034951 C156.129495,82.034951 151,87.1845612 151,93.4807644 Z M180.409102,86.9632889 C181.555695,86.9632889 182.541363,86.178778 182.802866,85.0523007 L183.627609,81.4717123 C184.673623,77.0261504 188.576062,73.9283379 193.142318,73.9283379 L207.404325,73.9283379 C211.970581,73.9283379 215.87302,77.0261504 216.919034,81.4717123 L217.743777,85.0523007 C218.00528,86.1586623 218.990948,86.9632889 220.137541,86.9632889 L238.10083,86.9632889 C241.701534,86.9632889 244.618305,89.8800603 244.618305,93.4807644 L244.618305,136.970832 C244.618305,140.893387 241.44003,144.071662 237.517475,144.071662 L163.029168,144.071662 C159.106613,144.071662 155.928338,140.893387 155.928338,136.970832 L155.928338,93.4807644 C155.928338,89.8800603 158.845109,86.9632889 162.445813,86.9632889 L180.409102,86.9632889 Z M167.675886,100.782751 C169.497857,100.782751 170.974855,99.3057521 170.974855,97.4837817 C170.974855,95.6618114 169.497857,94.1848127 167.675886,94.1848127 C165.853916,94.1848127 164.376917,95.6618114 164.376917,97.4837817 C164.376917,99.3057521 165.853916,100.782751 167.675886,100.782751 Z M200.283379,136.347247 C211.688962,136.347247 220.982399,127.053809 220.982399,115.648227 C220.982399,104.242645 211.688962,94.9492079 200.283379,94.9492079 C188.877797,94.9492079 179.58436,104.22253 179.58436,115.648227 C179.58436,127.073925 188.877797,136.347247 200.283379,136.347247 Z M200.283379,99.8775459 C208.973347,99.8775459 216.054061,106.95826 216.054061,115.648227 C216.054061,124.338195 208.973347,131.418909 200.283379,131.418909 C191.593412,131.418909 184.512698,124.338195 184.512698,115.648227 C184.512698,106.95826 191.593412,99.8775459 200.283379,99.8775459 Z"
    }
  })])])])]) : _vm._e(), _vm._v(" "), !_vm.src ? _c('p', [_vm._v("Add Photo")]) : _vm._e(), _vm._v(" "), _vm.uploading ? _c('div', {
    staticClass: "progress-overlay"
  }, [_c('span', [_vm._v(_vm._s(_vm.progress) + " %")])]) : _vm.src ? _c('div', {
    staticClass: "overlay"
  }, [_vm._v("Change Photo")]) : _vm._e()]), _vm._v(" "), _c('input', {
    ref: "inputFile",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": _vm.name,
      "name": _vm.name,
      "type": "file",
      "accept": "image/*"
    },
    on: {
      "change": _vm.displayFile
    }
  }), _vm._v(" "), _vm.error ? _c('ul', {
    staticClass: "errors"
  }, _vm._l(_vm.normalizedErrors, function (err) {
    return _c('li', {
      key: err
    }, [_vm._v(_vm._s(err))]);
  }), 0) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-27ec874c";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var ImageChooser = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("vue-image-chooser", ImageChooser);
  }
};

module.exports = index;
