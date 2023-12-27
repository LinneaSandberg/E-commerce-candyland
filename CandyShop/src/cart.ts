
interface ProductToCart {
    id: number
    name: string
    price: number
}

const cart: ProductToCart[] = [];

const toShowCartEl = document.querySelector<HTMLDivElement>('.itemAmountInCart')!
const asideForOrderEl = document.querySelector<HTMLDivElement>('#order')!
const cartElementEl = document.querySelector<HTMLUListElement>('#cartList')!
const orderTotalEl = document.querySelector<HTMLUListElement>('#orderTotal')!



const renderCart = () => {

    asideForOrderEl.innerHTML = `
    <h2>Shoppingbag:</h2>
    <ul id="cartList"></ul>
    <p id="orderTotal">Order total: </p>
    `
}


function pushToCart(product: ProductToCart) {
    cart.push(product);

    updateCart();
}


// function to show both the products and the prices for each product in the basket
function updateCart() {
    let total = 0;
    cart.forEach(product => {
        const cartItem = document.createElement("li");
        const productTotal = product.price;
        total += productTotal;

        cartItem.textContent = `${product.name} - ${productTotal} kr`;
        cartElementEl.appendChild(cartItem);
    })

    orderTotalEl.innerHTML = `Totalcost: ${total} kr`


}




toShowCartEl.addEventListener('click', async (e) => {

    e.preventDefault();


    renderCart();



})


