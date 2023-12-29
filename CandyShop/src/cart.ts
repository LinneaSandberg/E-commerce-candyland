// Funktionen som hämtar allt som finns i cart i localstorage
import {getCart} from "./localStorageLogic"
import { renderOrder } from './placeOrder'
import { CartItem } from './interface'
import 'bootstrap/dist/css/bootstrap.css'


//Öppna aside som innehåller kassan
export function cartListener(){
const cartElementEl = document.querySelector<HTMLDivElement>('.bajs')!;
const mainEL = document.querySelector<HTMLDivElement>('#app')!;

// Lyssnar efter att användaren trycker på kundvagnen på hemsidan
cartElementEl.addEventListener("click", (e) => {
       mainEL.innerHTML += `

        <aside id="sideWindow">
        ${renderCart()}
        </aside>
        `

        closeCart();
    })
}



// UIn för att rendera ut asiden!
const renderCart = () => {
const cartItems: CartItem[] = getCart();
console.log(cartItems);

// INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN
// cartItem kommer vara en array som följer interfacet i CartItem[]:ProductItem + extends

if (cartItems === null || cartItems.length === 0) {
    return `
    <div id="cartItemsWrapper">
    <p>Your shoppingbag is empty</p>
    </div>
    `
}

return `
<div id="cartItemsWrapper">
<button id="buttonCart">
<i class="bi bi-x-square"></i>
</button>
<h2 id="capTitle">Your shoppingbag 🛒</h2>
    <table id="tableBox">
    <thead>
     <tr>
      <th id="capTwo">Products in you basket:</th>
     </tr>
    </thead>
    <tbody>
        ${
            cartItems.map((cartItem: CartItem) => {
            return`
                <tr>
                    <th>Product: ${cartItem.name}</th>
                    <td>
                    <button id="buttonUp">
                     <i class="bi bi-arrow-up-short"></i>
                    </button>
                    <button id="buttonDown">
                     <i class="bi bi-arrow-up-short"></i>
                    </button>
                     </td>
                     <td>Total: ${cartItem.totalCost}</td>
                </tr>
        `
    })
}
</tbody>
<tfoot>
<tr>
<td colspan="3" class="positionTotals">Total amount off products: ${cartItems.length}</th>
</tr>
<tr>
<td colspan="3" class="positionTotals">Totalcost: ${cartItems}</td>
</tr>
<tr>
<td colspan="3">
<button id="checkout">Checkout</button>
</td>
</tr>
</tfoot>
    </table>
</div>
`

}

// function for closing the cart, if user wants to look more in shop
function closeCart() {
const buttonCartEl = document.querySelector<HTMLButtonElement>('#buttonCart')!;
const cartItemsWrapperEl = document.querySelector<HTMLDivElement>('#cartItemsWrapper')!;

    buttonCartEl?.addEventListener('click', (e) => {
        console.log('klickade på knappen')
        cartItemsWrapperEl.style.display = 'none';
    })
}



// eventlistner for checkout-button ---> maybe to be placed in placeOrder.ts
const checkoutEl = document.querySelector<HTMLFormElement>('#checkout');

checkoutEl?.addEventListener('click', (e) => {

    renderOrder();

})


// presentera antal produkter som ska köpas-> plussa ihop alla godisar/ du får inte göra en ny funktion
// Presentera det totala priset för alla produkter -> plussa ihop alla produkters totalCost och presentera det


































// // function to show both the products and the prices for each product in the basket
// function updateCart() {
//     let total = 0;
//     cart.forEach(product => {
//         const cartItem = document.createElement("li");
//         const productTotal = product.price;
//         total += productTotal;

//         cartItem.textContent = `${product.name} - ${productTotal} kr`;
//         cartElementEl.appendChild(cartItem);
//     })
//     orderTotalEl.innerHTML = `Totalcost: ${total} kr`
// }



// // fuction with eventlistner for folding out basket
