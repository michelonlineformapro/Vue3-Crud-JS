<template>
  <div class="container" v-if="livreCourant">
    <h4 class="orange">Mettre a jour le livre</h4>
    <form>

      <div class="input-field">
        <input
          type="text"
          class="validate"
          id="nomLivre"
          v-model="livreCourant.nomLivre">
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
            v-model="livreCourant.descriptionLivre"
            name="descriptionLivre"></textarea>
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
            v-model="livreCourant.prixLivre"
            name="prixLivre"
        />
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
            v-model="livreCourant.imageLivre"
            name="imageLivre"
        />
      </div>

      <span>
        <label>STATUS : </label>
        <span class="green-text">{{livreCourant.publier ? "PUBLIER" : "EN ATTENTE DE PUBLICATION"}}</span>
      </span>

    </form>
    <!--Bouton de mise a jour de publication-->
    <button class="waves-effect waves-light btn orange"
      v-if="livreCourant.publier"
            @click="mettreJourPublication(false)">
      Mettre en attente de publication
    </button>

    <button class="waves-effect waves-light btn green"
            @click="mettreJourPublication(true)">
      Publier
    </button>

    <button style="margin-left: 20px" class="waves-effect waves-light btn purple"
            @click="deleteLivre">
      Supprimer ce livre
    </button>

    <button style="margin-left: 20px" class="waves-effect waves-light btn red"
            @click="updateLivre">
      Mettre à jour ce livre
    </button>
    <!--Afficher le message en fonction du bouton cliké-->
    <p class="green-text">{{message}}</p>

  </div>
  <!--Le else-->
  <div v-else>
    <br />
    <p class="green-text">Merci de choisir un livre</p>
  </div>
</template>

<script>
//Appel du fichier de services et ses methodes
import LivresServices from "../services/LivresServices";
export default {
  name: "Produits",
  data(){
    return {
      livreCourant: null,
      message: ''
    };
  },
  methods:{
    //On creer une fonction pour afficher un livre
    getLivreById(id){
      //Appel de la methode du services
      LivresServices.afficherUnLivre(id)
      //On retourne une promesse
      .then(response => {
        //le livre courant initialisé dans data(){} devient le livre + id
        this.livreCourant = response.data;
        console.log(response.data);
      })
      //Sinon la promesse echoue et on affiche une erreur
      .catch(erreur => {
        console.log(erreur);
      });
    },
    mettreJourPublication: function (status) {
      //On creer un objet de données du livre courant (soit le livre recup par son id)
      let data = {
        id: this.livreCourant.id,
        nomLivre: this.livreCourant.nomLivre,
        descriptionLivre: this.livreCourant.descriptionLivre,
        prixLivre: this.livreCourant.prixLivre,
        imageLivre: this.livreCourant.imageLivre,
        publier: status
      };
      //Appel du service de mise a jour
      //En paramètre id + data
      //Soit le livre courant et objet data
      LivresServices.mettreJourLivre(this.livreCourant.id, data)
          //On retourne une promesse
          .then(response => {
            console.log(response.data);
            //On modif le status du livre (publier - depublier)
            this.livreCourant.publier = status;
            //On affiche un message de succès
            this.message = "<p class='green-text'>Le livre est publier avec succès !</p>";
            this.$router.go();
          })
          //Si la promesse n'est pa tenue on retourne une erreur
          .catch(erreur => {
            console.log(erreur);
            this.message = '<p class="red-text">Erreur lors de la publication</p>';
          });
    },
    //Cette fonction met a jour un livre
    updateLivre(){
      console.log(this.livreCourant);
      //Appel des service et de la methode de mise a jour(id + data)
      LivresServices.mettreJourLivre(this.livreCourant.id, this.livreCourant)
      //On retourne une promesse
      .then(response => {
        console.log(response.data);
        //On affiche un message de succès
        this.message = `<p class="green-text">Le livre a été mis à jour avec succès !</p>`
      })
      //Sinon on retourne une erreur
      .catch(erreur => {
        console.log(erreur);
        this.message = '<p class="red-text">Erreur lors de la mise a jour du livre ! </p>'
      });
    },
    //Supprimer un livre(id)
    deleteLivre(){
      LivresServices.supprimerUnLivre(this.livreCourant.id)
      //On retourne une promesse
      .then(response => {
        console.log(response.data);
        this.message = '<p class="red-text">Le livre à bien été supprimé ! </p>'
        //On redirige vers la meme page
        this.$router.push({
          name: ""
        })
        //Sinon on affiche une erreur
        .catch(erreur => {
          console.log(erreur);
          this.message = '<p class="red-text">Erreur lors de la supression du livre ! </p>'
        });
      });
    }
  },
  //Apres le 1er render
  mounted() {
    this.message = '';
    this.getLivreById(this.$route.params.id);
  }
};
</script>

<style scoped>
  .collection-item:hover{
    cursor: pointer;
  }
</style>