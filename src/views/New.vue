<template>
    <main>
        <div>
            <router-link :to="'/'"><a>Back</a></router-link>
        </div>
        <h1>New Contact</h1>
        <form @submit.prevent="addContact">
            <input class="firstName" type="text" name="firstName" placeholder="First Name" v-model="firstName">
            <input class="lastName" type="text" name="lastName" placeholder="Last Name" v-model="lastName">
            <input class="email" type="text" name="email" placeholder="Email" v-model="email">
            <div class="buttons">
                <button type="submit">Add Contact</button>
                <button type="button" @click="cancel">Cancel</button>
            </div>
        </form>
    </main>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import db from '../db.js'

export default {
    name: 'New',
    data: function () {
        return {
            firstName: '',
            lastName: '',
            email: ''
        }
    },

    methods: {
        addContact: async function () {
            const newContact = await addDoc(collection(db, 'contacts'), {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
            this.$router.push('/contact/' + newContact.id)
            console.log(newContact.id)
        },

        cancel: function () {
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

    button[type="submit"] {
        background-color: #177DDA;
    }

    button[type="button"] {
        background-color: #F21905;
    }
</style>
