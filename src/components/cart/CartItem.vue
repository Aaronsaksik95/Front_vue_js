<template>
  <div>
    <tr>
      <td>
        <img class="img-produits" :src="cartObject.image" alt="image produit" />
      </td>
      <td>{{ cartObject.title }}</td>
      <td>{{ cartObject.description }}</td>

      <td>
        <label>Quantité:</label>
        <input
          class="input-qty"
          type="number"
          min="1"
          v-model="qty"
          @click="displayButton"
        />
      </td>
      <td v-if="d_button">
        <Button
          class="btn btn-green"
          btnText="Mettre à jour"
          :btnFunction="editQuantity"
        />
      </td>
      <td>Prix: {{ cartObject.price }} €</td>
      <td><router-link :to="`/product/${cartObject._id}`">Voir</router-link></td>
    </tr>
    
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import Cart from "../../mixins/Cart";
export default {
  components: {
    Button,
  },
  data: function () {
    return {
      qty: this.cartObject.qty,
      d_button: false,
    };
  },
  props: {
    cartObject: {
      required: true,
      type: Object,
    },
  },
  mixins: [Cart],
  methods: {
    editQuantity() {
      this.editQty(this.qty, this.cartObject._id);
      this.d_button = false;
    },
    displayButton() {
      this.d_button = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-produits {
  width: 40px;
}
.input-qty {
  width: 30px;
}
tr {
  justify-content: space-around;
}
</style>