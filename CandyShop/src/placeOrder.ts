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
<div id="wrapper" class="container">

        <h2 id="headerForm">Checkout</h2>
        <p id="paraForm">Order</p>
     <form class="container" id="orderForm">

        <label class="label" for="nameInput">
            Name*
            <input class="input" type="text" name="namn" id="nameInput" placeholder="Name" required>
        </label>

        <label class="label" for="adressInput">
            Adress*
            <input class="input" type="text" name="adress" id="adressInput" placeholder="Adress" required>
        </label>

        <label class="label" for="zipcodeInput">
            Zipcode*
            <input class="input" type="text" name="zipcode" id="zipcodeInput" placeholder="Zipcode" required>
        </label>

        <label class="label" for="cityInput">
            City*
            <input class="input" type="text" name="ort" id="cityInput" placeholder="City" required>
        </label>

        <label class="label" for="telInput">
            Telephone
            <input class="input" type="text" name="telephone" id="telInput" placeholder="Telephone">
        </label>

        <label class="label" for="mailInput">
            Email*
            <input class="input" type="text" name="email" id="mailInput" placeholder="Email" required>
        </label>

        <button id="submitButton" type="submit">Lägg order</button>

     </form>

    </div>`

}
