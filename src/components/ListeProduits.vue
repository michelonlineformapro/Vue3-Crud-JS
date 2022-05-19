<template>
  <div class="container">
    <div class="input-field col s12">
      <input
          id="titre-livre"
          type="text"
          class="validate"
          v-model="nomLivre"
      />
      <label for="titre-livre">Recherche par titre du livre</label>
      <button @click="rechercherParTitre" class="waves-effect waves-light btn orange darken-2">RECHERCHER</button>
    </div>
  </div>

  <div class="row">
    <div class="col s8">
      <h4>LISTE DE LIVRES</h4>
      <ul class="collection">
        <!--Ici une boucle v-for avec un alias - index + le tableau des produits rempli grace a la methode afficherTous des services et json server axios
        au clic on appel la function setLivreCourant pour activer le livre concerner
        :class = v-bind:class qui permet de toggle entre 2 classes
        -->
        <li
            class="collection-item"
            v-for="(produit, index) in produits"
            :class="{active: index === indexLivre}"
            :key="index"
            @click="setLivreCourant(produit, index)">
          {{produit.nomLivre}}
        </li>
      </ul>
      <button class="btn blue lighten-2" @click="supprimerTousLesLivre">SUPPRIMER TOUS</button>
    </div>
    <div class="col s4">
      <div v-if="livreCourant">
        <h4>Nos livres</h4>
        <h5>{{livreCourant.nomLivre}}</h5>
        <img class="responsive-img" :src="livreCourant.imageLivre" alt="{{livreCourant.nomLivre}}" title="{{livreCourant.nomLivre}}"/>
        <p class="green-text lighten-4">PRIX : {{livreCourant.prixLivre}} €</p>
        <p>{{livreCourant.descriptionLivre}}</p>
        <router-link :to="'/produits/' + livreCourant.id" class="waves-effect waves-light btn orange">Editer</router-link>
      </div>
      <div v-else>
        <h4>Merci de choisir un livre</h4>
      </div>
    </div>
  </div>
</template>

<script>
//Appel du fichier de services et ses methodes
import LivresServices from "../services/LivresServices";
export default {
  name: "ListeProduits",
  //fonction data retourne l'etat initial du DOM à l'instance d'un composant
  data(){
    return{
      //Le tableau de produit vide
      produits: [],
      //le produits courant a recup pour les details
      livreCourant: null,
      //L'index du produits courant dans le tableau
      indexLivre: -1,
      //On affiche que le titre du livre dans un 1er temps
      nomLivre: ""
    };
  },
  methods:{
    lesLivres(){
      //Appel de la methode de la classe services
      LivresServices.afficherTousLivres()
          //Un promesse
          .then(response => {
            //On rempli le tableau vide init + haut
            this.produits = response.data;
            console.log(data);
          })
          //Sinon on affuche une erreur
          .catch(erreur => {
            console.log(erreur);
          });
    },
    //Refresh la liste des livre
    mettreJourListe(){
      //On rapelle la fonction lesLivres()
      this.lesLivres();
      //On reset le livre courant + index
      this.livreCourant = null;
      this.indexLivre = -1;
    },

    //Le livre actif = consulté
    //Il la seule facon de recup index est un ternaire
    //Js et vue ne permette pas d'assigner une condition a une valeur
    setLivreCourant(produit, index){
      this.livreCourant = produit;
      this.indexLivre = produit ? index : -1;
    },
    //Supprimer tous les livres du json-server db.json produit
    supprimerTousLesLivre(){
      LivresServices.supprimerTousLivre()
          //retourne une promesse
          .then(response => {
            console.log(response.data);
            //et on refresh
            this.mettreJourListe();
          })
          //Sinon on affiche une erreur
          .catch(erreur => {
            console.log(erreur)
          });
    },
    //Rechercher un livre par titre
    rechercherParTitre(){
      LivresServices.trouverParTitre(this.nomLivre)
          //retourne une promesse
          .then(response => {
            this.produits = response.data;
            //Appel de la methode livre courant
            this.setLivreCourant(null);
            console.log(response.data)
          })
          //Sinon on retourne une erreur
          .catch(erreur => {
            console.log(erreur);
          });
    }
  },
  //Apres le 1er render soit ComponentDidMount()
  //En gros lors de l'affichage de la page
  mounted() {
    this.lesLivres();
  }
}
</script>

<style scoped>
  .collection-item:hover{
    cursor: pointer;
  }
</style>