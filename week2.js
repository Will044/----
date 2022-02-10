import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'will-hexschool';

createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token;

        const url = `${site}api/user/check`;
        axios.post(url)
        .then(res => {
            this.getProducts();
        });
        },
        getProducts() {
            const url = `${site}api/${api_path}/admin/products/all`;

            axios.get(url)
            .then(res => {
            this.products = res.data.products;
            })
        }
    },
    mounted() {
        this.checkLogin();
        }
}).mount('#app');