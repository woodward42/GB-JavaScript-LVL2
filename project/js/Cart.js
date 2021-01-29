import {CartItem} from './CartItem.js'

export const Cart = {
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
            this.$root.getJson(`${this.$root.API}/addToBasket.json`)    //добавил по аналогии с уроком
                .then(data => {
                    if (data.result){
                        let find = this.cart.find(el => el.product_id == item.product_id);
    
                        if (find){
                            find["quantity"]++
                        }
                        else {
                            this.cart.push(Object.assign(item, {quantity: 1}))
                        }
                    }
                })
        },
        removeItem(id){
            this.$root.getJson(`${this.$root.API}/deleteFromBasket.json`)   
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
    mounted(){
        //получаем продукты корзины
        this.$root.getJson(`${this.$root.API + this.cartUrl}`)
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