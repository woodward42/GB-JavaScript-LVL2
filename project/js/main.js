//ссылка на api фейковой БД
//const API = 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses';

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
            return `<div class="cart-product-item" data-id="${item.product_id}">
                        <h3 class="cart-product-title">${item.product_title}</h3>
                        <img class="cart-product-img" src="${item.product_image}" alt="img" width="100">
                        <button class="cart-product-remove-btn" name="remove" data-id="${item.product_id}">Х</button>
                        <p class="cart-product-quantity">Количество: ${item.quantity}</p>
                        <p class="cart-product-price">Цена: $ ${item.product_price * item.quantity}</p>
                    </div>`
        }
        
    }
}

//создаем общий класс, от которого будут наследоваться классы список товаров и список корзины
class List {
    static API = 'https://raw.githubusercontent.com/woodward42/online-store-api/master/responses';

    constructor(container, type, url){   //добавил параметр и свойство для корзины, чтобы передать её, как вы писали в прошлом ревью, как передать непонятно)
        this.container = document.querySelector(container)
        this.type = type
        this.url = url
        this.data = []
        this.getJson()    //я вынес всё в then'ы, потому что так мне понятней было, что происходит. Некрасиво, но так я не запутался хотя бы, простите
            .then(data => this.data = data)
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

    getJson(url){
        return fetch(url ? url : `${List.API + this.url}`)
                .then(result => result.json())
                
    }

    _renderProductsList(){  //я переписал этот метод, потому что у меня не получилось без перерендера при добавлении товара корректно отрисовать корзину
        let htmlString = ''
        for (let item of this.data){
            let product = new Product(item, this.type) 

            if (this.isRendered){
                continue     
            }
            htmlString += product.renderProduct() //вставили в DOM дерево в контейнер
        }
        this.container.innerHTML = htmlString
    }
}

//создаем класс список товаров каталога
class ProductsList extends List{
    constructor(cart, container = '.products', type = 'catalog', url = '/catalogData.json'){
        super(container, type, url)
        this.cart = cart
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

                this.cart.addItem(newItemToAdd)
            }
            
        })
    }
}

//создаем класс список товаров корзины, я сделал json, где 1 товар
class Cart extends List{
    constructor(container = '.cart-products', type = 'cart', url = '/cartData.json'){
        super(container, type, url)
    }
 
    _addCartListeners(){
        this.container.addEventListener('click', evt => {  
            if (evt.target.name === 'remove'){
                this._removeItem(evt.target.dataset.id)
            }
        })

        const cartProducts = document.querySelector(`.${this.container.className}`) 
              document.querySelector('.cart-btn').addEventListener('click', () => {
                    cartProducts.classList.toggle('shown')
              }) 
    }

    addItem(item){
        this.getJson(`${List.API}/addToBasket.json`)    //добавил по аналогии с уроком
            .then(data => {
                if (data.result){
                    console.log(data.result)
                    let find = this.data.find(el => el.product_id == item.product_id);

                    if (find){
                        find["quantity"]++
                    }
                    else {
                        this.data.push(Object.assign(item, {quantity: 1}))
                    }
                    this._renderProductsList()
                }
            })
    }

    _removeItem(id){
        //я только на крайнем занятии понял очевидную вещь, зачем нам эти запросы к серверу, до этого мыслил исключительно работой с объектами на странице
        //а тут понял, что сначала мы работаем с сервером, а потом это всё обновляем уже на клиенте))
        
        this.getJson(`${List.API}/deleteFromBasket.json`)   
            .then(data => {
                if (data.result){
                    let find = this.data.find(item => item.product_id == id)
        
                    if (find.quantity > 1){
                        find["quantity"]--
                        this._updateItem(find)    //криво, но ушёл от перерендера при удалении
                    }
                    else {
                        this._removeNode(find)
                        this.data.splice(this.data.indexOf(find), 1)
                    }
                }
            })
        
    }

    _updateItem(find){
            const elem = document.querySelector(`.cart-product-item[data-id="${find["product_id"]}"]`)
                elem.querySelector('.cart-product-quantity').textContent = `Количество: ${find["quantity"]}`
                elem.querySelector('.cart-product-price').textContent = `Цена: $ ${find["product_price"] * find["quantity"]}`
        
    }

    _removeNode(find){
           //удаляем из разметки
           document.querySelector(`.cart-product-item[data-id="${find["product_id"]}"]`).remove()
    }

}


const cart = new Cart()
const productsList = new ProductsList(cart)
