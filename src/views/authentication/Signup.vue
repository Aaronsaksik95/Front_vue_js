<template>
  <div>
    <form action="" class="form-signup">
      <label>Prenom</label>
      <input class="" type="text" v-model="firstName" />
      <label>Nom</label>
      <input class="" type="text" v-model="lastName" />
      <label>Email</label>
      <input class="" type="email" v-model="email" />
      <label>Mot de passe</label>
      <input class="" type="password" v-model="password" />
      <label>Téléphone</label>
      <input class="" type="tel" v-model="phone" />
      <label>Adresse</label>
      <input class="" type="text" v-model="address" />
      <label>Ville</label>
      <input class="" type="text" v-model="city" />
      <label>Code postal</label>
      <input class="" type="text" v-model="postalCode" />
      <label>Pays</label>
      <input class="" type="text" v-model="country" />
      <Button class="btn" btnText="Connexion" :btnFunction="signup" />
      <!-- <p v-if="message">{{ message }}</p> -->
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };
  },
  methods: {
    signup: function () {
      const URL = 'https://api-node-aaron-saksik.herokuapp.com/api/v1/users/';

      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address,
          city: this.city,
          postalCode: this.postalCode,
          country: this.country,
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
.form-signup {
  input {
    display: block;
    margin: auto;
  }
}
</style>