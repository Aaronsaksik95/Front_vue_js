<template>
  <div>
    <form action="">
      <input class="" type="email" v-model="email" />
      <input class="" type="password" v-model="password" />
      <Button class="btn" btnText="Connexion" :btnFunction="login" />
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import Button from "../../components/Button";
import ApiAuth from "../../mixins/ApiAuth";
export default {
  components: {
    Button,
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
          localStorage.setItem("token", data.token);
          if (data.auth) {
            this.$router.push("./profil");
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
</style>