/*
1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
2. Добавьте для ProductsList метод, определяющий суммарную стоимость всех товаров.
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
            { id:9, productTitle:'USBDrive', productPrice:178, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
        ]
    }

    _renderProductsList(){
        for (let item of this.data){
            const product = new Product(item)   //создали инстанс
            this.products.push(product) //добавили в массив
            this.container.insertAdjacentHTML('beforeend', product.renderProduct()) //вставили в DOM дерево в контейнер
        }
    }
}

const pl = new ProductsList();









//========================================================================================================================
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