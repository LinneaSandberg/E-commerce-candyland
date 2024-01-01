// Funktionen som hämtar allt som finns i cart i localstorage
import {
  getCart,
  adjustCart,removeFromCart
} from "./localStorageLogic";
import { renderOrder } from "./placeOrder";
import { CartItem } from "./interface";
import "bootstrap/dist/css/bootstrap.css";
import { setListeners } from "./eventListners";



//Öppna aside som innehåller kassan
export function cartListener() {
  const mainEl = document.querySelector<HTMLDivElement>("#app")!;
  const cartIcon = document.querySelector<HTMLDivElement>(".bajs")!;

  cartIcon.addEventListener("click", (event)=>{
    mainEl.innerHTML += `<aside id="sideWindow"></aside>`
    renderCart()
  })
}

// UIn för att rendera ut asiden!
const renderCart = () => {
  const aside = document.querySelector<HTMLDivElement>("#sideWindow")!;
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

   if(cartItems.length <1){
    aside.innerHTML = `
    <div class="emptyCart">
    <p>Tyvärr har du inget i din kundvagn</p>
    <button class="closeCartBtn">Handla lite</button>
    </div>
    `
   }else{
    aside.innerHTML=`
    <header class="cartHeader">
        <button class="closeCartBtn">
        <i class="bi bi-x-square"></i>
        </button>
    </header>

    <div class="cartItemsWrapper" id="cartItemsWrapper">
  <p>kundvagn<p>
      <ul>
       ${cartItems
        ?.map((cartItem: CartItem) => {
          return `
                     <li id="candyCard"> 
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
                              <p class="smallText amount" value="${cartItem.id}">${cartItem.amount}</p>
                              <button class="decreaseCandy" value="${cartItem.id}">
                                  <i class="bi bi-arrow-up-short"></i>
                              </button>
                          </div>
                          <button class="eraseProduct" value="${cartItem.id}"><i class="bi bi-trash"></i></button>
                      </div>
                    </li>`
        })
        .join("")}
      </ul>
    </div>

    <div class="sumTable">
    <p>Din order:</p>
        <ul>
        <li class="smallText">
          Antal godisar: ${totalProduct} kr
        </li>
        <li class="smallText">
          skatt: ${Number(totalPrice*0.2).toFixed(0)} kr
        </li>
        <li>
          Att betala:${totalProduct} kr
        </li>
        </ul>
        <button id="checkout">Checkout</button>
    </div>
    `
      }
      
 
    closeCart()
    adjustCandyItems()
    getIdToRemove();
    checkout();
}

// function for closing the cart, if user wants to look more in shop
function closeCart() {
  const buttonCartEl =
    document.querySelector<HTMLButtonElement>(".closeCartBtn")!;
  buttonCartEl?.addEventListener("click", (e) => {
    const cartItemsWrapperEl =
      document.querySelector<HTMLDivElement>("#sideWindow")!;
    cartItemsWrapperEl.remove();
    cartListener()
    setListeners();
  });
}



function checkout(){
  const checkoutEl = document.querySelector<HTMLFormElement>("#checkout");
  console.log(" checkoutEl :", checkoutEl)
  checkoutEl?.addEventListener("click", (e) => {
    console.log("checkout click")
    renderOrder();
  });
}
// // eventlistner for checkout-button ---> maybe to be placed in placeOrder.ts







function adjustCandyItems() {
  const increaseCandy = document.querySelectorAll(".increaseCandy");
  const decreaseCandy = document.querySelectorAll(".decreaseCandy");

  increaseCandy.forEach((increaseBtn) => {
    //Öka antalet godisar
    increaseBtn.addEventListener("click", (event) => {
      const id = increaseBtn.nextElementSibling.getAttribute("value");
      adjustCart(id, "add");
      renderCart()
    });
  });

  decreaseCandy.forEach((decreaseBtn) => {
    decreaseBtn.addEventListener("click", (event) => {
      const id = decreaseBtn.previousElementSibling.getAttribute("value");
      adjustCart(id, "remove");
      renderCart()
    });
  });
}

// Tar bort direkt från kundvagnen
function getIdToRemove(){
  const allCartItems = document.querySelectorAll(".eraseProduct");
  console.log(allCartItems)

  allCartItems.forEach((element)=>{
    element.addEventListener("click", (node)=>{
      const candyID = element.getAttribute("value");
      removeFromCart(Number(candyID))
      renderCart()
    })
  })
}



