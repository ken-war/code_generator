import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/config',
        },
        {
            path: '/',
            component: require('@/components/comm/Home').default,
            children: [
                {
                    path: 'config',
                    component: require('@/components/page/Config').default,
                    meta: { title: '配置页' }
                },
                {
                    path: '/dataBaseTable',
                    component: require('@/components/page/DataBaseTable').default,
                    meta: { title: '数据库表' }
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
