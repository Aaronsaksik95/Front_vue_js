<template>
  <div class="card">
    <div class="product">
      <router-link :to="`/product/${productObject._id}`">
        <img
          class="img-produits"
          :src="productObject.image"
          alt="image produit"
        />
      </router-link>
      <div class="info-tools">
        <router-link :to="`/product/${productObject._id}`">
          <div class="infos">
            <h5 class="title-produit">{{ productObject.title }}</h5>
            <h6 class="genre-produit">{{ productObject.genre }}</h6>
            <p v-if="productObject.description.length < 25" class="desc-produit">
              {{ productObject.description }}
            </p>
            <p v-else @mouseover="descPlus" @mouseout="descPlus" class="desc-produit">
              Afficher description
            </p>
            <p
              class="desc-plus"
              v-if="contentDesc && productObject.description.length > 25"
            >
              {{ productObject.description }}
            </p>
            <p class="price-produit">{{ productObject.price }} €</p>
          </div>
        </router-link>
        <div class="tools">
          <div>
            <img
              class="img-icon"
              src="../../assets/cart.png"
              alt=""
              @click="addCart"
            />
          </div>
          <div>
            <img
              class="img-icon"
              src="../../assets/whish.png"
              alt=""
              @click="addWhish"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import Cart from "../../mixins/Cart";
import Whish from "../../mixins/Whish";
export default {
  components: {
    Button,
  },
  data: function () {
    return {
      contentDesc: false,
    };
  },
  props: {
    productObject: {
      required: true,
      type: Object,
    },
  },
  mixins: [Cart, Whish],
  methods: {
    addCart() {
      this.add_cart(this.productObject);
    },
    addWhish() {
      this.add_whish(this.productObject);
    },
    descPlus() {
      if (this.contentDesc == true) {
        this.contentDesc = false;
      } else {
        this.contentDesc = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 0px;
}
.product {
  font-size: 20px;
  .img-produits {
    width: 80%;
    padding: 10px;
  }
  .info-tools {
    display: flex;
    justify-content: space-around;
    .infos {
      position: relative;
      text-align: left;
      .title-produit {
        color: rgb(250, 84, 0);
        margin: 0px;
        width: 250px;
        overflow: hidden;
      }
      .genre-produit {
        font-weight: bold;
        margin: 0px;
      }
      .desc-produit {
        color: rgb(102, 102, 102);
        margin: 0px;
      }
      .desc-plus {
        position: absolute;
        top: 80px;
        border-radius: 10px;
        padding: 5px;
        font-size: 13px;
        background-color: rgb(233, 233, 233);
        z-index: 2;
        text-align: justify;
      }
      .price-produit {
        font-weight: bold;
      }
    }
    .tools {
      :hover {
        background-color: rgb(167, 167, 167);
      }
      div {
        margin-top: 10px;
        width: 35px;
        height: 35px;
        border-radius: 50px;
        background-color: rgb(219, 219, 219);
        .img-icon {
          margin-top: 15%;
          width: 23px;
        }
      }
    }
  }
}
</style>