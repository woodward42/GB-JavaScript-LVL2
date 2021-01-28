//создаем объект, который передаст настройки приложения
const Shop = {
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
            products: [],
            cart: [],
            filtered: [],
            catalogUrl: '/catalogData.json',
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
        }
    },
    mounted() {
        //получаем продукты каталога
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(products => {
                for (let item of products){
                    this.products.push(item)
                    this.filtered.push(item)    
                    //Андрей, я правильно сделал? Если мы итерируем в вёрстке filtered, то его сначала надо наполнять так же, как и products
                }
            })
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
