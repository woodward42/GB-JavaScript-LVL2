import {Products} from './Products.js'
import {Cart} from './Cart.js'
import {Search} from './Search.js'

//создаем объект, который передаст настройки приложения
const Shop = {
    components:{
        Products,
        Cart,
        Search
    },
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                    .then(data => data.json())
                    .catch(error => console.log(error))
        },
    },
};

//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')
