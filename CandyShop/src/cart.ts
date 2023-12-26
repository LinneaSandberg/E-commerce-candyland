
interface ProductToCart {
    id: number
    name: string
    price: number
}

const toShowCartEl = document.querySelector<HTMLDivElement>('.itemAmountInCart')!
const asideForOrderEl = document.querySelector<HTMLDivElement>('#order')!



const renderCart = () => {

    asideForOrderEl.innerHTML = `
    <h2>Shoppingbag:</h2>
    <ul id="cartList"></ul>
    `
}



 // Funktion för att lägga till produkter i varukorgen
 function addToCart(product: ProductToCart) {
    const cartItem = document.createElement("li");
    cartItem.textContent = product.name + " - " + product.price + " kr";
    document.querySelector<HTMLUListElement>('#cartList')!.appendChild(cartItem);
}




toShowCartEl.addEventListener('click', async (e) => {

    e.preventDefault();


    renderCart();



})


