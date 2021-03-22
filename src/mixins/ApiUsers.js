import apiConfigs from "../configs/api.configs"
import VueJwtDecode from "vue-jwt-decode";
const token = localStorage.getItem("token");

export default {
    methods: {
        getUser() {
            const decode = VueJwtDecode.decode(token)
            return fetch(`${apiConfigs.apiUrl}users/${decode.id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        postUser() {
            fetch(`${apiConfigs.apiUrl}users`, {
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
            }).then((res) => res.json())
        },
        putUser() {
            const decode = VueJwtDecode.decode(token)
            return fetch(`${apiConfigs.apiUrl}users/${decode.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address,
                    city: this.user.city,
                    postalCode: this.user.postalCode,
                    country: this.user.country,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
        },
    }
}