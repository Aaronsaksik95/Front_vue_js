<template>
  <div>
    <div class="info-user">
      <label for="">Prenom</label>
      <input v-if="edit" v-model="user.firstName" type="text" />
      <p v-else>{{ user.firstName }}</p>
    </div>
    <div class="info-user">
      <label for="">Nom</label>
      <input v-if="edit" v-model="user.lastName" type="text" />
      <p v-else>{{ user.lastName }}</p>
    </div>
    <div class="info-user">
      <label for="">Email</label>
      <input v-if="edit" v-model="user.email" type="text" />
      <p v-else>{{ user.email }}</p>
    </div>
    <div class="info-user">
      <label for="">Adresse</label>
      <input v-if="edit" v-model="user.address" type="text" />
      <p v-else>{{ user.address }}</p>
    </div>
    <div class="info-user">
      <label for="">Ville</label>
      <input v-if="edit" v-model="user.city" type="text" />
      <p v-else>{{ user.city }}</p>
    </div>
    <div class="info-user">
      <label for="">Code postal</label>
      <input v-if="edit" v-model="user.postalCode" type="text" />
      <p v-else>{{ user.postalCode }}</p>
    </div>
    <div class="info-user">
      <label for="">Pays</label>
      <input v-if="edit" v-model="user.country" type="text" />
      <p v-else>{{ user.country }}</p>
    </div>
    <Button v-if="edit" class="btn" btnText="Valider" :btnFunction="editUser" />
    <Button v-else class="btn" btnText="Modifier" :btnFunction="editTrue" />
    <Button class="btn" btnText="Déconnexion" :btnFunction="logout" />
  </div>
</template>

<script>
import Button from "../../components/Button";
import VueJwtDecode from "vue-jwt-decode";
export default {
  data: function () {
    return {
      myTitle: "Page profil",
      user: [],
      userId: null,
      edit: false,
    };
  },
  components: {
    Button,
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$router.push("./login");
    },
    editTrue() {
      this.edit = true;
    },
    editUser() {
      const token = localStorage.getItem("token");
      const decode = VueJwtDecode.decode(token);
      const URL = `https://api-node-aaron-saksik.herokuapp.com/api/v1/users/${decode.id}`;

      fetch(URL, {
        method: "PUT",
        body: JSON.stringify({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone,
          address: this.user.address,
          city: this.user.city,
          postalCode: this.user.postalCode,
          country: this.user.country,
        }),
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    const token = localStorage.getItem("token");
    const decode = VueJwtDecode.decode(token);
    const URL = `https://api-node-aaron-saksik.herokuapp.com/api/v1/users/${decode.id}`;

    fetch(URL, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data.user;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.info-user {
  p {
    margin: 0px;
  }
  label {
    font-weight: bold;
  }
  input {
    display: block;
    margin: auto;
  }
}
</style>