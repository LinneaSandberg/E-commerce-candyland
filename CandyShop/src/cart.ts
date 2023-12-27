// interface ProductToCart {
//     id: number
//     name: string
//     price: number
// }
// import {getCart} from "./localStorageLogic"
// const cart: ProductToCart[] = [];
console.log("hej")
// const buttonCartEl = document.querySelector<HTMLDivElement>('.bajs')!;

const mainEL = document.querySelector<HTMLDivElement>('#app')!;



// const orderTotalEl = document.querySelector<HTMLUListElement>('#orderTotal')!;

//Öppna cart vy
export function cartListener(){
const cartElementEl = document.querySelector<HTMLDivElement>('.bajs')!;

cartElementEl.addEventListener("click", (event)=>{
        // ny ska vyn för aside renderas
        mainEL.innerHTML= `
        <aside>
        designa ASIDE
        </aside>
        `
    })

}



// export function openCart() {
  
//     buttonCartEl.addEventListener('click', async (e) => {

//             e.preventDefault();
        
//             console.log('klickade på rätt knapp!')
//             renderCart();
//         })

// }




// export const renderCart = () => {
// const cartItems = getCart();
// console.log()
    //hämta från cart 
    //rendera ut från cart 




    // mainEL.innerHTML = `
    // <h2>Shoppingbag:</h2>
    // <ul id="cartList"></ul>
    // <p id="orderTotal">Order total: </p>
    // `
// }


// //function to add items to the cart
// function pushToCart(product: ProductToCart) {
//     cart.push(product);

//     updateCart();
// }


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
