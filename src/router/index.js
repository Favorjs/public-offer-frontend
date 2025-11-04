import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../components/Introduction.vue'
import Forms from '../components/Forms.vue'

import Submissions from '../components/Submissions.vue'






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
     // In your router/index.js
{
  path: '/submission/:id',
  name: 'Submission',
  component: Submissions,
  props: true
},
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router