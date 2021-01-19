//ссылка на api фейковой БД
const API = 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses';

const cartProducts = document.querySelector('.cart-products')
      document.querySelector('.cart-btn').addEventListener('click', () => {
          cartProducts.classList.toggle('shown')
      })


class Product {
    constructor(product, type, img = 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg') {
        this.img = img;
        this.type = type;
        this.product = product; //заменил свойства на просто объект, распарсивать его будем уже в вёрстке в функции рендера
        this.isRendered = false
    }

    renderProduct(){
        this.isRendered = true
    
        /*
            Мне не понравилось передавать img отдельно вторым параметром в функцию рендера
            Я добавляю её свойством в объект, если у него нет своего свойства img
                                                                                          */
        !this.product.hasOwnProperty('img') ? this.product.img = this.img : ''
        
        //в зависимости от типа создаваемого продукта рендерим ту или иную верстку
        switch(this.type){
            case 'catalog':{
                return createCatalogProduct(this.product)
            }
            case 'cart':{
                return createCartProduct(this.product)
            }
        }

        //функция рендера товара каталога
        function createCatalogProduct(item){
            return `<div class="product-item" id="${item.product_id}">
                        <h3 class="product-title">${item.product_title}</h3>
                        <img class="product-img" src="${item.img}" alt="img" width="200">
                        <p class="product-price">${item.product_price}$</p>
                        <button class="product-add-to-cart-btn" name="add">Add to Cart</button>
                    </div>`
        }

        //функция рендера товара корзины
        function createCartProduct(item){
            return `<div class="cart-product-item" id="${item.product_id}">
                        <h3 class="cart-product-title">${item.product_title}</h3>
                        <img class="cart-product-img" src="${item.img}" alt="img" width="100">
                        <button class="cart-product-remove-btn" name="remove">Х</button>
                        <p class="cart-product-price">Количество:</p>
                    </div>`
        }
        
    }
}

class ProductsList {
    constructor(container = '.products', type = 'cart'){
        this.data = []  //данные, получаемые с сервера fetch'em
        this.products = []  //массив отрисованных на странице товаров
        this.container = document.querySelector(container)
        this.type = type;

        this._fetchData().then(() => this._renderProductsList())
    }

    _fetchData(){
        return fetch(`${API}/catalogData.json`)
                .then(resp => resp.json())
                .then(data => {
                    this.data = data
                    for (let item of this.data){
                        const product = new Product(item, this.type)   //создали инстанс
                        this.products.push(product) //добавили в массив
                    }
                })
    }

    _renderProductsList(){
        for (let product of this.products){
            if (!this.isRendered){
                this.container.insertAdjacentHTML('beforeend', product.renderProduct()) //вставили в DOM дерево в контейнер
            }
            else continue;
        }
    }

    getProductsTotalPrice(){
        return this.data.reduce((sum,item) => sum + item.price, 0)
        
    }
}

const pl = new ProductsList();