const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "about",
    path: "/about",
    component: () => import("@/views/About.vue"),
  },
  {
    name: "playground",
    path: "/playground/:name(hello|hi)?",
    component: () => import("@/views/Playground.vue"),
  },
  {
    name: "layouttest",
    path: "/layouttest",
    meta: { layoutName: "New" },
    component: () => import("@/views/LayoutTest.vue"),
    redirect: { name: "testchild" },
    children: [
      {
        name: "testchild",
        path: "testchild",
        component: () => import("@/views/LayoutTestChild.vue"),
      },
    ],
  },
];

export default routes;
