import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApplyView from '../views/ApplyView.vue'
import SubmissionView from '../views/SubmissionView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/apply', name: 'Apply', component: ApplyView },
  { path: '/forms', redirect: '/apply' }, // backward compatibility
  { path: '/submission/:id', name: 'Submission', component: SubmissionView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router