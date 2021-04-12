<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" placeholder="Recheche un email..."/>
    </div>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Status</div>
        <div class="col col-1">Total</div>
        <div class="col col-1">Prénom</div>
        <div class="col col-1">Nom</div>
        <div class="col col-1">Email</div>
        <div class="col col-1">Date</div>
        <div class="col col-1">Produit</div>
        <div class="col col-1">Supprimer</div>
      </li>
      <li class="table-row" v-for="item in filteredOrders" :key="item._id">
        <div class="col col-1">
          <div v-if="isStatus==item._id">
            <select v-model="status">
              <option value="TO DELIVER">TO DELIVER</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
            <Button
              class="btn btn-validate"
              btnText="Valider"
              :btnFunction="() => updateStatus(item._id)"
            />
          </div>
          <div v-else>
            <p>{{ item.status }}</p>
            <Button
              class="btn btn-update"
              btnText="Modifier"
              :btnFunction="() => updateTrue(item._id)"
            />
          </div>
        </div>

        <div class="col col-1">{{ item.total }} €</div>
        <div class="col col-1">{{ item.user.firstName }}</div>

        <div class="col col-1">{{ item.user.lastName }}</div>
        <div class="col col-1">{{ item.user.email }}</div>
        <div class="col col-1">{{ item.date }}</div>
        <div class="col col-1">
          <select>
            <option v-for="i in item.products" :key="i._id">
              {{ i.title }}
            </option>
          </select>
        </div>

        <div class="col col-1">
          <Button
            class="btn btn-delete"
            btnText="Supprimer"
            :btnFunction="() => deleteOrder(item._id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/tools/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";
import ApiOrders from "../../mixins/ApiOrders";

export default {
  name: "Shops",
  components: {
    TitlePage,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      orders: [],
      searchValue: "",
      isStatus: "",
      status: ""
    };
  },
  computed: {
    filteredOrders: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.orders.filter((item) => item.user.email.match(filter));
    },
  },
  mixins: [ApiProducts, ApiOrders],
  created() {
    this.get_orders()
      .then((data) => {
        this.orders = data.orders;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteOrder(id) {
      this.delete_order(id).catch((err) => console.log(err));
      document.location.reload();
    },
    updateStatus(id) {
      this.update_status(id)
      document.location.reload();
    },
    updateTrue(id){
      this.isStatus = id;
    }
  },
};
</script>

<style lang="scss" scoped>
.search__form {
  input {
    width: 200px;
    margin: auto;
  }
}
.responsive-table {
  width: 90%;
  margin: 20px auto;
  li {
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
    }
    .div-icon {
      width: 35px;
      height: 35px;
      border-radius: 50px;
      background-color: rgb(219, 219, 219);
      margin: auto;
      .img-icon {
        margin-top: 15%;
        width: 70%;
        border-radius: 10px;
      }
    }
  }
  .table-header {
    background-color: #39cdd8;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 10%;
  }
  select{
    width: 100px;
  }
}
</style>