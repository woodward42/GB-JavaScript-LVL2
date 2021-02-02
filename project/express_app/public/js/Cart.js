import {CartItem} from './CartItem.js'

export const Cart = {
    inject: ['postJson', 'putJson', 'delJson'], //как пропсы
    components: {
        CartItem
    },
    data(){
        return {
            cart: [],
            cartUrl: '/cartData.json',
            showCart: false,
        }
    },
    methods:{
        addItem(item){
            let find = this.cart.find(el => el.product_id == item.product_id);

            //если нашли товар в корзине, то обновляем(а не добавляем)
            if (find){
                this.putJson(`/api/cart/${find.product_id}`, {quantity: 1})
                    .then(data => {
                        if (data.result){
                            find.quantity++
                        }
                    })
                return
            }

            //eсли не найден - post, добавляем
            let prod = Object.assign(item, {quantity: 1})

            this.postJson(`/api/cart/`, prod)
                .then(data => {
                    if (data.result){
                        this.cart.push(prod)
                    }
                })
        },
        removeItem(id){
            let find = this.cart.find(item => item.product_id == id)

            
            if (find){
                //если нашли и товаров >1 , уменьшаем на 1
                if (find.quantity > 1){
                    this.putJson(`/api/cart/${find.product_id}`, {quantity: -1})
                    .then(data => {
                        if (data.result){
                            find.quantity--
                        }
                    })
                    return 
                }
                //ecли товар 1 - надо удалить
                this.delJson(`/api/cart/${find.product_id}`)
                    .then(data => {
                        if (data.result){
                            this.cart.splice(this.cart.indexOf(find), 1)
                        }
                    })
            }            
        },
    },
    mounted(){
        //получаем продукты корзины
        this.$root.getJson('/api/cart')
        .then(cartProducts => {
            for (let item of cartProducts){
                this.cart.push(item)
            }
        })
    },
    template: `<button class="cart-btn"><img class="cart-btn-img" src="img/cart.png" alt="cart" @click="showCart = !showCart"></button>
                <div class="cart-products" v-show="showCart">
                <p class="cart-product-quantity" v-show="cart.length === 0">Товаров в корзине нет =)</p>
                    <CartItem v-for="item of cart" :key="item.product_id" :item="item"></CartItem>
                </div>`
}