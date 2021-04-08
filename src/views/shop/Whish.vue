<template>
  <div>
    <div v-if="whish">
      <TitlePage :title="myTitle" />
      <Button
        class="btn"
        btnText="Supprimer les favoris"
        :btnFunction="removeWhish"
      />
      <table class="table-whish">
        <thead>
          <tr>
            <th>Aperçu</th>
            <th>Titre</th>
            <th>Price</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in whish" :key="item.id">
            <td>
              <img class="img-produits" :src="item.image" alt="image produit" />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }} €</td>
            <td>
              <router-link :to="`/product/${item._id}`">Voir</router-link>
            </td>
            <td>
              <Button class="btn" btnText="Supprimer" :btnFunction="() => removeItemWhish(item)"/>
            </td>
            <td>
              <Button class="btn" btnText="Panier" :btnFunction="() => addCart(item)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 v-else>Les articles ajoutés à vos favoris seront enregistrés ici.</h2>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import Cart from "../../mixins/Cart";
import Whish from "../../mixins/Whish";

export default {
  name: "Whish",
  components: {
    TitlePage,
    Button,
  },
  data: function () {
    return {
      myTitle: "Mes favoris",
      whish: [],
      d_button: false,
    };
  },
  mixins: [Whish, Cart],
  created() {
    this.whish = this.get_whish();
  },
  methods: {
    editQuantity(qty, id) {
      this.edit_quantity(qty, id);
    },
    displayButton() {
      this.d_button = true;
    },
    removeWhish() {
      this.remove_whish();
    },
    removeItemWhish(item) {
      this.remove_item_whish(item);
    },
    addCart(product){
      this.add_cart(product)
    },
  },
};
</script>

<style lang="scss" scoped>
.table-whish {
  margin: auto;
}
.img-produits {
  width: 40px;
}
.input-qty {
  width: 30px;
}
</style>