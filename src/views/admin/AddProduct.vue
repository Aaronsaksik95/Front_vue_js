<template>
  <div>
    <form action="" class="form-product">
      <label>Titre</label>
      <input class="" type="text" v-model="title" />
      <label>Description</label>
      <input class="" type="text" v-model="description" />
      <label>Image</label>
      <input class="" type="text" v-model="image" />
      <label>Prix</label>
      <input class="" type="number" v-model="price" />
      <label>Catégories</label>
      <select>
        <option v-for="item in categories" :key="item._id" :value="item._id">
          {{ item.title }}
        </option>
      </select>
      <Button class="btn" btnText="Ajouter" :btnFunction="addProduct" />
    </form>
    <ProductItem v-if="newProduct._id" :productObject="newProduct" />
  </div>
</template>

<script>
import Button from "../../components/Button";
import ApiCategories from "../../mixins/ApiCategories";
import ApiProducts from "../../mixins/ApiProducts";
import ProductItem from "../../components/product/ProductItem"
export default {
  components: {
    Button,
    ProductItem
  },
  data: function () {
    return {
      title: "",
      description: "",
      image: "",
      price: "",
      categories: [],
      newProduct: {}
    };
  },
  mixins: [ApiCategories, ApiProducts],
  created() {
    this.getCategories()
    .then((data) => {
      this.categories = data.categories;
    });
  },
  methods: {
    addProduct() {
      this.add_product()
      .then((data) => {
        this.newProduct = data.product;
        console.log(this.newProduct)
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-product {
  input {
    display: block;
    margin: auto;
  }
}
</style>