const cart = require('./cartMethods')
const fs = require('fs')

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
        response.send({result: 1})
    })
}

module.exports = handler;