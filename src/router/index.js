import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterPage from '../module/enterPage/enterPage';

Vue.use(VueRouter);
const routes = [
    {
        path: '/enterPage',
        name: 'enterPage',
        component: EnterPage,
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes: routes
});

export default router;
