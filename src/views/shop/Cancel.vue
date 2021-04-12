<template>
  <div class="cancel">
    <h1>Une erreur est survenue, la commande n'a pas été éffectué.</h1>
    <router-link to="/cart">Mon panier</router-link>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
export default {
  components: {
    TitlePage,
  },
};
</script>

<style lang="scss" scoped>
.cancel {
  color: rgb(250, 84, 0);
}
a {
  color: black;
  font-weight: bold;
}
</style>