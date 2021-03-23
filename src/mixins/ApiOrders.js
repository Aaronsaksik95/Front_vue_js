import apiConfigs from "../configs/api.configs";
import VueJwtDecode from "vue-jwt-decode";
const token = localStorage.getItem("token");

export default {
    methods: {
        order_cart(cart, total) {
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
            }).then((res) => res.json())
        },
        get_order(id){
            return fetch(`${apiConfigs.apiUrl}orders/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }).then((res) => res.json())
        }
    }
}