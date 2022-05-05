import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "advisories"
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("../users/coach/coach-profile/pages/coach-profile.component.vue"),
    },
    {
      path: "/advisories",
      name: "advisories",
      component: () => import("../users/coach/coach-advisory/pages/coach-advisory.component.vue")
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../users/coach/coach-students/pages/coach-students.component.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../users/coach/coach-home/pages/coach-home.component.vue")
    }
  ]
})

export default router
