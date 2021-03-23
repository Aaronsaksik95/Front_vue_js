<template>
  <div>
    <router-link :to="`/product/${productObject._id}`">
    <h3>{{ productObject.title }}</h3>
    <img class="img-produits" :src="productObject.image" alt="image produit" />
    <p class="desc-produits">{{ productObject.description }}</p>
    <p class="price-produits">{{ productObject.price }} €</p>
    </router-link>
    <Button class="btn" btnText="Panier" :btnFunction="addCart" />
  </div>
</template>

<script>
import Button from "../../components/Button";
import Cart from '../../mixins/Cart';
export default {
  components: {
    Button
  },
  props: {
    productObject: {
        required: true,
        type: Object
    }
  },
  mixins: [Cart],
  methods: {
    addCart(){
      this.addItemcart(this.productObject)
    }
  },
};
</script>

<style lang="scss" scoped>
.img-produits{
  width: 300px;
}
</style>