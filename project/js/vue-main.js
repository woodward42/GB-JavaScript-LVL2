import {Products} from './Products.js'
import {Cart} from './Cart.js'
import {Search} from './Search.js'
import {CustomError} from './CustomError.js'

//создаем объект, который передаст настройки приложения
const Shop = {
    components: {
        CustomError,
        Products,
        Cart,
        Search
    },
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
            isError: false
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                    .then(data => data.json())
                    .catch(error => {
                        this.isError = true
                        console.log(error)
                        
                    })
        },
    },
};

//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')
