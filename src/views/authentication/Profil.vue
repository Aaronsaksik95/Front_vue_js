<template>
  <div>
    <TitlePage title="Inscription" />
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
      <p>{{ user.email }}</p>
    </div>
    <div class="info-user">
      <label for="">Phone</label>
      <p>{{ user.phone }}</p>
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
import TitlePage from "../../components/tools/TitlePage";
import Button from "../../components/tools/Button";
import ApiUsers from "../../mixins/ApiUsers";

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
    TitlePage,
  },
  mixins: [ApiUsers],
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$router.push("./login");
    },
    editTrue() {
      this.edit = true;
    },
    editUser() {
      this.update_user()
        .then((data) => {
          this.user = data.user;
          document.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.get_user()
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