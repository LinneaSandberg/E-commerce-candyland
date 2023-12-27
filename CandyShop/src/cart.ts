
// Funktionen som hämtar allt som finns i cart i localstorage
import {getCart} from "./localStorageLogic"

//hela cart vyn = aside
// i vår aside renderar du en div och listar upp allting i våran cart 

const mainEL = document.querySelector<HTMLDivElement>('#app')!;


//Öppna cart vy
export function cartListener(){
const cartElementEl = document.querySelector<HTMLDivElement>('.bajs')!;

// Lyssnar ju om användaren trycker på kundvagnen på hemsidan
cartElementEl.addEventListener("click", (event)=>{

        // ny ska vyn för aside renderas
        // NÄR DU GÖR KASSAN SÅ SKA DU HÄMTA ID: sideWindow och lägga in din UI där
        mainEL.innerHTML+= `
        <aside id="sideWindow">
        // Renderar UIn för våran cart
        ${renderCart()}
        </aside>
        `

        // TIPS: ASIDE måste ha position absolut här är länk du kan läsa: 
        // https://developer.mozilla.org/en-US/docs/Web/CSS/position 
        // https://developer.mozilla.org/en-US/docs/Web/CSS/top
        // https://developer.mozilla.org/en-US/docs/Web/CSS/left

    })
}


// SKAPA UIn när vi listar cartItems INTE hela cart vyn -> 
const renderCart = () => {
const cartItems = getCart();

// INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN 

cartItems.forEach((item) =>{
    //testa console.logga allt så du faktiskt ser att du får ut datan du vill komma åt
    // SEN AVKOMMENTERAR DU RETURN OCH FÖRSÖKER LISTA UT HUR DU SKA RENDERA DET I WEBBLÄSAREN
})

// cartItem kommer vara en array som följer interfacet i CartItem[]:ProductItem + extends 
return `
<div class="cartItemsWrapper"
<table>
${
    cartItems.map((item)=>{
        return`
        <tr>
        <td>Product: ${item.name}  </td>
        <td>Amount:${item.amount}</td>
        <td>Total: ${item.totalCost}</td>
        </tr>
        `
    })
}
</table>
`

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
}
            


       

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
