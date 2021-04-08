<template>
  <div>
    <TitlePage title="Connexion" />
    <input placeholder="Email" type="email" v-model="email" />
    <input placeholder="Mot de passe" type="password" v-model="password" />
    <Button
      class="btn btn-large btn-black"
      btnText="Connexion"
      :btnFunction="login"
    />
    <small class="signup-link">
      Vous n'êtes pas encore membre ?
      <router-link to="/signup"><strong>Rejoignez-nous.</strong></router-link>
    </small>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import InputText from "../../components/tools/InputText";
import ApiAuth from "../../mixins/ApiAuth";
export default {
  components: {
    Button,
    InputText,
    TitlePage,
  },
  data: function () {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  mixins: [ApiAuth],
  methods: {
    login() {
      this.loginUser()
        .then((data) => {
          if (data.auth) {
            this.$router.push("./home");
            localStorage.setItem("token", data.token);
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-link {
  display: block;
}
</style>