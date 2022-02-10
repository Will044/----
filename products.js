import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'will-hexschool';
let productModal = {};
let delProductModal = {};

createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
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
        },
        openModal(status, product) {
            if(status === 'isNew') {
                this.tempProduct = {
                    imagesUrl: [],
                }
                productModal.show();
                this.isNew = true;
            } else if (status === 'edit') {
                this.tempProduct = { ...product };
                productModal.show();
                this.isNew = false;
            } else if (status === 'delete') {
                delProductModal.show();
                this.tempProduct = { ...product };
            }
            
        },
        updateProduct() {
            let url = `${site}api/${api_path}/admin/product`;
            let method = 'post';
            if (!this.isNew) {
                url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }

            axios[method](url, { data: this.tempProduct })
            .then(res => {
            this.getProducts();
            productModal.hide();
            })
        },
        delProduct() {
            let url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
            

            axios.delete(url)
            .then(res => {
            this.getProducts();
            delProductModal.hide();
            })
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        }
}).mount('#app');