import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        order_cart() {
            return fetch(`${apiConfigs.apiUrl}orders`, {
                method: "POST",
                body: JSON.stringify({
                    total: this.total,
                    user: this.user,
                    products: this.products
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then((res) => res.json())
        },
    }
}