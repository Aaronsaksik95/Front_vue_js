<template>
  <div class="detail">
    <img class="img-product" :src="productObject.image" alt="image produit" />
    <div class="info-product">
      <p class="genre">{{ productObject.genre }}</p>
      <p class="title">{{ productObject.title }}</p>
      <p class="price">{{ productObject.price }} €</p>
      <small class="label">Catégories</small>
      <div class="categ">
        <p v-for="item in productObject.categories" :key="item._id">
          {{ item.title }}
        </p>
      </div>
      <div class="desc">
        <!-- <small class="label">Description</small> -->
        <p>{{ productObject.description }}</p>
      </div>

      <div class="tools">
        <Button
          class="btn btn-black btn-large"
          btnText="Ajouter au panier"
          :btnFunction="addCart"
        />
        <Button
          class="btn btn-large"
          btnText="Favoris"
          :btnFunction="addWhish"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TitlePage from "../tools/TitlePage";
import Button from "../tools/Button";
import Cart from "../../mixins/Cart";
import Whish from "../../mixins/Whish";
export default {
  components: {
    TitlePage,
    Button,
  },
  props: {
    productObject: {
      required: true,
    },
  },
  mixins: [Cart, Whish],
  methods: {
    addCart() {
      this.add_cart(this.productObject);
    },
    addWhish() {
      this.add_whish(this.productObject);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  .img-product {
    grid-column: 2 / span 7;
    width: 100%;
  }
  .info-product {
    grid-column: 9 / span 2;
    text-align: left;
    .genre {
      margin: 10px 0px 0px 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .title {
      margin: 0px 0px 0px 10px;
      font-size: 35px;
    }
    .price {
      margin: 10px;
      color: rgb(40, 162, 43);
      font-weight: bold;
    }
    .label {
      margin: 10px;
    }
    .categ {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
      margin: 0px 0px 10px 10px;
      p {
        border: 1px solid rgb(233, 233, 233);
        border-radius: 10px;
        padding: 5px;
        overflow: scroll;
        margin: 2px;
      }
    }
    .desc {
      margin: 0px 0px 25px 0px;
      font-size: 17px;
      max-height: 300px;
      text-align: justify;
      overflow: scroll;
    }
  }
}
</style>