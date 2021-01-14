//создаем объект с товарами
const products = [
    { id:1, productTitle:'Notebook', productPrice:5000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:2, productTitle:'Keyboard', productPrice:500, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:3, productTitle:'Mouse', productPrice:300, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:4, productTitle:'SSD', productPrice:1000, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:5, productTitle:'Webcam', productPrice:250, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
    { id:6, productTitle:'Windows10', productPrice:2100, productImg: 'https://cdn.svyaznoy.ru/upload/iblock/0c141c003af85283980dc428b7afb935/1.jpg' },
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
