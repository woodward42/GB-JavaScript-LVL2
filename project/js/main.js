//ссылка на api фейковой БД
const API = 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses';

class Product {
    constructor(product, img = 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg') {
        this.title = product.product_title
        this.img = img;
        this.price = product.product_price
        this.id = product.product_id
        this.isRendered = false
    }

    renderProduct(){
        this.isRendered = true
        return `<div class="product-item">
                    <h3 class="product-title">${this.title}</h3>
                    <img class="product-img" src="${this.img}" alt="img" width="200">
                    <p class="product-price">${this.price}$</p>
                    <button class="product-add-to-cart-btn">Add to Cart</button>
                </div>`
    }
}

class ProductsList {
    constructor(container = '.products'){
        this.data = []  //данные, получаемые с сервера fetch'em
        this.products = []  //массив отрисованных на странице товаров
        this.container = document.querySelector(container)

        this._fetchData().then(() => this._renderProductsList())
    }

    _fetchData(){
        return fetch(`${API}/catalogData.json`)
                .then(resp => resp.json())
                .then(data => {
                    this.data = data
                    for (let item of this.data){
                        const product = new Product(item)   //создали инстанс
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