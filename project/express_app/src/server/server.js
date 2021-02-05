//подключили библиотеку
const express = require('express')
//создали экземпляр приложения express, через вызов конструктора
const app = express()
//для чтения файлов
const fs = require('fs')

const cart = require('./cartRouter')
const moment = require('moment')


//для того, чтобы каждый раз не использовать в body json.parse()
app.use(express.json())

//для подгрузки, собственно, страниц
app.use('/', express.static('dist/public'))

app.use('/api/cart', cart)

//запрос к каталогу
app.get('/api/products', (request, response) => {
    fs.readFile('dist/server/db/products.json', (err, data) => { //data - то, что прочитали из файла
        if (err){
            response.send({result: 0, text: err})   //сообщаем на клиент о неудаче
            return
        }
        response.send(data)
    })
})

//слушаем подключения
app.listen(3000, () => console.log('Server started at port 3000...'))
