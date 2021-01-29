import {Products} from './Products.js'

//создаем объект, который передаст настройки приложения
const Shop = {
    components:{
        Products
    },
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
            cart: [],
            cartUrl: '/cartData.json',
            showCart: false,
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
        addItem(item){
            this.getJson(`${this.API}/addToBasket.json`)    //добавил по аналогии с уроком
                .then(data => {
                    if (data.result){
                        let find = this.cart.find(el => el.product_id == item.product_id);
    
                        if (find){
                            find["quantity"]++
                        }
                        else {
                            this.cart.push(Object.assign(item, {quantity: 1}))
                        }
                        //this._renderProductsList()
                    }
                })
        },
        removeItem(id){
            this.getJson(`${this.API}/deleteFromBasket.json`)   
                .then(data => {
                    if (data.result){
                        let find = this.cart.find(item => item.product_id == id)
            
                        if (find.quantity > 1){
                            find["quantity"]--
                        }
                        else {
                            this.cart.splice(this.cart.indexOf(find), 1)
                        }
                    }
                })
            
        }
    },
    mounted() {
        //получаем продукты корзины
        this.getJson(`${this.API + this.cartUrl}`)
            .then(cartProducts => {
                for (let item of cartProducts){
                    this.cart.push(item)
                }
            })
    }
};

//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')
