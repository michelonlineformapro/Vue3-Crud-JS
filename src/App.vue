<script>
export default {
  name: "app"
}
</script>

<template>
  <div id="app">
    <nav class="orange darken-1">
      <div class="nav-wrapper">
        <router-link to="/">VUE3</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link to="/">LISTE PRODUITS</router-link>
          </li>
          <li>
            <router-link to="/ajouter-produits">AJOUTER PRODUITS</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!--Afficher le contenu des fichier .vue = composant -->
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import './assets/base.css';

</style>


