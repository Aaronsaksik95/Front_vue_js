<template>
  <div>
    <HeaderAdmin />
    <form action="" class="form-product">
      <label>Titre</label>
      <input class="" type="text" v-model="title" />
      <label>Genre</label>
      <select v-model="genre">
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="enfant">Enfant</option>
      </select>
      <label>Description</label>
      <input class="" type="text" v-model="description" />
      <label>Image</label>
      <input class="" type="text" v-model="image" />
      <label>Prix</label>
      <input class="" type="number" v-model="price" />
      <label>Catégories</label>
      <input
        @click="displaySuggestion"
        type="text"
        v-model="category"
        class=""
      />
      <div v-if="displayDiv" class="div_suggestion">
        <p
          v-for="item in filteredCategory"
          :key="item._id"
          @click="() => inputValue(item.title)"
          class="suggestion"
        >
          {{ item.title }}
        </p>
      </div>
      <p @click="addCategory" class="btn btn-success">Ajouter catégorie</p>
      <div class="d-flex w-100 horizontal-scrollable">
        <p class="m-1" v-for="item in titleCategories" :key="item._id">
          {{ item }}
        </p>
      </div>
      <Button class="btn" btnText="Ajouter" :btnFunction="addProduct" />
    </form>
    <ProductItem v-if="newProduct._id" :productObject="newProduct" />
  </div>
</template>

<script>
import Button from "../../components/Button";
import ApiCategories from "../../mixins/ApiCategories";
import ApiProducts from "../../mixins/ApiProducts";
import ProductItem from "../../components/product/ProductItem";
import HeaderAdmin from "../../layout/HeaderAdmin";

export default {
  components: {
    Button,
    ProductItem,
    HeaderAdmin,
  },
  data: function () {
    return {
      title: "",
      genre: "",
      description: "",
      image: "",
      price: "",
      allCategories: [],
      titleCategories: [],
      newProduct: {},
      category: "",
      idCategories: [],
      displayDiv: false,
    };
  },
  mixins: [ApiCategories, ApiProducts],
  created() {
    this.get_categories().then((data) => {
      this.allCategories = data.categories;
    });
  },
  computed: {
    filteredCategory: function () {
      let filter = new RegExp(this.category, "i");
      return this.allCategories.filter((item) => item.title.match(filter));
    },
  },
  methods: {
    addProduct() {
      this.add_product().then((data) => {
        this.newProduct = data.product;
      });
    },
    addCategory() {
      this.get_category(this.category).then((data) => {
        if (data.category == null) {
          this.add_category().then((data) => {
            this.idCategories.push(data.category._id);
            this.titleCategories.push(data.category.title);
          });
        } else {
          this.idCategories.push(data.category._id);
          this.titleCategories.push(data.category.title);
        }
      });
    },
    inputValue(title) {
      this.category = title;
    },
    displaySuggestion() {
      this.displayDiv = true;
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
.div_suggestion {
  height: 200px;
  width: 15%;
  margin: auto;
  overflow: scroll;
  .suggestion:hover {
    background-color: bisque;
  }
}
</style>