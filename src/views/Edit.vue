<template>
    <main>
        <div class="back">
            <router-link :to="'/'"><a>Back</a></router-link>
        </div>
        <h1>Edit Contact</h1>
        <form @submit.prevent="update">
            <input class="firstName" type="text" name="firstName" v-model="firstName">
            <input class="lastName" type="text" name="lastName" v-model="lastName" >
            <input class="email" type="text" name="email" v-model="email">
            <div class="buttons">
                <button class="update" type="submit">Update</button>
                <button class="delete" type="button" @click="deleteContact">Delete</button>
            </div>     
        </form>        
    </main>
</template>

<script>
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
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
    },

    methods: {
        update: async function () {
            await updateDoc(doc(db, 'contacts', this.id), {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
            // when we need to redirect to a virtual page, we use $router property
            this.$router.push('/contact/' + this.id)
        },

        deleteContact: async function () {
            await deleteDoc(doc(db, 'contacts', this.id))
            this.$router.push('/')
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
    div.back {
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
    form {
        width: 80%;
        margin: auto;
        display: grid;
        column-gap: 10px;
        row-gap: 40px;
    }
    .firstName {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    .email {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .buttons {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4;
        display: flex;
        justify-content: space-around;
    }

    input, button {
        padding: 10px;
        border-radius: 5px;
        border-style: solid;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
    }

    button {
        border-style: none;
        color: white;
    }

    .update {
        background-color: #177DDA;
    }

    .delete {
        background-color: #F21905;
    }

</style>