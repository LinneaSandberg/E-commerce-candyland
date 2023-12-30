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
console.log("cart tryckt")
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
const cartItems = getCart();

// totala summan för alla produkter
let totalPrice: number = 0;
cartItems?.forEach((total) => {
    totalPrice += total.totalCost
})
console.log(totalPrice)

// totala antalet produkter både av samma och olika
let totalProduct: number = 0;
cartItems?.forEach((total) => {
    totalProduct += total.amount
})

// INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN


return `
<div id="cartItemsWrapper">
    <header class="header">
        <h2>Kundvagn</h2>
        <button id="buttonCart">
        <i class="bi bi-x-square"></i>
        </button>
    </header>

    <table id="tableBox">
    <thead>
     <tr>
      <th id="capTwo">Products in you basket:</th>
     </tr>
    </thead>
    <tbody>
        ${
            cartItems?.map((cartItem: CartItem )=>{
            return`
                <tr>
                    <th>${cartItem.name}</th>
                    <td>
                    <button id="buttonUp">
                     <i class="bi bi-arrow-up-short"></i>
                    </button>
                    <button id="buttonDown">
                     <i class="bi bi-arrow-up-short"></i>
                    </button>
                     </td>
                     <td>Totalprice: ${cartItem.totalCost}:-</td>
                </tr>
        `
    })
}
</tbody>
<tfoot>
<tr>
<td colspan="3" class="positionTotals">Total amount off products: ${totalProduct}</th>
</tr>
<tr>
<td colspan="3" class="positionTotals">Totalcost for order: ${totalPrice}</td>
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

    buttonCartEl?.addEventListener('click', (e) => {
        const cartItemsWrapperEl = document.querySelector<HTMLDivElement>('#sideWindow')!;
        cartItemsWrapperEl.remove()
    })
    cartListener();
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
