import {
  addProductShoppingCart,
  removeProductShoppingCart,
  findProduct,
} from "./localStorageLogic";
import { renderOrder } from "./placeOrder";
import { renderPopup } from "./productCard";

export function setListeners() {
  const infoBtns = document.querySelectorAll(
    "#moreInfo"
  ) as NodeListOf<HTMLButtonElement>;
  const eraseBtns = document.querySelectorAll(
    "#eraseFromCart"
  ) as NodeListOf<HTMLButtonElement>;
  const addBtns = document.querySelectorAll(
    "#addToCart"
  ) as NodeListOf<HTMLButtonElement>;

  //Knapp för mer information
  infoBtns.forEach((infoBtn) => {
    infoBtn.addEventListener("click", (event) => {
      event.preventDefault();
      renderPopup(Number(infoBtn.value));

    });
  });

  //Tar bort produkt i localStorage
  eraseBtns.forEach((eraseBtn) => {
 // Kod appliceas på alla knappar
    //stockstatus sparas för varje knapp
    const stockStatus = eraseBtn.getAttribute("data-stockStatus");
    //inhiberar addknapp om den är outofstock
  if(stockStatus === "outofstock"){
    eraseBtn.disabled = true;
  }

    eraseBtn.addEventListener("click", () => {
      const product = findProduct(eraseBtn.value);
      removeProductShoppingCart({
        id: product.id,
        price: product.price,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });
      // Behöver få ut ID på godiset som användaren har klickat på
      // Kolla om det finns i cart i  localStorage och ta bort 1st
    });
  });

  //Lägger till produkt i localStorage
  addBtns.forEach((addBtn) => {
    // Kod appliceas på alla knappar
    //stockstatus sparas för varje knapp
      const stockStatus = addBtn.getAttribute("data-stockStatus");
      //inhiberar addknapp om den är outofstock
    if(stockStatus === "outofstock"){
      addBtn.disabled = true;
    }

    addBtn.addEventListener("click", () => {
   // kod appliceras på en specifik knapp NÄR VI KLICKAR PÅ DEN
      const product = findProduct(addBtn.value);

      addProductShoppingCart({
        id: product.id,
        price: product.price,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });
    });
  });
}

export function checkoutListner() {
  const checkoutEl = document.querySelector<HTMLButtonElement>("#checkout")!;
  const mainEL = document.querySelector<HTMLDivElement>("#app")!;

  checkoutEl?.addEventListener("click", () => {
    const asideWrapper = document.querySelector<HTMLDivElement>("#sideWindow")!;

    asideWrapper.innerHTML = `
    ${renderOrder()}
    `;
  });
}
