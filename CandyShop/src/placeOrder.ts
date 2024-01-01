import { Data, PlaceOrder } from "./interface";
import { CartItem } from './interface'
import { getCart } from "./localStorageLogic";
import { sendOrder } from './apiCalls';



/* 
GLOBALA SAKER RENDERAS DIREKT MED FILEN 
DENNA KODEN KÖRS FÖRE FORM FINNS I DOM

*/
// DOM referenser för alla input-fält
// const orderFormEl = document.querySelector<HTMLFormElement>('#orderForm');


const cartItems: CartItem[] | null = getCart();

let totalPrice: number = 0;
cartItems?.forEach((total) => {
  Number(totalPrice += total.totalCost);
});

function objApi() {
    const cart = getCart();
    const orderItems = cart?.map((product) => {
        return {
            product_id: product.id,
            qty: product.amount,
            item_price: product.price,
            item_total: product.totalCost,
        };
    })

    return orderItems;
}




//----------------------------------------------


export const renderOrder = () => {

    const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;

    // let totalPrice: number = 0;
    // cartItems?.forEach((total) => {
    //   totalPrice += total.totalCost;
    // });
  
    let totalProduct: number = 0;
    cartItems?.forEach((total) => {
      totalProduct += total.amount;
    });
    const antal = totalProduct === 1 ? "vara" : "varor";


    wrapper.innerHTML= `
<header class="header">
<h2>Kassa</h2>
<p>Orderinfo</p>
</header>

<section class="itemCardWrapper">
${cartItems
    ?.map((cartItem: CartItem) => {
    const antal = cartItem.amount === 1 ? "vara" : "varor";
    return `
    <div class="itemCheckout">
     <div class="boxOne">
      <figure class="iconCheckout">
       <i class="bi bi-bag-fill"></i>
      </figure>
     </div>
     <div class="boxTwo">
      <ul class="checkoutList">
       <li class="productTitle">${cartItem.name}</li>
       <li class="productAmount">${cartItem.amount} ${antal}</li>
       <li class="productSum">Totalt ${cartItem.totalCost} kr</li>
      </ul>
     </div>
    </div>
    `;
}).join("")}
</section>

<div class="sumwrapper">
 <p class="totalProduct">Totalt ${totalProduct} ${antal}</p>
 <figure class="iconCheckout iconTotal">
      <i class="bi bi-bag-fill"></i>
 </figure>
 <p class="totalPrice">Totalsumma: ${totalPrice} kr</p>
</div>

<form id="orderForm">
 <div class="inputWrapper">
    <label for="firstName" class="underline">
        Förnamn:
        <input type="text" name="förnamn" id="firstName" required>
    </label>

    <label for="lastName" class="underline">
    Efternamn:
    <input type="text" name="efternamn" id="lastName" required>
</label>

    <label for="adressInput" class="underline">
        Adress:
        <input type="text" name="adress" id="adressInput" required>
    </label>

    <label for="zipcodeInput" class="underline">
        Postnummer:
        <input type="text" name="zipcode" id="zipcodeInput" required>
    </label>

    <label for="cityInput" class="underline">
        Ort:
        <input type="text" name="ort" id="cityInput" required>
    </label>

    <label for="telInput">
        Telefon:
        <input type="text" name="telephone" id="telInput">
    </label>

    <label for="mailInput" class="underline">
        E-post:
        <input type="text" name="email" id="mailInput" required>
    </label>
 </div>
 <button type="submit">Lägg order</button>
</form>`


placeOrder()
}


function placeOrder(){
const orderFormEl = document.querySelector<HTMLFormElement>('#orderForm');
console.log("orderFormEl: ", orderFormEl)
//----------------------------------------------
orderFormEl?.addEventListener("submit", (e) => {
    e.preventDefault();

   // HÄR BÖR DU HÄMTA ELEMENTEN
   const firstNameEl = document.querySelector<HTMLInputElement>('#firstName');
   const lastNameEl = document.querySelector<HTMLInputElement>('#lastName');
   const adressInputEl = document.querySelector<HTMLInputElement>('#adressInput');
   const zipcodeInputEl = document.querySelector<HTMLInputElement>('#zipcodeInput');
   const cityInputEl = document.querySelector<HTMLInputElement>('#cityInput');
   const mailInputEl = document.querySelector<HTMLInputElement>('#mailInput');
   


    // input värden för alla inputfält
    const firstName = firstNameEl?.value || "";
    const lastName = lastNameEl?.value || "";
    const adressInput = adressInputEl?.value || "";
    const zipcodeInput = zipcodeInputEl?.value || "";
    const cityInput = cityInputEl?.value ||"";
    const mailInput = mailInputEl?.value ||"";

    const cart = objApi();
    console.log(cart);


   // ett object med beställaren inputs
   const placeOrder = {
   customer_first_name: firstName,
   customer_last_name: lastName,
   customer_address: adressInput,
   customer_postcode: zipcodeInput,
   customer_city: cityInput,
   customer_email: mailInput,
   order_total: totalPrice,
   order_items: cart
   }
   
   console.log(placeOrder.customer_first_name);
   console.log(placeOrder.customer_last_name);


   console.log("placeOrder", placeOrder);

   // skapa en if-sats som kollar att alla input med requiered är ifyllda
   if (!firstName || !lastName || !adressInput || !zipcodeInput || !cityInput || !mailInput) {
       alert("Please fill in all required fields");
       return;
   }

  
   sendOrder(placeOrder);

   console.log('Order placed successfully!');
   // töm alla input-fält

});
}

// funktional expression 
// const svarFrånAPI = kallarPåAPi()
// I api funktionen return DATA

/***
 * function responsePOST(){
hämta elementen ditt form ligger innom 
 
Rendera om vi fick sucsess 200
 
aside.innerHTML = `
 
`
 
}
 */