import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicLayout from "../components/PublicLayout.vue";
import AppLayout from "@/components/AppLayout.vue";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue")
      }
    ],
    meta: {
      public: true
    }
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/lista',
        name: 'Lista',
        component: () => import(/* webpackChunkName: "about" */ '../views/Lista.vue')
      }
    ],
    meta: {
      public: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const hasToken = store.getters.hasToken;
  const hasUser = store.getters.hasUser;
  const isPublic = to.matched.some(route => route.meta.public);

  if (!isPublic && !hasToken && !hasUser) {
    const wasRestored = await store.dispatch("restore");
    console.warn(wasRestored);
    if (!wasRestored) {
      return router.push({ name: "Login" });
    }
  }

  next();
});

export default router
