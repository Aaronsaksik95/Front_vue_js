<template>
  <div>
    <HeaderAdmin />
    <form action="" class="form-product">
      <label>Genre</label>
      <select v-model="genre">
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="enfant">Enfant</option>
      </select>
      <input placeholder="Titre" class="" type="text" v-model="title" />
      <input
        placeholder="Description"
        class=""
        type="text"
        v-model="description"
      />
      <input placeholder="Image" class="" type="text" v-model="image" />
      <input placeholder="Prix" class="" type="number" v-model="price" />
      <div class="list-categ">
        <div class="item-categ" v-for="item in titleCategories" :key="item._id">
          <p>
            {{ item }}
          </p>
          <h2 class="x-delete" @click="() => deleteItem(item)">x</h2>
        </div>
      </div>
      <div class="categ">
        <input
          placeholder="Catégories"
          @click="displaySuggestion"
          type="text"
          v-model="category"
        />
        <p @click="addCategory" v-if="category != ''">
          Ajouter cette catégorie
        </p>
      </div>
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
      <Button
        class="btn btn-large btn-black"
        btnText="Ajouter le produit"
        :btnFunction="addProduct"
      />
    </form>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
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
      this.add_product().then(() => {
        this.$router.push("./products");
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
      this.category = ""
    },
    deleteItem(item) {
      var index = this.titleCategories.indexOf(item);
      this.titleCategories.splice(index, 1);
      this.idCategories.splice(index, 1);
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
    margin: 20px auto;
    width: 200px;
  }
  select {
    width: 200px;
    display: block;
    margin: auto;
  }
  .list-categ {
    width: 200px;
    display: flex;
    margin: auto;
    overflow: scroll;
    .item-categ {
      display: flex;
      border-radius: 10px;
      background-color: #009da8;
      margin: 3px;
      p {
        margin: 3px 3px 5px 3px;
        font-size: 15px;
        padding-left: 3px;
      }
      .x-delete {
        font-weight: bold;
        color: white;
        font-size: 19px;
        margin: 0px 6px 0px 6px;
      }
    }
  }
  .categ {
    width: 15%;
    margin: auto;
    input {
      margin-bottom: 3px;
    }
    p {
      padding: 3px 0px;
      background-color: rgb(218, 218, 218);
      border-radius: 10px;
      font-size: 13px;
      width: 70%;
      margin: auto;
    }
  }
}
.div_suggestion {
  max-height: 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 30%;
  margin: auto;
  overflow: scroll;
  :hover {
    background-color: #009da8;
  }
  .suggestion {
    margin: 3px 3px 5px 3px;
    font-size: 15px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid #009da8;
  }
}
</style>