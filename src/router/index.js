import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '../views/CalculatorView.vue'
import FormView from '../views/FormView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'calculator',
            component: CalculatorView,
        },
        {
            path: '/formulario',
            name: 'form',
            component: FormView,
        },
    ],
})

export default router