//Composant racine
import { createApp } from 'vue'
//Composant App.vue = point d'entree
import App from './App.vue';

//le vue router 4
import router from "./router/router";

//Import de materilize css
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize";

//Instance de l'application est monté sur une <div id="app">
//Cette div ce situe dans index.html qui appel main.js
createApp(App).use(router).mount('#app')
