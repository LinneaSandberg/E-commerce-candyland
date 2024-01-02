import { ApiResponse, CartItem } from "./interface";
import { getCart } from "./localStorageLogic";
import { sendOrder } from './apiCalls';


// 
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



// funktion för att rendera orderinfo + formulär
export function renderOrder() {

    const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;

    const cartItems = getCart();
    
    let totalPrice: number = 0;
    cartItems?.forEach((total) => {
    totalPrice += total.totalCost;
    });
  
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
        <input type="text" name="zipcode" id="zipcodeInput" minlength="5" maxlength="6" required>
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


placeOrder(totalPrice);
}


// funktion för att skicka order med inputvärderna till api
function placeOrder(totalPrice: number){
    console.log('placeOrder | totalPrice: ', totalPrice);
const orderFormEl = document.querySelector<HTMLFormElement>('#orderForm');

//----------------------------------------------
orderFormEl?.addEventListener("submit", async (e) => {
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


   //Testar göra ett API inrop. catch hanterar om det inte går att anropa APIet
   try {
    const response = await sendOrder(placeOrder, totalPrice);
    console.log('response: ', response);
    renderStatusSuccess(response);
   } catch (error) {
    renderStatusFail(); // här måste jag byta ut parametern
   }

   // töm alla input-fält

});
}

const renderStatusSuccess = (data: ApiResponse) => {
    const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;

    wrapper.innerHTML = `
    <div>
    <h2>🛍️ Tack för din order! 🛍️</h2>
    <p>Ditt ordernummer är: ${data.data.id}</p>
    </div>
    `
}

const renderStatusFail = () => {
    const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;
    wrapper.innerHTML = `
    <div>
    <h2>Din order kunde inte skickas</h2>
    <p>Felet ligger hos vår leverantör och de är medvetna om felet</p>
    <p>LÄGG IN EN GIF</p>
    </div>
    `

}