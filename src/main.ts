// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import jsonp from './googleapis/jsonp'
import location from './googleapis/location'

var gapiurl = '//maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback&key=AIzaSyCd5WYdM03hqbS74XrUXtYooNrKmUPW5w4';

var load = function (done) {
    jsonp(gapiurl, '__googleMapsApiOnLoadCallback', done);
};

load( function () {
    // location.init([])
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
