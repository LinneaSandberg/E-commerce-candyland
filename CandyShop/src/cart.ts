// Funktionen som hämtar allt som finns i cart i localstorage
import {
  getCart,
  removeProductShoppingCart,
  addProductShoppingCart,
  adjustCart,
} from "./localStorageLogic";
import { renderOrder } from "./placeOrder";
import { CartItem } from "./interface";
import "bootstrap/dist/css/bootstrap.css";
import { checkoutListner } from "./eventListners";

//Öppna aside som innehåller kassan
export function cartListener() {
  const cartElementEl = document.querySelector<HTMLDivElement>(".bajs")!;
  const mainEL = document.querySelector<HTMLDivElement>("#app")!;

  // Lyssnar efter att användaren trycker på kundvagnen på hemsidan
  cartElementEl.addEventListener("click", (e) => {
    mainEL.innerHTML += `
        <aside id="sideWindow">
        ${renderCart()}
        </aside>
        `;
    closeCart();
  });
  adjustCandyItems();
  checkoutListner();
}

// UIn för att rendera ut asiden!
const renderCart = () => {
  const cartItems = getCart();

  // totala summan för alla produkter
  let totalPrice: number = 0;
  cartItems?.forEach((total) => {
    totalPrice += total.totalCost;
  });
  console.log(totalPrice);

  // totala antalet produkter både av samma och olika
  let totalProduct: number = 0;
  cartItems?.forEach((total) => {
    totalProduct += total.amount;
  });

  // INNAN JAG RETURNAR SÅ HADE JAG KOLLAT OM JAG KAN CONSOLE.LOGGA ALLT JAG VILL SKA SYNAS PÅ SKÄRMEN

  return `
<div id="cartItemsWrapper">
    <header class="cartHeader">
        <button id="buttonCart">
        <i class="bi bi-x-square"></i>
        </button>
    </header>

    <table class="cartTable" id="tableBox">
    <thead>
     <tr>
      <th>Kundvagn</th>
     </tr>
    </thead>
    <tbody>
        ${cartItems
          ?.map((cartItem: CartItem) => {
            return `
                <tr class="">
                    <td class="itemCardWrapper">
                        <div class="itemCard">
                            <img src="${cartItem.image}" alt=""/> 
                            <div class="itemCardInfo">
                                <p>${cartItem.name}</p>
                                <p class="smallText">${cartItem.price} kr/st</p>
                                <p class="smallText">totalt ${cartItem.totalCost} kr</p>
                            </div>
                            <div class="sumItemCard">
                                <button class="increaseCandy" value="${cartItem.id}">
                                  <i class="bi bi-arrow-up-short"></i>
                                  </button>
                                <p class="smallText amount">${cartItem.amount}</p>
                                <button class="decreaseCandy" value="${cartItem.id}">
                                    <i class="bi bi-arrow-up-short"></i>
                                </button>
                            </div>
                            <button onclick="" class="eraseProduct"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>
        `;
          })
          .join("")}
</tbody>
</table>
<div class="sumUpOrder">
    <table>
        <tbody>
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
        </tbody>
    </table>
</div>
</div>
`;
};

// function for closing the cart, if user wants to look more in shop
function closeCart() {
  const buttonCartEl =
    document.querySelector<HTMLButtonElement>("#buttonCart")!;

  buttonCartEl?.addEventListener("click", (e) => {
    const cartItemsWrapperEl =
      document.querySelector<HTMLDivElement>("#sideWindow")!;
    cartItemsWrapperEl.remove();
  });
  cartListener();
}

// eventlistner for checkout-button ---> maybe to be placed in placeOrder.ts
const checkoutEl = document.querySelector<HTMLFormElement>("#checkout");

checkoutEl?.addEventListener("click", (e) => {
  renderOrder();
});

function adjustCandyItems() {
  const increaseCandy = document.querySelectorAll(".increaseCandy");
  const decreaseCandy = document.querySelectorAll(".decreaseCandy");

  increaseCandy.forEach((increaseBtn) => {
    increaseBtn.addEventListener("click", (event) => {
      adjustCart(event.currentTarget.getAttribute("value"), "add");
      const relatedP = increaseBtn.nextElementSibling;
      const currentValue = Number(relatedP.innerHTML);
      relatedP.innerHTML = currentValue + 1;
    });
  });

  decreaseCandy.forEach((decreaseBtn) => {
    decreaseBtn.addEventListener("click", (event) => {
      adjustCart(event.currentTarget.getAttribute("value"), "remove");
      const relatedP = decreaseBtn.previousElementSibling;
      const currentValue = Number(relatedP.innerHTML);
      relatedP.innerHTML = currentValue - 1;
    });
  });
}
