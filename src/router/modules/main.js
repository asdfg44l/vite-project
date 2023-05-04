const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'webworker',
    path: '/webworker',
    component: () => import('@/views/WebWorker.vue'),
  },
  {
    name: 'suspense',
    path: '/suspense',
    component: () => import('@/views/Suspense.vue'),
  },
  {
    name: 'svgIcon',
    path: '/svgIcon',
    component: () => import('@/views/SvgIcon.vue'),
  },
  {
    name: 'intersectionObserver',
    path: '/intersectionObserver',
    component: () => import('@/views/IntersectionObserver.vue'),
  },
  {
    name: 'veevalidate',
    path: '/veevalidate',
    component: () => import('@/views/VeeValidate.vue'),
  },
  {
    name: 'vuefinalmodal',
    path: '/vuefinalmodal',
    component: () => import('@/views/VueModal.vue'),
  },
  {
    name: 'playground',
    path: '/playground/:name(hello|hi)?',
    component: () => import('@/views/Playground.vue'),
  },
  {
    name: 'requestAnimationFrame',
    path: '/requestAnimationFrame',
    component: () => import('@/views/RequestAnimationFrame.vue'),
  },
  {
    name: 'layouttest',
    path: '/layouttest',
    meta: { layoutName: 'New' },
    component: () => import('@/views/LayoutTest.vue'),
    redirect: { name: 'testchild' },
    children: [
      {
        name: 'testchild',
        path: 'testchild',
        component: () => import('@/views/LayoutTestChild.vue'),
      },
    ],
  },
]

export default routes
