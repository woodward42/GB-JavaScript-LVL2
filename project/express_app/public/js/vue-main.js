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
    provide(){  //методы отправки запросов добавил через provide
        return {
            postJson: this.postJson,
            putJson: this.putJson,
            delJson: this.delJson,
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                    .then(data => data.json())
                    .catch(error => this.isError = true)
        },
        postJson(url, data){
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
                    .then(data => data.json())
                    .catch(error => this.isError = true)
        },
        putJson(url, data){
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
                    .then(data => data.json())
                    .catch(error => this.isError = true)
        },
        delJson(url){
            return fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
            })
                    .then(data => data.json())
                    .catch(error => this.isError = true)
        },
    },
};

//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')
