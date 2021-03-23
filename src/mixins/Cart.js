export default {
    methods: {
        addItemcart(product) {
            const newItem = {
                qty: 1,
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image
            }
            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            const alreadyExisting = (el) => el._id === product._id;
            const index = cart.findIndex(alreadyExisting);
            if (index !== -1) {
                cart[index].qty++
            }
            else {
                cart.push(newItem)
            }
            localStorage.setItem('cart', JSON.stringify(cart))


        },
        getCart() {
            return JSON.parse(localStorage.getItem('cart'))
        },
        remove_item_cart(product) {
            var cart = JSON.parse(localStorage.getItem('cart'))
            const removeWithIndex = (el) => el._id === product._id;
            const index = cart.findIndex(removeWithIndex);
            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
            if (cart.length == 0) {
                this.remove_cart()
            }
            else {
                document.location.reload();
            }
        },
        remove_cart() {
            localStorage.removeItem('cart');
            document.location.reload();
        },
        edit_quantity(qty, id) {
            var cart = JSON.parse(localStorage.getItem('cart'))
            const findElement = (el) => el._id === id;
            const index = cart.findIndex(findElement);
            cart[index].qty = JSON.parse(qty)
            if (qty == 0) {
                cart[index].qty = 1
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        get_total(cart) {
            var sum = cart.reduce(function (accumulator, currentValue) {
                return accumulator + (currentValue.price * currentValue.qty);
            }, 0);
            return sum;
        },
        get_Qty(cart) {
            var sum = cart.reduce(function (accumulator, currentValue) {
                return accumulator + JSON.parse(currentValue.qty);
            }, 0);
            return sum;
        }

    }
}