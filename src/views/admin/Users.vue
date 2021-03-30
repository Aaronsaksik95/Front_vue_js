<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" />
    </div>
    <table class="table w-50 mx-auto">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Prénom</th>
          <th scope="col">nom</th>
          <th scope="col">email</th>
          <th scope="col">phone</th>
          <th scope="col">Adresse</th>
          <th scope="col">ville</th>
          <th scope="col">pays</th>
          <th scope="col">IsAdmin</th>
          <th scope="col">Supprimer</th>
          <th scope="col">Modifier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredShop" :key="item._id">
          <th>{{ item._id }}</th>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.isAdmin }}</td>

          <!-- <td>
            <select>
              <option v-for="i in item.categories" :key="i._id">
                {{ i.title }}
              </option>
            </select>
          </td> -->
          <td>
            <Button
              class="btn btn-red"
              btnText="Supprimer"
              :btnFunction="() => delete_users(item._id)"
            />
          </td>
          <td>
            <router-link
              class="btn btn-warning"
              :to="`./updateUser/${item._id}`"
              >Modifier</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TitlePage from "../../components/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiUsers from "../../mixins/ApiUsers";
import Button from "../../components/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      users: [],
      searchValue: "",
      display_update: true,
    };
  },
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.users.filter((item) => item.firstName.match(filter));
    },
  },
  mixins: [ApiUsers],
  created() {
    this.get_users()
      .then((data) => {
        this.users = data.users;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    delete_users(id) {
      this.deleteUsers(id).catch((err) => console.log(err));
      document.location.reload();
    },
    displayUpdateButton() {
      this.display_update = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 50px;
}
</style>