const express = require('express')
const handler = require('./cartHandler')
const fs = require('fs')
const router = express.Router();    //новый экземпляр роутера

//запрос к корзине
router.get('/', (request, response) => {
    fs.readFile('dist/server/db/userCart.json', (err, data) => {
        if (err){
            response.send({result: 0, text: err})
            return
        }
        response.send(data)
    })
})

//добавить в корзину, запрос по новому товару, надо преобразовать товар
router.post('/', (request, response) => {  //товар придет в request.body
    handler(request, response, 'add', 'dist/server/db/userCart.json')  
    
})

//обновление, изменение кол-ва товара в корзине
router.put('/:id', (request, response) => {  
    handler(request, response, 'change', 'dist/server/db/userCart.json')
})

//удаление товара из корзины
router.delete('/:id', (request, response) => {  
    handler(request, response, 'del', 'dist/server/db/userCart.json')
})

module.exports = router;