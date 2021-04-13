<template>
  <div>
    <div class="filter">
      <p>Fitrer</p>
      <img class="icon-filter" src="../../assets/filter.png" alt="" />
    </div>
    <ul class="list-categ" @click="refresh">
      <router-link
        v-for="item in categories"
        :key="item._id"
        :to="`/genre/${genre}/category/${item.title}`"
        class="item-categ"
      >
        {{ item.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>
import ApiCategories from "../../mixins/ApiCategories";
export default {
  data() {
    return {
      categories: [],
      genre: this.$route.params.genre,
    };
  },
  mixins: [ApiCategories],
  created() {
    this.get_categories().then((data) => {
      this.categories = data.categories.sort();
    });
  },
  methods: {
    refresh() {
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-categ {
  max-height: 90%;
  overflow: scroll;
  list-style-type: none;
  padding: 20px;
  margin: auto;
  :hover {
    background-color: #39cdd8;
  }
  .item-categ {
    display: block;
    margin: 3px 3px 5px 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding: 4px;
    border-radius: 10px;
    // border: 1px solid #009da8;
    color: black;
  }
}
.filter {
  display: flex;
  justify-content: center;
  p{
    font-size: 25px;
  }
  .icon-filter {
    width: 25px;
    height: 25px;
    position: relative;
    top: 30px;
  }
}
</style>
