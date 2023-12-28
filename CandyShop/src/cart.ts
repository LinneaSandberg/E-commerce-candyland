// Funktionen som hämtar allt som finns i cart i localstorage
import {getCart} from "./localStorageLogic"
import { renderOrder } from './placeOrder'
import { CartItem } from './interface'
import 'bootstrap/dist/css/bootstrap.css'

//hela cart vyn = aside
// i vår aside renderar du en div och listar upp allting i våran cart 


//Öppna cart vy
export function cartListener(){
const cartElementEl = document.querySelector<HTMLDivElement>('.bajs')!;
const mainEL = document.querySelector<HTMLDivElement>('#app')!;


// Lyssnar ju om användaren trycker på kundvagnen på hemsidan
cartElementEl.addEventListener("click", (e) => {
    console.log("bajs");
    
        // ny ska vyn för aside renderas
        // NÄR DU GÖR KASSAN SÅ SKA DU HÄMTA ID: sideWindow och lägga in din UI där

       mainEL.innerHTML += `

        <aside id="sideWindow">
        ${renderCart()}
        </aside>
        `

        closeCart();

        //ASIDE måste ha position absolut här är länk du kan läsa: 
        // https://developer.mozilla.org/en-US/docs/Web/CSS/position 
        // https://developer.mozilla.org/en-US/docs/Web/CSS/top
        // https://developer.mozilla.org/en-US/docs/Web/CSS/left
    })
}





// SKAPA UIn när vi listar cartItems INTE hela cart vyn -> 
const renderCart = () => {
const cartItems = getCart();

// INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN 
// cartItems.forEach((item) => {})
    //testa console.logga allt så du faktiskt ser att du får ut datan du vill komma åt
    // SEN AVKOMMENTERAR DU RETURN OCH FÖRSÖKER LISTA UT HUR DU SKA RENDERA DET I WEBBLÄSAREN


// cartItem kommer vara en array som följer interfacet i CartItem[]:ProductItem + extends 
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
            cartItems.map((cartItem: CartItem )=>{
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
<td colspan="3">Total amount off products: ${cartItems.amount}</th>
</tr>
<tr>
<td colspan="3">Totalcost off order: ${cartItems.totalCost}</td>
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


function closeCart() {
const buttonCartEl = document.querySelector<HTMLButtonElement>('#buttonCart')!;
const cartItemsWrapperEl = document.querySelector<HTMLDivElement>('#cartItemsWrapper')!;


    buttonCartEl?.addEventListener('click', (e) => {

        console.log('klickade på knappen')
    
        cartItemsWrapperEl.style.display = 'none';
    
    })


}




const checkoutEl = document.querySelector<HTMLFormElement>('#checkout');

checkoutEl?.addEventListener('click', (e) => {

    renderOrder();

})


// TFOOT
// presentera antal produkter som ska köpas-> plussa ihop alla godisar/ du får inte göra en ny funktion
// Presentera det totala priset för alla produkter -> plussa ihop alla produkters totalCost och presentera det
// Knapp så personen kan checka ut ____ OSÄKER OM DU FÅR HA BUTTON I EN TR läs på 



// SÅHÄR SER ALLA ARRAY-ITEM UT NÄR DU HÄMTAR FRÅN LOCALSTORAGE
/* 
{
id: number,
image: string
name: string
price: number //priset för en godisbit
stock: number // antal i stock
amount:number,  //hur många användaren har valt
totalCost: number, // totala kostnaden för alla bitar som användaren har valt 
}
*/

            


       

// //function to add items to the cart





































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
