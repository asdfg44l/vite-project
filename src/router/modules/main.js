const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('@/views/Home.vue')
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('@/views/About.vue')
    }
]

export default routes