<template>
  <div>
    <TitlePage :title="productObject.title" />
    <img :src="productObject.image" alt="image produit" />
    <small>{{ productObject.description }}</small>
    <p>{{ productObject.price }} €</p>
    <p v-for="item in productObject.categories" :key="item._id">{{item.title}}</p>
    <Button class="btn" btnText="Panier" :btnFunction="addCart" />
  </div>
</template>

<script>
import TitlePage from "../TitlePage";
import Button from "../../components/Button";
import Cart from '../../mixins/Cart';
export default {
  components: {
    TitlePage,
    Button,
  },
  props: {
    productObject: {
      required: true
    },
  },
  mixins: [Cart],
  methods: {
    addCart(){
      this.add_cart(this.productObject)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>