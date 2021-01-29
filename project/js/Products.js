import {Product} from './Product.js'

export const Products = {
    components: {
        Product
    },
    data(){
        return {
            products: [],
            filtered: [],
            catalogUrl: '/catalogData.json',
        }
    },
    methods: {

    },
    mounted() {
        //получаем продукты каталога
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
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