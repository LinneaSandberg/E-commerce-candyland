interface ProductToCart {
    id: number
    name: string
    price: number
}

const cart: ProductToCart[] = [];

const mainEL = document.querySelector<HTMLDivElement>('#app')!;
const buttonCartEl = document.querySelector<HTMLDivElement>('.bajs')!;

const cartElementEl = document.querySelector<HTMLUListElement>('#cartList')!;
const orderTotalEl = document.querySelector<HTMLUListElement>('#orderTotal')!;



//function to add items to the cart
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



// fuction with eventlistner for folding out basket
export function openCart() {
  
    buttonCartEl.addEventListener('click', async (e) => {

            e.preventDefault();
        
            console.log('klickade på rätt knapp!')
            renderCart();
        })

}

export const renderCart = () => {
    mainEL.innerHTML = `
    <h2>Shoppingbag:</h2>
    <ul id="cartList"></ul>
    <p id="orderTotal">Order total: </p>
    `
}


