import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        getCategories() {
            return fetch(`${apiConfigs.apiUrl}categories`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
    }
}