import {Products} from './Products.js'
import {Cart} from './Cart.js'

//создаем объект, который передаст настройки приложения
const Shop = {
    components:{
        Products,
        Cart
    },
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
            searchLine: '',
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                    .then(data => data.json())
                    .catch(error => console.log(error))
        },
        filterProducts(){ 
            const regexp = new RegExp(this.searchLine, 'i')

            this.filtered = this.products.filter(product => regexp.test(product.product_title))                  
        },
    },
    mounted() {
        
    }
};

//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')
