<template>
  <header class="header__main">
    <div class="cap"></div>
    <div class="header__nav">
      <div class="link-home">
        <router-link to="/home">
          <img src="../assets/logo.png" alt="" />
        </router-link>
      </div>
      <div class="nav-page">
        <ul>
          <li @click="refresh">
            <router-link to="/genre/homme"><strong>Homme</strong></router-link>
          </li>
          <li @click="refresh">
            <router-link to="/genre/femme"><strong>Femme</strong></router-link>
          </li>
          <li @click="refresh">
            <router-link to="/genre/enfant"><strong>Enfant</strong></router-link>
          </li>
          <li><router-link to="/login">S'identifier</router-link></li>
          <li><router-link to="/orders">Mes commandes</router-link></li>
          <li v-if="this.isAdmin"><router-link to="/admin/products">Admin</router-link></li>
        </ul>
      </div>
      <Search class="search" />
      <div class="nav-tool">
        <ul>
          <li>
            <router-link to="/profil"
              ><img class="img-icon" src="../assets/profil.png" alt=""
            /></router-link>
          </li>
          <li>
            <router-link to="/cart"
              ><img class="img-icon" src="../assets/cart.png" alt=""
            /></router-link>
          </li>
          <li>
            <router-link to="/whish"
              ><img class="img-icon" src="../assets/whish.png" alt=""
            /></router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Search from "../components/product/Search";
import ApiUsers from "../mixins/ApiUsers";
export default {
  components: {
    Search,
  },
  data: function () {
    return {
      isAdmin: false
    };
  },
  mixins: [ApiUsers],
  created(){
    this.isAdmin = this.is_admin()
  },
  methods: {
    refresh() {
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.cap {
  width: 100%;
  height: 30px;
  background-color: rgb(235, 235, 235);
}
.link-home {
  margin: 5px 100px 0px 10px;
  img {
    width: 60px;
  }
}
.header__nav {
  display: flex;
  margin-bottom: 20px;
  a {
    color: black;
  }
  .nav-page {
    ul {
      text-transform: uppercase;
      display: flex;
      list-style-type: none;
      margin-bottom: 0px;
      font-size: 14px;
      padding: 0px;
      li {
        margin: 20px;
      }
    }
  }
  .search {
    margin: 25px 0px 0px 70px;
    width: 300px;
  }
  .nav-tool {
    margin-left: 0px;
    ul {
      font-weight: bold;
      display: flex;
      list-style-type: none;
      li {
        margin: 20px 10px 10px 10px;
        .img-icon {
          width: 27px;
        }
      }
    }
  }
}
</style>