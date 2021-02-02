import {Product} from './Product.js'

export const Products = {
    components: {
        Product
    },
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filterProducts(text){ 
            this.filtered = this.products.filter(product => new RegExp(text, 'i').test(product.product_title))                  
        },
    },
    mounted() {
        //получаем продукты каталога
        this.$root.getJson('/api/products')
            .then(products => {
                for (let item of products){
                    this.products.push(item)
                    this.filtered.push(item)    
                }
            })  
    },
    template: `<div class="products">
                <Product v-for="item of filtered" :key="item.product_id" :product="item"></Product>  
              </div>`
}