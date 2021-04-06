<template>
  <div v-click-outside="DivResultNone" class="div-search">
    <input
      class="search"
      type="text"
      placeholder="Recherche un modèle..."
      v-model="searchValue"
      @click="DivResult"
    />
    <div v-if="(searchValue != '') & search" class="div-result">
      <ul>
        <li v-for="item in filteredShop" :key="item._id">
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ApiProducts from "../mixins/ApiProducts";
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      search: false,
      products: [],
      searchValue: "",
    };
  },
  mounted() {},
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.title.match(filter));
    },
  },
  mixins: [ApiProducts],
  created() {
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    DivResult: function () {
      this.search = true;
    },
    DivResultNone() {
      this.search = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style lang="scss" scoped>
.search {
  height: 40px;
  border-radius: 10px;
  border: none;
  text-indent: 5px;
  width: 100%;
  background-color: rgb(223, 223, 223);
}
.img-search {
  width: 22px;
}
.img-lu {
  width: 90px;
}
.btn-search {
  background: #fff;
  border: 1px solid white;
  height: 40px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  border-left: none;
}
.div-result {
  width: 100%;
  margin: 0px 0px 0px 5px;
  z-index: 2;
  height: auto;
  max-height: 300px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
  ul {
    list-style-type: none;
  }
}
</style>