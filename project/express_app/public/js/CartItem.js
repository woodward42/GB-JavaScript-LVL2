export const CartItem = {
    props: ['item'],
    template: `<div class="cart-product-item">
                    <h3 class="cart-product-title">{{ item.product_title }}</h3>
                    <img class="cart-product-img" :src="item.product_image" alt="img" width="100">
                    <button class="cart-product-remove-btn" name="remove" @click="$parent.removeItem(item.product_id)">Х</button>
                    <p class="cart-product-quantity">Количество: {{ item.quantity }}</p>
                    <p class="cart-product-price">Цена: $ {{ item.product_price * item.quantity }}</p>
                </div>`
}