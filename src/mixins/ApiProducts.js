import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        get_products() {
            return fetch(`${apiConfigs.apiUrl}products`)
                .then(res => res.json())
        },
        get_product(id) {
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
                    categories: this.idCategories
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            }).then(res => res.json())
        },
        update_product(id) {
            return fetch(`${apiConfigs.apiUrl}products/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    price: this.product.price,
                    title: this.product.title,
                    description: this.product.description,
                    image: this.product.image,
                    categories: this.idCategories
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
        },
        delete_product(id) {
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