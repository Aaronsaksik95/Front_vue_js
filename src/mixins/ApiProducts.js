import apiConfigs from "../configs/api.configs";

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
    }
}