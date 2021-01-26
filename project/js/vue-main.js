//создаем объект, который передаст настройки приложения
const Shop = {
    data(){
        return {
            API: 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses',
            products: [],
            cart: [],
            catalogUrl: '/catalogData.json',
            cartUrl: '/cartData.json',
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
            /*
            Я писал этот метод по аналогии с тем, как Вы писали его до Vue, без добавления ноде дата атрибута с id товара,
            отфильтровать у меня не получилось, к key доступа нет или я не понял, как его получить.

            Поэтому я для v-for сделал добавление дата атрибута, как было раньше, по другому нет идей даже(
            */
            const regexp = new RegExp(this.searchLine, 'i')

            this.filtered = this.products.filter(product => regexp.test(product.product_title))
            this.products.forEach(prod => {
                const prodNode = document.querySelector(`.product-item[data-id="${prod.product_id}"]`)
                
                if (this.filtered.includes(prod)){
                    prodNode.classList.remove('invisible')
                }
                else {
                    prodNode.classList.add('invisible')
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
