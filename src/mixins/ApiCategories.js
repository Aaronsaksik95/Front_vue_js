import apiConfigs from "../configs/api.configs";
const token = localStorage.getItem("token");

export default {
    methods: {
        get_categories() {
            return fetch(`${apiConfigs.apiUrl}categories`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        get_category(title) {
            return fetch(`${apiConfigs.apiUrl}categories/${title}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())
        },
        add_category() {
            return fetch(`${apiConfigs.apiUrl}categories`, {
                method: "POST",
                body: JSON.stringify({
                    title: this.category,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token,
                },
            })
                .then(res => res.json())

        }
    }
}