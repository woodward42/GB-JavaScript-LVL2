/*

1. Добавил пустые классы корзины и товара корзины, оставил ниже по коду много комментариев
2. Сумма всех товаров - метод getProductsTotalPrice сласса ProductsList

*/
class Product {
    constructor(product) {
        this.title = product.productTitle
        this.img = product.productImg
        this.price = product.productPrice
        this.id = product.id
    }

    renderProduct(){
        return `<div class="product-item">
                    <h3 class="product-title">${this.title}</h3>
                    <img class="product-img" src="${this.img}" alt="img" width="200">
                    <p class="product-price">${this.price}$</p>
                </div>`
    }
}

class ProductsList {
    constructor(container = '.products'){
        this.data = []  //данные, получаемые с сервера fetch'em
        this.products = []  //массив отрисованных на странице товаров
        this.container = document.querySelector(container)

        this._fetchData()
        this._renderProductsList()
    }

    _fetchData(){
        this.data = [
            { id:1, productTitle:'Notebook', productPrice:5000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:2, productTitle:'Keyboard', productPrice:500, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:3, productTitle:'Mouse', productPrice:300, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:4, productTitle:'SSD', productPrice:1000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:5, productTitle:'Webcam', productPrice:250, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:6, productTitle:'Windows10', productPrice:2100, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg'},
            { id:7, productTitle:'MSOffice', productPrice:1700, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            { id:8, productTitle:'USBDrive', productPrice:178, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
            
        ]
    }

    _renderProductsList(){
        for (let item of this.data){
            const product = new Product(item)   //создали инстанс
            this.products.push(product) //добавили в массив
            this.container.insertAdjacentHTML('beforeend', product.renderProduct()) //вставили в DOM дерево в контейнер
        }
    }

    getProductsTotalPrice(){
        return this.data.reduce((sum,item) => sum + item.productPrice, 0)
        
    }
}

const pl = new ProductsList();
//===================================================================================
//классы корзины и элемента корзины

/*
1.  Вообще, мне кажется, что класс Корзины может наследоваться от класса ProductsList, т.к. внутри там одно и то же, 
    на входе меняется только класс контейнера, в котором мы отрисовываем продукты

2.  Если делать корзину отдельным классом (не наследником ProductsList), то:
*/

class Cart {
    constructor(container = '#cart-products'){
        this.data = []  //данные, получаемые с сервера fetch'em
        this.products = []  //массив отрисованных в корзине товаров
        this.container = document.querySelector(container)

        this._fetchData()
        this._getProductsTotalPrice()    //считаем суммарную стоимость товаров в корзине
        this._renderProductsList()

    }

    _fetchData(){       //получение данных с сервера по текущему пользователю и его корзиной
        this.data = [
            { 
                id:1, 
                productTitle:'Notebook', 
                productPrice:5000, 
                productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg',
                productAmount: 1,   //в объекте корзины в продукт необходимо добавить поле с кол-вом товара с этим id в корзине, чтобы не дублировать карточки, а показывать одну карточку и рядом выводить: N шт.
            }
        ]
    }

    _renderProductsList(){  //отрисовка товаров корзины
        for (let item of this.data){
            const product = new BasketProduct(item)   //создали инстанс BasketProduct
            this.products.push(product) //добавили в массив
            this.container.insertAdjacentHTML('beforeend', product.renderProduct()) //вставили в DOM дерево в контейнер
        }
    }

    _getProductsTotalPrice(){    //получение суммарной стоимости товаров корзины (необходимо дописать вывод в вёрстку контейнера корзины)
        return this.data.reduce((sum,item) => sum + item.productPrice, 0)
        
    }

    _removeProduct(){  //метод для удаления товара из корзины 

    }

    //метод для добавления товара в корзину
    /* 
        Вообще этот метод должен быть здесь, как мне кажется, потому что он изменяет состояние корзины, но я не понимаю, 
        как этим методом воспользоваться в ProductsList. Потому что именно в ProductsLits мы в этот метод передадим product и затем добавим это всё
        в корзину
    */
    _addProduct(){

    }
}

class BasketProduct {
    constructor(product) {
        this.title = product.productTitle
        this.img = product.productImg
        this.price = product.productPrice
        this.id = product.id
        this.amount = product.productAmount //предполагаем, что с сервера в каждом объекте корзины передается и кол-во данного товара в корзине
    }

    renderProduct(){
        return `<div class="cart-product-item">
                    <h3 class="cart-product-title">${this.title}</h3>
                    <img class="cart-product-img" src="${this.img}" alt="img" width="50">
                    <p class="cart-product-price">${this.price}$</p>
                    <span class="cart-product-amount">${this.amount}</span>

                </div>`
    }
}













//===================================================================================
/* Ниже код 1го ДЗ, реализация без классов 

//создаем объект с товарами
const products = [
    { id:1, productTitle:'Notebook', productPrice:5000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:2, productTitle:'Keyboard', productPrice:500, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:3, productTitle:'Mouse', productPrice:300, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:4, productTitle:'SSD', productPrice:1000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:5, productTitle:'Webcam', productPrice:250, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:6, productTitle:'Windows10', productPrice:2100, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg'},
    { id:7, productTitle:'MSOffice', productPrice:1700, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:8, productTitle:'USBDrive', productPrice:178, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:9, productTitle:'USBDrive', productPrice:178, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
]

//функция возврата шаблонной строки для отрисовки одного товара
const renderProduct = (product) => {
    return `<div class="product-item">
                <h3 class="product-title">${product.productTitle}</h3>
                <img class="product-img" src="${product.productImg}" alt="img" width="200">
                <p class="product-price">${product.productPrice}$</p>
            </div>`
}

//функция отрисовки всех товаров и добавления их в DOM в div с классом products
const renderProductsList = productsList => {

    //метод map возвращает новый массив, каждый элемент productsList передаётся в ф-ю renderProduct и там распарсится в вёрстку
    const productsElements = productsList.map(item => renderProduct(item)).join(' ');
            document.querySelector('.products').innerHTML = productsElements;
}

renderProductsList(products);
//тест коммита в другой ветеке
*/