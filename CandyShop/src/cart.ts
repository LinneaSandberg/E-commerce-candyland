// Funktionen som hämtar allt som finns i cart i localstorage
import {getCart, removeProductShoppingCart, addProductShoppingCart, findProduct} from "./localStorageLogic"
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

        adjustAmountCart();
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

// const itemAmountInCartEl = document.querySelector<HTMLDivElement>('#itemAmountInCart')!;
// itemAmountInCartEl.innerHTML = `${totalProduct}`

// INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN


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


// HÄR SKA JAG NU GÖRA SÅ ATT ANVÄNDREN KAN ÖKA OCH MINSKA ANTALET AV PRODUKTERNA I VARUKORGEN
function adjustAmountCart() {
    const buttonUpEl = document.querySelectorAll(
        "#buttonUp"
      ) as NodeListOf<HTMLButtonElement>;
    const buttonDownEl = document.querySelectorAll(
        "#buttonDown"
      ) as NodeListOf<HTMLButtonElement>;
    

        // använd samma logik som johan använder för sina knappar för att öka och minska antalet varor
        //Lägger till produkt i localStorage
        buttonUpEl.forEach((buttonUp) => {
        buttonUp.addEventListener("click", (event) => {
        const product = findProduct(buttonUp.value);


      addProductShoppingCart({
        id: product.id,
        price: product.price ,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });
      });
      });


      //Tar bort produkt i localStorage
      buttonDownEl.forEach((buttonDown) => {
        buttonDown.addEventListener("click", (event) => {
      console.log("Down button: ", buttonDown.value)
      const product = findProduct(buttonDown.value);
    


      removeProductShoppingCart({
        id: product.id,
        price: product.price ,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });
      });
      });


}


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
