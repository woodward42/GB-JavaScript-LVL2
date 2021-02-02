//методы обработки корзины: добавление, обновление, удаление
const add = (cart, request) => {
    cart.push(request.body)

    return JSON.stringify(cart, null, 4)
}

const change = (cart, request) => {
    const find = cart.find(el => el.product_id === request.params.id)
    find.quantity += request.body.quantity

    return JSON.stringify(cart, null, 4)
}

const del = (cart, request) => {
    const find = cart.find(el => el.product_id === request.params.id)
    cart.splice(cart.indexOf(find), 1)

    return JSON.stringify(cart, null, 4)
}

//экспортируем всё отсюда
module.exports = {
    add,
    change,
    del
}