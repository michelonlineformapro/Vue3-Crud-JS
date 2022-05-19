<template>
  <div class="ajouter-form">
    <h2 class="center">Ajouter un livre</h2>
    <!--La condition si est soumis-->
    <div v-if="!soumis">
      <div class="input-field col s12">
        <!--v-model cree la liason (binding) entre les champs des formulaire (et-ou composant) et les objets
        name est la valeur du champ recup
        name passe les valeur a l'objet via v-model
        -->
        <input
            id="nom"
            type="text"
            class="validate"
            required
            v-model="produits.nomLivre"
            name="nomLivre"
        />
        <label for="nom">Titre du livre</label>
      </div>

      <div class="input-field col s12">
        <!--v-model cree la liason (binding) entre les champs des formulaire (et-ou composant) et les objets
        name est la valeur du champ recup
        name passe les valeur a l'objet via v-model
        -->
        <textarea
            id="description"
            class="materialize-textarea"
            required
            v-model="produits.descriptionLivre"
            name="descriptionLivre"
        ></textarea>
        <label for="nom">Description du livre</label>
      </div>

      <div class="input-field col s12">
        <!--v-model cree la liason (binding) entre les champs des formulaire (et-ou composant) et les objets
        name est la valeur du champ recup
        name passe les valeur a l'objet via v-model
        -->
        <input
            id="prix"
            type="number"
            step="0.01"
            class="validate"
            required
            v-model="produits.prixLivre"
            name="prixLivre"
        />
        <label for="nom">Prix du livre (€)</label>
      </div>

      <div class="input-field col s12">
        <!--v-model cree la liason (binding) entre les champs des formulaire (et-ou composant) et les objets
        name est la valeur du champ recup
        name passe les valeur a l'objet via v-model
        -->
        <input
            id="image"
            type="text"
            class="validate"
            required
            v-model="produits.imageLivre"
            name="imageLivre"
        />
        <label for="nom">URL couverture du livre</label>
      </div>

      <!--Vue 3 utilise l'attribut @click ou v-on="click" comme eventListener
      On appel donc la methode sauvegarderLive()
      -->
      <button @click="sauveGarderLivre" class="waves-effect waves-light btn orange darken-2">VALIDER LE LIVRE</button>

    </div>
    <div v-else>
      <h4 class="center green lighten-4" style="padding: 20px">Votre livre a été ajouté avec succès !</h4>
      <!--Au clic on appel la methode nouveauProduit qui reset le formaulaire-->
      <button @click="nouveauProduit" class="waves-effect waves-light btn green darken-2">AJOUTER UN LIVRE</button>
    </div>
  </div>

</template>

<script>
//Import du fichier de service et acces au methode
import LivresServices from "../services/LivresServices";

export default {
  name: "AjouterProduits",
  //fonction data retourne l'etat initial du DOM à l'instance d'un composant
  data(){
    //init d'un produit
    return{
      produits:{
        id:null,
        nomLivre:"",
        descriptionLivre:"",
        prixLivre:null,
        imageLivre:"",
        publier: false
      },
      soumis: false
    };
  },
  //Les methodes du composant
  methods:{
    sauveGarderLivre(){
      console.log("Ok clic");
      let data = {
        nomLivre: this.produits.nomLivre,
        descriptionLivre: this.produits.descriptionLivre,
        prixLivre: this.produits.prixLivre,
        imageLivre: this.produits.imageLivre
      };
      //Appel du fichier de services + creation d'une promesse

      LivresServices.ajouterLivres(data)
      .then(response => {
        this.produits.id = response.data.id;
        console.log(data);
        //Cette est condition est utilisée dans le <template>html !soumis + v-if
        this.soumis = true;
      })
      .catch(erreur => {
        console.log(erreur);
      });
    },
    //Reset du formulaire
    nouveauProduit(){
      this.soumis = false;
      //On reset l'objet produit
      this.produits = {};
    }
  }
};
</script>

<style scoped>

</style>