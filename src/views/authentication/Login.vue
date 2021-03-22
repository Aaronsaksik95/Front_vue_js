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
  methods: {
    login: function () {
      const URL = `https://api-node-aaron-saksik.herokuapp.com/api/v1/users/login`;

      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
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