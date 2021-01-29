export const Product = {
    props: ['product'],
    template: `<div class="product-item">
                <h3 class="product-title">{{ product.product_title }}</h3>
                <img class="product-img" :src="product.product_image" :alt="product.product_title" width="200">
                <p class="product-price">{{ product.product_price }}</p>
                <button class="product-add-to-cart-btn" @click="$root.$refs.cart.addItem(product)">Add to Cart</button>
              </div>`
}

