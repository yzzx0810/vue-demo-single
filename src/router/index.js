import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../module/loginPage/loginPage';
import HomePage from '../module/homePage/homePage';
import PersonalCenter from '../module/personalCenter/personalCenter';

Vue.use(VueRouter);
const routes = [
    {
        path: '/loginPage',
        name: 'loginPage',
        component: LoginPage,
        children:[
            {
                path: 'homePage',
                name: 'homePage',
                component: HomePage
            },
            {
                path: 'personalCenter',
                name: 'personalCenter',
                component: PersonalCenter
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes: routes
});

export default router;
