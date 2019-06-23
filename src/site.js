import Vue from "vue";
import VueImageChooser from './index.js'
Vue.use(VueImageChooser)
let app = new Vue({
  el: "#app",
  data: {
    progress: null
  },
  methods: {
    uploadImage: function(file) {
      //Simulate progress
      var self = this;
      self.progress = 0;
      var handler = setInterval(function() {
        self.progress += 10;
        if (self.progress > 100) {
          self.progress = null;
          clearInterval(handler);
        }
      }, 300);
    }
  }
});
