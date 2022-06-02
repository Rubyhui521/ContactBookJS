<template>
    <main>
        <div>
            <router-link :to="'/'"><a>Back</a></router-link>
            <router-link :to="'/edit/' + id"><a>Edit</a></router-link>
        </div>
        <h1>{{ firstName }} {{ lastName }}</h1>
        <p>{{ email }}</p>
    </main>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import db from '../db.js'

export default {
    name: 'Contact',
    props: ['id'],
    data: function () {
        return {
            // the properties inside this data function are usually empty
            // the reason we use these empty properties is to prevent any issues building our page while we are waiting for the data to be retrieved
            // in this way the retrieving process will not break our page
            firstName: '',
            lastName: '',
            email: ''
        }
    },

    // getDoc() is an asynchronous request go with async and await
    // async is used for anything that is going to be returning a promise and tell the command to wait until the promise has been fullfilled
    created: async function () {
        // async and await always come together, await should be put in front of anything that will return a promise while async will be put in front of the function
        // id in this.id comes from props: ['id']
        const document = await getDoc(doc(db, 'contacts', this.id))

        if (document.exists()) {
            this.firstName = document.data().firstName
            this.lastName = document.data().lastName
            this.email = document.data().email
        }
    }
}
</script>

<style scoped>
    main {
        width: 50%;
        height: 600px;
        margin: 80px auto auto auto;
        padding: 40px;
        background-color: white;
    }
    div {
        display: flex;
        justify-content: space-between;
    }
    a {
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        text-decoration: none;
        color: black;
        
    }
    a:hover, a:active {
        color: #177DDA;
    }
    a:link, a:visited {
        color: #177DDA;
    }
    h1 {
        font-size: 70px;
        font-family: 'Nanum Gothic', sans-serif;
    }
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 30px;
    }
</style>