<template>
  <header class="header__main">
    <div class="header__nav">
      <div class="link-home">
        <router-link to="/home">
          <img src="../assets/logo.png" alt="" />
        </router-link>
      </div>
      <div class="nav-page">
        <ul>
          <li><router-link to="/man">Homme</router-link></li>
          <li><router-link to="/woman">Femme</router-link></li>
          <li><router-link to="/kids">Enfant</router-link></li>
          <li><router-link to="/login">S'identifier</router-link></li>
          <li><router-link to="/orders">Mes commandes</router-link></li>
          <li><router-link to="/admin/products">Admin</router-link></li>
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
import Search from "../components/Search";
export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
.link-home {
  margin: 0px 100px 10px 10px;
  img {
    width: 60px;
  }
}
.header__nav {
  display: flex;
  .nav-page {
    ul {
      font-weight: bold;
      display: flex;
      list-style-type: none;
      li {
        margin: 20px;
      }
    }
  }
  .search {
    margin: 10px 0px 0px 70px;
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