const cart = require('./cartMethods')
const fs = require('fs')

//так как логируем мы действия в корзине, то и в лог писать мне показалось правильным из этого файла, т.к. он участвует во всех методах
const moment = require('moment')


const handler = (request, response, action, file) => {
    fs.readFile(file, (err, data) => {
        if (err){
            response.send({result: 0, text: err})
            return
        }

        let newCart = cart[action](JSON.parse(data), request)

        //обновляем корзину
        fs.writeFile(file, newCart, (err) => {
            if(err){
                response.send({result: 0, text: err})
                return 
            }
        })

        fs.readFile('dist/server/db/stats.json', (err,data) => {
            //не суперизящное решение, но я хотел давно проверить, правильно ли я понимаю Object.assign))
            let logItem = Object.assign(
                {}, 
                { "action_type": action }, 
                { "product_title": request.body.product_title }, 
                { "datetime": moment().format('LLLL') })
            
            let logItems = JSON.parse(data)
                logItems.push(logItem)

            //А как сделать, чтобы просто объект добавлялся в stats.json без предварительного чтения?
            //Просто пришлось бы каждый раз огромные файлы логов (допустим, там куча записей) читать и туда переписывать всё, что некруто.
            //Как сделать так: собрал объект/строку для записи, открыл файл лога, дописал туда то, что нужно? Не вышло у меня, поделитесь, пожалуйста! Спасибо
            
            fs.writeFile('dist/server/db/stats.json', JSON.stringify(logItems, null, 4), (err) => console.log(err))  
            
        })

        response.send({result: 1})
    })
}

module.exports = handler;