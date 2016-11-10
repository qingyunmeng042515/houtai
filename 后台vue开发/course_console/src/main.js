import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import { configRouter } from './route.config'
import XZ from './vue-xz'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(XZ)

Vue.config.debug = true
Vue.http.options.emulateJSON = true;
var App = Vue.extend({})

var router = new VueRouter()
configRouter(router)

Vue.$xz.options({})

Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
});

router.start(App, '#app')

