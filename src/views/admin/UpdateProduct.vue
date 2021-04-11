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
      <input class="" type="text" v-model="product.description" />
      <input class="" type="text" v-model="product.image" />
      <input class="" type="number" v-model="product.price" />
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
        class="btn btn-orange"
        btnText="Modifier"
        :btnFunction="() => updateProduct(product._id)"
      />
    </form>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
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