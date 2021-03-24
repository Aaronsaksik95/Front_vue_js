import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        getProducts() {
            return fetch(`${apiConfigs.apiUrl}products`)
                .then(res => res.json())
        },
        getProduct(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`)
                .then(res => res.json())
        },
        add_product() {
            return fetch(`${apiConfigs.apiUrl}products`, {
                method: "POST",
                body: JSON.stringify({
                    price: this.price,
                    title: this.title,
                    description: this.description,
                    image: this.image,
                    categories: this.categories
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        delete_products(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        }
    }
}