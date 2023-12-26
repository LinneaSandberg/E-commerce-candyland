import { placeOrder } from "./interface";

// DOM referenser för alla input-fält
const asideForOrderEl = document.querySelector<HTMLDivElement>('#order')!
const orderFormEl = document.querySelector<HTMLFormElement>('#orderForm');
const nameInputEl = document.querySelector<HTMLInputElement>('#nameInput');
const adressInputEl = document.querySelector<HTMLInputElement>('#adressInput');
const zipcodeInputEl = document.querySelector<HTMLInputElement>('#zipcodeInput');
const cityInputEl = document.querySelector<HTMLInputElement>('#cityInput');
const telInputEl = document.querySelector<HTMLInputElement>('#telInput');
const mailInputEl = document.querySelector<HTMLInputElement>('#mailInput');
const toRenderEl = document.querySelector<HTMLElement>('#toRender')!;



const submitOrder = async (placeOrder: placeOrder) => {

    const res = await fetch("https://www.bortakvall.se/api/v2/users/31/orders", {
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(placeOrder),
    });
    console.log('sending to api', res)
  
    if (!res.ok) {
        throw new Error(`Sorry! There is an problem, could not place your order. Status code was: ${res.status}`)
    }
  }

// const cartButton = document.querySelector('#bajs'); ---> för att sätta addEventlistner på cart knappen



orderFormEl?.addEventListener("submit", async (e) => {
    
    e.preventDefault();

     // input värden för alla inputfält
     const inputName = nameInputEl?.value || "";
     const adressInput = adressInputEl?.value || "";
     const zipcodeInput = Number(zipcodeInputEl?.value);
     const cityInput = cityInputEl?.value ||"";
     const telInput = telInputEl?.value ? Number(telInputEl?.value) : null;
     const mailInput = mailInputEl?.value ||"";


    // skapa en if-sats som kollar att alla input med requiered är ifyllda
    if (!inputName || !adressInput || isNaN(zipcodeInput) || !cityInput || !mailInput) {
     alert("Please fill in all required fields");
     return
    }



    // ett object med beställaren inputs
    const placeOrder: placeOrder = {
    name: inputName,
    adress: adressInput,
    postnumber: zipcodeInput,
    city: cityInput,
    telefon: telInput,
    epost: mailInput,
    }

    console.log("values to send to API: ", placeOrder);

    try {
        await submitOrder(placeOrder);
        console.log('Order placed successfully!');
        // få tillbaka något från API:et?
        // töm alla input-fält
    } catch (error) {
        // fixa så att användaren ser att det blivit ett fel och inte i konsollen!
        console.log('Could not send the order to API. The status code was')
    }
});




toRenderEl.addEventListener('click', (e) => {

    e.preventDefault();

    renderCart();

})



const renderCart = () => {

    asideForOrderEl.innerHTML=`
<div>
<h2>Checkout</h2>
<div>
    <p>Order</p>
</div>
<form id="orderForm" action="http://www.bortakvall.se/api/v2/users/31/orders" method="post">

    <label for="nameInput">
        Name:
        <input type="text" name="namn" id="nameInput" required>
    </label>

    <label for="adressInput">
        Adress:
        <input type="text" name="adress" id="adressInput" required>
    </label>

    <label for="zipcodeInput">
        Zipcode:
        <input type="text" name="zipcode" id="zipcodeInput" required>
    </label>

    <label for="cityInput">
        City:
        <input type="text" name="ort" id="cityInput" required>
    </label>

    <label for="telInput">
        Telephone:
        <input type="text" name="telephone" id="telInput">
    </label>

    <label for="mailInput">
        Email:
        <input type="text" name="email" id="mailInput" required>
    </label>

    <button type="submit">Lägg order</button>
</form>
</div>`

}