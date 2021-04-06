import apiConfigs from "../configs/api.configs";
import VueJwtDecode from "vue-jwt-decode";
import cartFunc from "./Cart"
import { loadStripe } from "@stripe/stripe-js";
const token = localStorage.getItem("token");

export default {
    methods: {
        order(cart, total) {
            if (token) {
                const decode = VueJwtDecode.decode(token)
                var products = []
                cart.forEach(item => {
                    products.push(item._id)
                });
                return fetch(`${apiConfigs.apiUrl}orders`, {
                    method: "POST",
                    body: JSON.stringify({
                        total: total,
                        user: decode.id,
                        products: products
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                }).then((res) => {
                    res.json(),
                        cartFunc.methods.remove_cart()
                        this.stripeOrder()
                })

            } else {
                console.log("coucou")
                this.$router.push("./login");
            }

        },
        async stripeOrder() {
            const stripePromise = loadStripe("pk_test_51IYBNvEQHZJwGPKJsBVhHzLtgNp955e6drYz0RILC0zOfwZGYny4lG8DLyN5GmRornKBXXKkKLbb51PgsMEnY1GQ007qQCwhJq");
            const stripe = await stripePromise;
            const response = await fetch(
                `${apiConfigs.apiUrl}create-checkout-session`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify({
                        amount: this.getTotal * 100,
                    }),
                }
            );
            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        },
        get_order(id) {
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        get_orders() {
            return fetch(`${apiConfigs.apiUrl}orders`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        },
        delete_order(id){
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        }
    }
}