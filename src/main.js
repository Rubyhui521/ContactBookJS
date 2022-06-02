import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Contacts from './views/Contacts.vue'
import Contact from './views/Contact.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'


// create routes array
// routes are objects that includes a path and a component
// path: url string
// component: a virtual page (a .vue file inside views folder)
const routes = [
    {
        path: '/',
        name: 'Contacts',
        component: Contacts
    },
    {
        path: '/contact/:id',
        name: 'Contact',
        component: Contact,
        props: true
    },
    {
        path: '/new/',
        name: 'New',
        component: New
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit,
        props: true
    }
]

// create a new router
const router = createRouter({
    // set the history mode
    history: createWebHashHistory(),
    // call the routes array
    routes: routes
})

createApp(App).use(router).mount('#app')
