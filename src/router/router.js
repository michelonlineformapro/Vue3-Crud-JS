import {createWebHistory, createRouter} from "vue-router";

//import de fichier vue
import Produits from '../components/Produits.vue';
import ListeProduits from "../components/ListeProduits.vue";
import AjouterProduits from "../components/AjouterProduits.vue";

//Les routes
//path = chemin dans url = <router-link to="">
//name = nom de route optionnel
const routes = [
    {
        path: "/produits/:id",
        alias: "/produits",
        component:() => Produits
    },
    {
        path: "/",
        alias: "/liste-produits",
        component:() => ListeProduits
    },
    {
        path: "/ajouter-produits",
        alias: "/ajouter-produits",
        component:() => AjouterProduits
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;