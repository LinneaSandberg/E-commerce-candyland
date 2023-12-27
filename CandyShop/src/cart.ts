
// Funktionen som hämtar allt som finns i cart i localstorage
import {getCart} from "./localStorageLogic"



const mainEL = document.querySelector<HTMLDivElement>('#app')!;


//Öppna cart vy
export function cartListener(){
const cartElementEl = document.querySelector<HTMLDivElement>('.bajs')!;

cartElementEl.addEventListener("click", (event)=>{

        // hämtar vi cart items från local storage
         renderCart()


        // ny ska vyn för aside renderas
        // mainEL.innerHTML+= `
        // <aside>
        // //rendera ut våran cart i localstorage
        // </aside>
        // `
    })

}




const renderCart = () => {
const cartItems = getCart();
console.log("cartItems:", cartItems)

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
