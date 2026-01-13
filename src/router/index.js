import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../components/Introduction.vue'
import Forms from '../components/Forms.vue'
import Submissions from '../components/Submissions.vue'
import AdminView from '../views/AdminView.vue'
import OfferClosedView from '../views/OfferClosedView.vue'

const routes = [
  {
    path: '/',
    component: Introduction,
    children: [
      {
        path: '/forms',
        name: 'Forms',
        component: Forms
      },
      {
        path: '/submission/:id',
        name: 'Submission',
        component: Submissions,
        props: true
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/offer-closed',
    name: 'OfferClosed',
    component: OfferClosedView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Redirection Guard
router.beforeEach((to, from, next) => {
  // Allow access to the Admin page and Offer Closed page
  if (to.path.startsWith('/admin') || to.path === '/offer-closed') {
    next()
  } else {
    // Redirect everything else to Offer Closed
    next('/offer-closed')
  }
})

export default router