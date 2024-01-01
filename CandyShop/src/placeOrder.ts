import { Data, PlaceOrder } from "./interface";
import { CartItem } from './interface'
import { getCart } from "./localStorageLogic";
import { sendOrder } from './apiCalls';

// DOM referenser för alla input-fält
const orderFormEl = document.querySelector<HTMLFormElement>('#orderForm');
const nameInputEl = document.querySelector<HTMLInputElement>('#nameInput');
const adressInputEl = document.querySelector<HTMLInputElement>('#adressInput');
const zipcodeInputEl = document.querySelector<HTMLInputElement>('#zipcodeInput');
const cityInputEl = document.querySelector<HTMLInputElement>('#cityInput');
const telInputEl = document.querySelector<HTMLInputElement>('#telInput');
const mailInputEl = document.querySelector<HTMLInputElement>('#mailInput');

const cartItems: CartItem[] | null = getCart();

orderFormEl?.addEventListener("submit", async (e) => {
    
    e.preventDefault();

     // input värden för alla inputfält
     const inputName = nameInputEl?.value || "";
     const adressInput = adressInputEl?.value || "";
     const zipcodeInput = zipcodeInputEl?.value || "";
     const cityInput = cityInputEl?.value ||"";
     const telInput = telInputEl?.value ? telInputEl?.value : null;
     const mailInput = mailInputEl?.value ||"";

    const orderItems = cartItems?.map((cartItem) => {
        return {
            product_id: cartItem.id,
            qty: cartItem.amount,
            item_price: cartItem.price,
            item_total: cartItem.totalCost,
        };
    })



    // ett object med beställaren inputs
    const placeOrder: Data = {
    customer_first_name: inputName,
    customer_last_name: inputName,
    customer_address: adressInput,
    customer_postcode: zipcodeInput,
    customer_city: cityInput,
    customer_email: mailInput,
    order_total: totalPrice,
    order_items: orderItems,

    }

    console.log("values to send to API: ", placeOrder);

    // skapa en if-sats som kollar att alla input med requiered är ifyllda
    if (!inputName || !adressInput || !zipcodeInput || !cityInput || !mailInput) {
        alert("Please fill in all required fields");
        return;
    }

    // en try-catch för att hantera utfallet av sendOrder om api-anropen genomfördes utförs else!
    try {
        await sendOrder(placeOrder);

        console.log('Order placed successfully!');

        // töm alla input-fält
    } catch (error) {
        // fixa så att användaren ser att det blivit ett fel och inte i konsollen!
        console.error('Could not send the order to API. Error: ', error);
    }
});

let totalPrice: number = 0;
cartItems?.forEach((total) => {
  Number(totalPrice += total.totalCost);
});



export const renderOrder = () => {

    // let totalPrice: number = 0;
    // cartItems?.forEach((total) => {
    //   totalPrice += total.totalCost;
    // });
  
    let totalProduct: number = 0;
    cartItems?.forEach((total) => {
      totalProduct += total.amount;
    });
    const antal = totalProduct === 1 ? "vara" : "varor";


    return `
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

<form id="orderForm" action="http://www.bortakvall.se/api/v2/users/31/orders" method="post">
 <div class="inputWrapper">
    <label for="nameInput" class="underline">
        Namn:
        <input type="text" name="namn" id="nameInput" required>
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

}
