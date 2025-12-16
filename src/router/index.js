import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApplyView from '../views/ApplyView.vue'
import SubmissionView from '../views/SubmissionView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/apply', name: 'Apply', component: ApplyView },
  { path: '/forms', redirect: '/apply' }, // backward compatibility
  { path: '/submission/:id', name: 'Submission', component: SubmissionView, props: true },
  { path: '/admin', name: 'Admin', component: AdminView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router