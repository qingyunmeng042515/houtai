import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
var router = new VueRouter();
console.log(router);
export function configRouter(router) {

    router.map({
        '/login': {
            name: 'login',
            component: (resolve) => require(['./components/login.vue'], resolve)
        },
        '/worker': {
            name: 'worker',
            component: (resolve) => require(['./components/worker.vue'], resolve),
            subRoutes: {
                '/home': {
                    name: 'home',
                    component: (resolve) => require(['./components/home.vue'], resolve)
                },
                '/courselist': {
                    name: 'courselist',
                    component: (resolve) => require(['./components/course/list.vue'], resolve)
                },
                '/courselist/form/:id': {
                    name: 'courselist-form',
                    component: (resolve) => require(['./components/course/listform.vue'], resolve)
                },
                '/teacherlist': {
                    name: 'teacherlist',
                    component: (resolve) => require(['./components/teacher/list.vue'], resolve)
                },
                '/teacherlist/form/:id': {
                    name: 'teacherlist-form',
                    component: (resolve) => require(['./components/teacher/listform.vue'], resolve)
                },
                '/videolist': {
                    name: 'videolist',
                    component: (resolve) => require(['./components/video/list.vue'], resolve)
                },
                '/videolist/form/:id': {
                    name: 'videolist-form',
                    component: (resolve) => require(['./components/video/listform.vue'], resolve)
                },
                '/updatepwd':{
                    name:'updatepwd',
                    component: (resolve) => require(['./components/updatepwd.vue'],resolve)
                }
            }
        }
    });


    router.redirect({
        '*': '/login'
    })

    router.beforeEach(function (transition) {
        if (false) {
            return transition.redirect('/login');
        } else {
            return transition.next();
        }
    })

}
