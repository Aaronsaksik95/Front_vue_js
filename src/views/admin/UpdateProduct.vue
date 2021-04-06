<template>
  <div>
    <form action="" class="form-product">
      <HeaderAdmin />
      <label>Titre</label>
      <input class="" type="text" v-model="product.title" />
      <select v-model="product.genre">
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="enfant">Enfant</option>
      </select>
      <label>Description</label>
      <input class="" type="text" v-model="product.description" />
      <label>Image</label>
      <input class="" type="text" v-model="product.image" />
      <label>Prix</label>
      <input class="" type="number" v-model="product.price" />
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
      <Button
        class="btn btn-orange"
        btnText="Modifier"
        :btnFunction="() => updateProduct(product._id)"
      />
    </form>
  </div>
</template>

<script>
import Button from "../../components/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";
import ApiCategories from "../../mixins/ApiCategories";
import ApiProducts from "../../mixins/ApiProducts";

export default {
  data: function () {
    return {
      product: [],
      category: "",
      allCategories: [],
      titleCategories: [],
      idCategories: [],
      displayDiv: false,
    };
  },
  components: {
    Button,
    HeaderAdmin,
  },
  mixins: [ApiProducts, ApiCategories],
  computed: {
    filteredCategory: function () {
      let filter = new RegExp(this.category, "i");
      return this.allCategories.filter((item) => item.title.match(filter));
    },
  },
  methods: {
    updateProduct(id) {
      this.update_product(id)
        .then(() => {
          this.$router.push("../products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCategory() {
      this.get_category(this.category).then((data) => {
        if (data.category == null) {
          this.postCategory().then((data) => {
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
  created: function () {
    this.get_product(this.$route.params.id)
      .then((data) => {
        this.product = data.product;
        data.product.categories.forEach((category) => {
          this.titleCategories.push(category.title);
          this.idCategories.push(category._id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.get_categories().then((data) => {
      this.allCategories = data.categories;
    });
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