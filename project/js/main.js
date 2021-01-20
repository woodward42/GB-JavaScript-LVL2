//ссылка на api фейковой БД
const API = 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses';

//обработчик клика по иконке корзины, чтобы показать/скрыть список товаров корзины
const cartProducts = document.querySelector('.cart-products')
      document.querySelector('.cart-btn').addEventListener('click', () => {
          cartProducts.classList.toggle('shown')
      })


//универсальный класс товара, рендерится разная вёрстка, в зависимости от переданного из родителя (ProductsList или CartList) типа
class Product {
    constructor(product, type) {
        this.id = product.product_id    //добавил сюда id, чтобы при удалении при поиске не лезть вглубь объекта
        this.type = type;
        this.product = product; //заменил свойства на просто объект, распарсивать его будем уже в вёрстке в функции рендера
        this.isRendered = false
    }

    renderProduct(){
        this.isRendered = true
        
        //в зависимости от типа создаваемого продукта рендерим ту или иную верстку
        switch(this.type){
            case 'catalog':{
                return createCatalogProduct(this.product)
            }
            case 'cart':{
                return createCartProduct(this.product)
            }
        }

        //функция рендера товара каталога (данные объекта, чтобы не искать в массиве положил в дата атрибуты кнопки, привязанной к инстансу товара)
        function createCatalogProduct(item){
            return `<div class="product-item" id="${item.product_id}">
                        <h3 class="product-title">${item.product_title}</h3>
                        <img class="product-img" src="${item.product_image}" alt="img" width="200">
                        <p class="product-price">${item.product_price}$</p>
                        <button 
                            class="product-add-to-cart-btn" 
                            name="add"
                            data-id="${item.product_id}" 
                            data-title="${item.product_title}" 
                            data-image="${item.product_image}" 
                            data-price="${item.product_price}"
                            >Add to Cart</button>
                    </div>`
        }

        //функция рендера товара корзины
        function createCartProduct(item){
            return `<div class="cart-product-item" id="${item.product_id}">
                        <h3 class="cart-product-title">${item.product_title}</h3>
                        <img class="cart-product-img" src="${item.product_image}" alt="img" width="100">
                        <button class="cart-product-remove-btn" name="remove" data-id="${item.product_id}">Х</button>
                        <p class="cart-product-price">Количество:</p>
                    </div>`
        }
        
    }
}


//создаем общий класс, от которого будут наследоваться классы список товаров и список корзины
class List {
    constructor(cart = null, container, type, url){   //добавил параметр и свойство для корзины, чтобы передать её, как вы писали в прошлом ревью, как передать непонятно)

        this.container = document.querySelector(container)
        this.type = type
        this.url = `${API}${url}`
        this.cart = cart
        this.data = []
        this.products = []
        this._fetchData()
            .then(() => this._renderProductsList())
            .then(() => {       //если это каталог, то добавляем обработчик добавления товара на кнопки каталога
                if (this.type === 'catalog'){
                    this._addCatalogListeners()
                }
                else{ 
                    this._addCartListeners()
                }
             })
    }

    _fetchData(){
        return fetch(this.url)
                .then(resp => resp.json())
                .then(data => {
                    this.data = data
                    for (let item of this.data){
                        const product = new Product(item, this.type)   //создали инстанс
                        this.products.push(product) //добавили в массив
                    }
                })
    }

    _renderProductsList(){  //я переписал этот метод, потому что у меня не получилось без перерендера при добавлении товара корректно отрисовать корзину
        let htmlString = ''
        for (let product of this.products){
            
            if (!this.isRendered){
                htmlString += product.renderProduct() //вставили в DOM дерево в контейнер
            }
            else continue;
        }
        this.container.innerHTML = htmlString
    }
}

//создаем класс список товаров каталога
class ProductsList extends List{
    constructor(cart, container = '.products', type = 'catalog', url = '/catalogData.json'){
        super(cart, container, type, url)
    }

    //функция аналогичная функции в корзине, вызывать её попробую после рендера в родительском классе List
    _addCatalogListeners(){
        this.container.addEventListener('click', evt => {   //обработчик вешаем на контейнер, клики поймаем через вспылтие
            
            //если кликнули по кнопке - соберем из дата атрибутов объект и отдадим его в функцию корзины add
            if (evt.target.name === 'add'){
                let newItemData = evt.target.dataset
                let newItemToAdd = {
                    product_id: newItemData.id,
                    product_title: newItemData.title,
                    product_price: +newItemData.price,
                    product_image: newItemData.image,
                }

                this.cart.add(newItemToAdd)
            }
            
        })
    }
}

//создаем класс список товаров корзины, я сделал json, где 1 товар
class Cart extends List{
    constructor(cart, container = '.cart-products', type = 'cart', url = '/cartData.json'){
        super(cart, container, type, url)
    }
 
    _addCartListeners(){
        this.container.addEventListener('click', evt => {   //обработчик вешаем на контейнер, клики поймаем через вспылтие
            
            //если кликнули по кнопке - заберем из дата атрибута id и отдадим в метод remove
            if (evt.target.name === 'remove'){
                this._remove(evt.target.dataset.id)
            }
            
        })
    }

    add(item){
        this.data.push(item)
        this.products.push(new Product(item,'cart'))
        this._renderProductsList()
    }
    _remove(id){
        //находим в каждом из массивов по id элемент, который надо удалить
        let productToDeleteFromData = this.data.find(item => item.product_id == id)
        let productToDeleteFromProducts = this.products.find(item => item.id == id)

        //удаляем 1 элемент с найденной позиции в каждом из массивов
        this.data.splice(this.data.indexOf(productToDeleteFromData), 1)
        this.products.splice(this.products.indexOf(productToDeleteFromProducts), 1)

        //перерендер корзины
        this._renderProductsList()
    }
}


//const pl = new ProductsList();
const cart = new Cart()
const productsList = new ProductsList(cart)