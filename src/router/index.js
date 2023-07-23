import {createRouter, createWebHistory} from 'vue-router'
import Page1 from '../components/Page1.vue'
import Page2 from '../components/Page2.vue'
// import Test from '../components/Test.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Page1
        },
        {
            path: '/page2',
            component: Page2
        }
        // {
        //     path: '/test',
        //     component: Test
        // }
    ]
})

export default router