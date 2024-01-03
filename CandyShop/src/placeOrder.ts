import { ApiResponse, Data } from "./interface";
import { getCart } from "./localStorageLogic";
import { sendOrder } from "./apiCalls";

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
  });
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

  wrapper.innerHTML = `
<header>
<h2>Kassa</h2>
<p>Orderinfo</p>
</header>

<form class="orderForm">
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
</form>`;

  placeOrder(totalPrice);
}

// funktion för att skicka order med inputvärderna till api
function placeOrder(totalPrice: number) {
  const orderFormEl = document.querySelector<HTMLFormElement>(".orderForm");

  //----------------------------------------------
  orderFormEl?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // här hämtar jag min DOM referenser
    const firstNameEl = document.querySelector<HTMLInputElement>("#firstName");
    const lastNameEl = document.querySelector<HTMLInputElement>("#lastName");
    const adressInputEl =
      document.querySelector<HTMLInputElement>("#adressInput");
    const zipcodeInputEl =
      document.querySelector<HTMLInputElement>("#zipcodeInput");
    const cityInputEl = document.querySelector<HTMLInputElement>("#cityInput");
    const mailInputEl = document.querySelector<HTMLInputElement>("#mailInput");

    // input värden för alla inputfält
    const firstName = firstNameEl?.value || "";
    const lastName = lastNameEl?.value || "";
    const adressInput = adressInputEl?.value || "";
    const zipcodeInput = zipcodeInputEl?.value || "";
    const cityInput = cityInputEl?.value || "";
    const mailInput = mailInputEl?.value || "";

    const cart = objApi();

    // ett object med beställaren inputs
    const placeOrder: Data = {
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_address: adressInput,
      customer_postcode: zipcodeInput,
      customer_city: cityInput,
      customer_email: mailInput,
      order_total: totalPrice,
      order_items: cart,
    };

    // skapa en if-sats som kollar att alla input med requiered är ifyllda
    if (
      !firstName ||
      !lastName ||
      !adressInput ||
      !zipcodeInput ||
      !cityInput ||
      !mailInput
    ) {
      alert("Please fill in all required fields");
      return;
    }

    //Testar göra ett API inrop. catch hanterar om det inte går att anropa APIet
    try {
      const response = await sendOrder(placeOrder);

      renderStatusSuccess(response);
    } catch (error) {
      renderStatusFail();
    }
  });
}

// funktion som renderar HTML för att ordern gick igenom
const renderStatusSuccess = (data: ApiResponse) => {
  const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;
  wrapper.innerHTML = `
    <div>
    <h2>🛍️ Tack för din order! 🛍️</h2>
    <p>Ditt ordernummer är: ${data.data.id}</p>
    </div>
    `;
};

// funktion som renderar HTML för att ordern inte gick igenom
const renderStatusFail = () => {
  const wrapper = document.querySelector<HTMLDivElement>("#cartItemsWrapper")!;
  wrapper.innerHTML = `
    <div>
    <h2>Din order kunde inte skickas</h2>
    <p>Felet ligger hos vår leverantör och de är medvetna om felet</p>
    <p>LÄGG IN EN GIF</p>
    </div>
    `;
};
