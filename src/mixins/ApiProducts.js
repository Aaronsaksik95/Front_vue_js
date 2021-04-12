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
        get_product_category(title) {
            return fetch(`${apiConfigs.apiUrl}products`, {
                body: JSON.stringify({
                    category: title
                }),
            }).then(res => res.json())
        },
        get_products_genre(genre) {
            return fetch(`${apiConfigs.apiUrl}products/genre/${genre}`, {
            }).then(res => res.json())
        },
        get_products_category(genre, category){
            return fetch(`${apiConfigs.apiUrl}products/genre/${genre}/category/${category}`, {
            }).then(res => res.json())
        },
        add_product() {
            return fetch(`${apiConfigs.apiUrl}products`, {
                method: "POST",
                body: JSON.stringify({
                    price: this.price,
                    title: this.title,
                    genre: this.genre,
                    description: this.description,
                    image: this.image,
                    categoriesArray: this.titleCategories,
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
                    genre: this.product.genre,
                    description: this.product.description,
                    image: this.product.image,
                    categoriesArray: this.titleCategories,
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