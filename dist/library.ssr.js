'use strict';

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
      default: ""
    },
    height: {
      type: String,
      default: "350px"
    },
    error: {
      default: null,
      validator: function(value) {
        return (
          value === null || Array.isArray(value) || typeof value === "string"
        );
      }
    },
    progress: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      src: null
    };
  },
  computed: {
    normalizedErrors() {
      if (typeof this.error === "string") return [this.error];
      if (this.error instanceof Array) return [...this.error];
      return [];
    },
    uploading() {
      return this.progress !== null && this.progress !== 100;
    },
    style() {
      let containerStyle = {
        height: this.height
      };
      if (this.src || this.baseSrc) {
        containerStyle.backgroundImage = `url(${this.src || this.baseSrc})`;
        containerStyle.backgroundSize = "cover";
      }
      if (this.error) {
        containerStyle.border = "1px solid red";
      }
      return containerStyle;
    }
  },
  methods: {
    displayFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.src = e.target.result;
          const $event = {
            // data: e.target.result.replace(/^data:image\/[a-z]+;base64,/, ''),
            file: event.target.files[0],
            field: this.name
          };
          this.$emit("change", $event);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = process.env.NODE_ENV === 'production' ? css.media || 'default' : id;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        if (process.env.NODE_ENV !== 'production' && css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    Buffer.from(unescape(encodeURIComponent(JSON.stringify(css.map)))).toString('base64') +
                    ' */';
        }
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "image-uploader", style: _vm.style }, [
    _vm._ssrNode(
      "<label" +
        _vm._ssrAttr("for", _vm.name) +
        " data-v-01020443>" +
        (!_vm.src && !_vm.baseSrc
          ? '<svg viewBox="0 0 99 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-v-01020443><title data-v-01020443>icon_camera</title> <desc data-v-01020443>Created with Sketch.</desc> <defs data-v-01020443></defs> <g id="tours" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-v-01020443><g id="MY_TOURS-create_a_tour" transform="translate(-218.000000, -767.000000)" fill="#aaaaaa" fill-rule="nonzero" data-v-01020443><g id="Group-12" transform="translate(67.000000, 698.000000)" data-v-01020443><path id="icon_camera" d="M151,93.4807644 L151,136.970832 C151,143.609002 156.390998,149 163.029168,149 L237.537591,149 C244.175761,149 249.566759,143.609002 249.566759,136.970832 L249.566759,93.4807644 C249.566759,87.1644456 244.437264,82.034951 238.120945,82.034951 L222.108876,82.034951 L221.726678,80.3653508 C220.177772,73.6668343 214.283882,69 207.404325,69 L193.142318,69 C186.282877,69 180.388987,73.6668343 178.819965,80.3653508 L178.437767,82.034951 L162.445813,82.034951 C156.129495,82.034951 151,87.1845612 151,93.4807644 Z M180.409102,86.9632889 C181.555695,86.9632889 182.541363,86.178778 182.802866,85.0523007 L183.627609,81.4717123 C184.673623,77.0261504 188.576062,73.9283379 193.142318,73.9283379 L207.404325,73.9283379 C211.970581,73.9283379 215.87302,77.0261504 216.919034,81.4717123 L217.743777,85.0523007 C218.00528,86.1586623 218.990948,86.9632889 220.137541,86.9632889 L238.10083,86.9632889 C241.701534,86.9632889 244.618305,89.8800603 244.618305,93.4807644 L244.618305,136.970832 C244.618305,140.893387 241.44003,144.071662 237.517475,144.071662 L163.029168,144.071662 C159.106613,144.071662 155.928338,140.893387 155.928338,136.970832 L155.928338,93.4807644 C155.928338,89.8800603 158.845109,86.9632889 162.445813,86.9632889 L180.409102,86.9632889 Z M167.675886,100.782751 C169.497857,100.782751 170.974855,99.3057521 170.974855,97.4837817 C170.974855,95.6618114 169.497857,94.1848127 167.675886,94.1848127 C165.853916,94.1848127 164.376917,95.6618114 164.376917,97.4837817 C164.376917,99.3057521 165.853916,100.782751 167.675886,100.782751 Z M200.283379,136.347247 C211.688962,136.347247 220.982399,127.053809 220.982399,115.648227 C220.982399,104.242645 211.688962,94.9492079 200.283379,94.9492079 C188.877797,94.9492079 179.58436,104.22253 179.58436,115.648227 C179.58436,127.073925 188.877797,136.347247 200.283379,136.347247 Z M200.283379,99.8775459 C208.973347,99.8775459 216.054061,106.95826 216.054061,115.648227 C216.054061,124.338195 208.973347,131.418909 200.283379,131.418909 C191.593412,131.418909 184.512698,124.338195 184.512698,115.648227 C184.512698,106.95826 191.593412,99.8775459 200.283379,99.8775459 Z" data-v-01020443></path></g></g></g></svg>'
          : "<!---->") +
        " " +
        (!_vm.src ? "<p data-v-01020443>Add Photo</p>" : "<!---->") +
        " " +
        (_vm.uploading
          ? '<div class="progress-overlay" data-v-01020443><span data-v-01020443>' +
            _vm._ssrEscape(_vm._s(_vm.progress) + " %") +
            "</span></div>"
          : _vm.src
          ? '<div class="overlay" data-v-01020443>Change Photo</div>'
          : "<!---->") +
        "</label> <input" +
        _vm._ssrAttr("id", _vm.name) +
        _vm._ssrAttr("name", _vm.name) +
        ' type="file" accept="image/*" style="display:none;" data-v-01020443> ' +
        (_vm.error
          ? '<ul class="errors" data-v-01020443>' +
            _vm._ssrList(_vm.normalizedErrors, function(err) {
              return (
                "<li data-v-01020443>" + _vm._ssrEscape(_vm._s(err)) + "</li>"
              )
            }) +
            "</ul>"
          : "<!---->")
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-01020443_0", { source: ".image-uploader[data-v-01020443] {\n  cursor: pointer;\n  display: flex;\n  border: 1px solid #aaa;\n  border-radius: 0.5rem;\n  box-shadow: 0 0 5px 1px #aaa inset;\n  flex-direction: column;\n  justify-content: center;\n  background: white;\n  position: relative;\n  overflow: hidden;\n}\n.image-uploader label[data-v-01020443] {\n  cursor: pointer;\n  height: 100%;\n  box-sizing: border-box;\n  padding-top: 4rem;\n  padding-bottom: 1rem;\n}\n.image-uploader svg[data-v-01020443],\n.image-uploader p[data-v-01020443] {\n  display: block;\n  color: #aaa;\n  margin: 0 auto;\n}\n.image-uploader svg[data-v-01020443] {\n  height: calc(100% - 8rem);\n}\n.image-uploader svg + p[data-v-01020443] {\n  line-height: 8rem;\n  text-align: center;\n}\n.image-uploader .progress-overlay[data-v-01020443] {\n  height: 100%;\n  transition: all 0.3s;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.5);\n  color: #aaa;\n  bottom: 0;\n  text-align: center;\n  position: absolute;\n}\n.image-uploader .overlay[data-v-01020443] {\n  opacity: 0;\n  transition: all 0.3s;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  color: white;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  height: 100%;\n}\n.image-uploader[data-v-01020443]:hover {\n  box-shadow: 0 0 10px 1px #ccc inset;\n}\n.image-uploader:hover label[data-v-01020443] {\n  opacity: 0.5;\n}\n.image-uploader:hover .overlay[data-v-01020443] {\n  opacity: 1;\n}\n.image-uploader ul.errors[data-v-01020443] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background: red;\n}\n.image-uploader ul.errors li[data-v-01020443] {\n  color: white;\n}\n\n/*# sourceMappingURL=ImageChooser.vue.map */", map: {"version":3,"sources":["/home/stefan/work/vue-image-chooser/src/ImageChooser.vue","ImageChooser.vue"],"names":[],"mappings":"AAuIA;EACA,eAAA;EACA,aAAA;EACA,sBAAA;EACA,qBAAA;EACA,kCAAA;EACA,sBAAA;EACA,uBAAA;EACA,iBAAA;EACA,kBAAA;EAEA,gBAAA;ACvIA;ADwIA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;EACA,iBAAA;EACA,oBAAA;ACtIA;ADwIA;;EAEA,cAAA;EACA,WAAA;EACA,cAAA;ACtIA;ADwIA;EACA,yBAAA;ACtIA;ADwIA;EACA,iBAAA;EACA,kBAAA;ACtIA;ADyIA;EACA,YAAA;EACA,oBAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,8BAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;EACA,kBAAA;ACvIA;AD0IA;EACA,UAAA;EACA,oBAAA;EACA,WAAA;EACA,8BAAA;EACA,YAAA;EACA,SAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,YAAA;ACxIA;AD0IA;EACA,mCAAA;ACxIA;ADyIA;EACA,YAAA;ACvIA;AD0IA;EACA,UAAA;ACxIA;AD2IA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,eAAA;ACzIA;AD0IA;EACA,YAAA;ACxIA;;AAEA,2CAA2C","file":"ImageChooser.vue","sourcesContent":["<template>\n  <div :style=\"style\" class=\"image-uploader\">\n    <label :for=\"name\">\n      <svg\n        v-if=\"!src && !baseSrc\"\n        viewBox=\"0 0 99 80\"\n        version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      >\n        <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->\n        <title>icon_camera</title>\n        <desc>Created with Sketch.</desc>\n        <defs />\n        <g\n          id=\"tours\"\n          stroke=\"none\"\n          stroke-width=\"1\"\n          fill=\"none\"\n          fill-rule=\"evenodd\"\n        >\n          <g\n            id=\"MY_TOURS-create_a_tour\"\n            transform=\"translate(-218.000000, -767.000000)\"\n            fill=\"#aaaaaa\"\n            fill-rule=\"nonzero\"\n          >\n            <g id=\"Group-12\" transform=\"translate(67.000000, 698.000000)\">\n              <path\n                id=\"icon_camera\"\n                d=\"M151,93.4807644 L151,136.970832 C151,143.609002 156.390998,149 163.029168,149 L237.537591,149 C244.175761,149 249.566759,143.609002 249.566759,136.970832 L249.566759,93.4807644 C249.566759,87.1644456 244.437264,82.034951 238.120945,82.034951 L222.108876,82.034951 L221.726678,80.3653508 C220.177772,73.6668343 214.283882,69 207.404325,69 L193.142318,69 C186.282877,69 180.388987,73.6668343 178.819965,80.3653508 L178.437767,82.034951 L162.445813,82.034951 C156.129495,82.034951 151,87.1845612 151,93.4807644 Z M180.409102,86.9632889 C181.555695,86.9632889 182.541363,86.178778 182.802866,85.0523007 L183.627609,81.4717123 C184.673623,77.0261504 188.576062,73.9283379 193.142318,73.9283379 L207.404325,73.9283379 C211.970581,73.9283379 215.87302,77.0261504 216.919034,81.4717123 L217.743777,85.0523007 C218.00528,86.1586623 218.990948,86.9632889 220.137541,86.9632889 L238.10083,86.9632889 C241.701534,86.9632889 244.618305,89.8800603 244.618305,93.4807644 L244.618305,136.970832 C244.618305,140.893387 241.44003,144.071662 237.517475,144.071662 L163.029168,144.071662 C159.106613,144.071662 155.928338,140.893387 155.928338,136.970832 L155.928338,93.4807644 C155.928338,89.8800603 158.845109,86.9632889 162.445813,86.9632889 L180.409102,86.9632889 Z M167.675886,100.782751 C169.497857,100.782751 170.974855,99.3057521 170.974855,97.4837817 C170.974855,95.6618114 169.497857,94.1848127 167.675886,94.1848127 C165.853916,94.1848127 164.376917,95.6618114 164.376917,97.4837817 C164.376917,99.3057521 165.853916,100.782751 167.675886,100.782751 Z M200.283379,136.347247 C211.688962,136.347247 220.982399,127.053809 220.982399,115.648227 C220.982399,104.242645 211.688962,94.9492079 200.283379,94.9492079 C188.877797,94.9492079 179.58436,104.22253 179.58436,115.648227 C179.58436,127.073925 188.877797,136.347247 200.283379,136.347247 Z M200.283379,99.8775459 C208.973347,99.8775459 216.054061,106.95826 216.054061,115.648227 C216.054061,124.338195 208.973347,131.418909 200.283379,131.418909 C191.593412,131.418909 184.512698,124.338195 184.512698,115.648227 C184.512698,106.95826 191.593412,99.8775459 200.283379,99.8775459 Z\"\n              />\n            </g>\n          </g>\n        </g>\n      </svg>\n      <p v-if=\"!src\">Add Photo</p>\n      <div v-if=\"uploading\" class=\"progress-overlay\">\n        <span>{{ progress }} %</span>\n      </div>\n      <div v-else-if=\"src\" class=\"overlay\">Change Photo</div>\n    </label>\n    <input\n      ref=\"inputFile\"\n      :id=\"name\"\n      :name=\"name\"\n      type=\"file\"\n      accept=\"image/*\"\n      style=\"display:none;\"\n      @change=\"displayFile\"\n    />\n    <ul v-if=\"error\" class=\"errors\">\n      <li v-for=\"err in normalizedErrors\" :key=\"err\">{{ err }}</li>\n    </ul>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \"ImageChooser\",\n  props: {\n    name: {\n      required: true,\n      type: String\n    },\n    baseSrc: {\n      type: String,\n      default: \"\"\n    },\n    height: {\n      type: String,\n      default: \"350px\"\n    },\n    error: {\n      default: null,\n      validator: function(value) {\n        return (\n          value === null || Array.isArray(value) || typeof value === \"string\"\n        );\n      }\n    },\n    progress: {\n      type: Number,\n      default: null\n    }\n  },\n  data() {\n    return {\n      src: null\n    };\n  },\n  computed: {\n    normalizedErrors() {\n      if (typeof this.error === \"string\") return [this.error];\n      if (this.error instanceof Array) return [...this.error];\n      return [];\n    },\n    uploading() {\n      return this.progress !== null && this.progress !== 100;\n    },\n    style() {\n      let containerStyle = {\n        height: this.height\n      };\n      if (this.src || this.baseSrc) {\n        containerStyle.backgroundImage = `url(${this.src || this.baseSrc})`;\n        containerStyle.backgroundSize = \"cover\";\n      }\n      if (this.error) {\n        containerStyle.border = \"1px solid red\";\n      }\n      return containerStyle;\n    }\n  },\n  methods: {\n    displayFile(event) {\n      if (event.target.files && event.target.files[0]) {\n        var reader = new FileReader();\n        reader.onload = e => {\n          this.src = e.target.result;\n          const $event = {\n            // data: e.target.result.replace(/^data:image\\/[a-z]+;base64,/, ''),\n            file: event.target.files[0],\n            field: this.name\n          };\n          this.$emit(\"change\", $event);\n        };\n        reader.readAsDataURL(event.target.files[0]);\n      }\n    }\n  }\n};\n</script>\n\n<style scoped lang=\"scss\">\n.image-uploader {\n  cursor: pointer;\n  display: flex;\n  border: 1px solid #aaa;\n  border-radius: 0.5rem;\n  box-shadow: 0 0 5px 1px #aaa inset;\n  flex-direction: column;\n  justify-content: center;\n  background: white;\n  position: relative;\n  // border: 1px solid #aaa;\n  overflow: hidden;\n  label {\n    cursor: pointer;\n    height: 100%;\n    box-sizing: border-box;\n    padding-top: 4rem;\n    padding-bottom: 1rem;\n  }\n  svg,\n  p {\n    display: block;\n    color: #aaa;\n    margin: 0 auto;\n  }\n  svg {\n    height: calc(100% - 8rem);\n  }\n  svg + p {\n    line-height: 8rem;\n    text-align: center;\n  }\n\n  .progress-overlay {\n    height: 100%;\n    transition: all 0.3s;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    background: rgba(0, 0, 0, 0.5);\n    color: #aaa;\n    bottom: 0;\n    text-align: center;\n    position: absolute;\n  }\n\n  .overlay {\n    opacity: 0;\n    transition: all 0.3s;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    color: white;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: absolute;\n    height: 100%;\n  }\n  &:hover {\n    box-shadow: 0 0 10px 1px #ccc inset;\n    label {\n      opacity: 0.5;\n    }\n\n    .overlay {\n      opacity: 1;\n    }\n  }\n  ul.errors {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    background: red;\n    li {\n      color: white;\n    }\n  }\n}\n</style>\n",".image-uploader {\n  cursor: pointer;\n  display: flex;\n  border: 1px solid #aaa;\n  border-radius: 0.5rem;\n  box-shadow: 0 0 5px 1px #aaa inset;\n  flex-direction: column;\n  justify-content: center;\n  background: white;\n  position: relative;\n  overflow: hidden;\n}\n.image-uploader label {\n  cursor: pointer;\n  height: 100%;\n  box-sizing: border-box;\n  padding-top: 4rem;\n  padding-bottom: 1rem;\n}\n.image-uploader svg,\n.image-uploader p {\n  display: block;\n  color: #aaa;\n  margin: 0 auto;\n}\n.image-uploader svg {\n  height: calc(100% - 8rem);\n}\n.image-uploader svg + p {\n  line-height: 8rem;\n  text-align: center;\n}\n.image-uploader .progress-overlay {\n  height: 100%;\n  transition: all 0.3s;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.5);\n  color: #aaa;\n  bottom: 0;\n  text-align: center;\n  position: absolute;\n}\n.image-uploader .overlay {\n  opacity: 0;\n  transition: all 0.3s;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  color: white;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  height: 100%;\n}\n.image-uploader:hover {\n  box-shadow: 0 0 10px 1px #ccc inset;\n}\n.image-uploader:hover label {\n  opacity: 0.5;\n}\n.image-uploader:hover .overlay {\n  opacity: 1;\n}\n.image-uploader ul.errors {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background: red;\n}\n.image-uploader ul.errors li {\n  color: white;\n}\n\n/*# sourceMappingURL=ImageChooser.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-01020443";
  /* module identifier */
  const __vue_module_identifier__ = "data-v-01020443";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );

var index = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("vue-image-chooser", __vue_component__);
 }
};

module.exports = index;
