import { Product } from "./interface";
import { fetchAllproducts } from "./apiCalls";
import { findProduct } from "./localStorageLogic";
import { setListeners } from "./eventListners";

export async function productCard() {
  //Kollar inte efter error då det görs i fetchAllproducts, borde jag ändå  kolla?
  const products: Product[] = await fetchAllproducts();
  return products
    .map((element) => {
      return `
<div class="productCard" value="${element.id}" status="${element.stock_status}">
    <div class="notis">${element.stock_status ? "In Stock" : ""}</div>
    
    <img class="" src="https://www.bortakvall.se${
      element.images.thumbnail
    }" alt="">
    <header>
        <h3>${element.name}</h3> <p>${element.price} kr</p>
    </header>
    <article class="tagContainer">
        ${element.tags
          .map((tags) => {
            return `<p class="tag">${tags.name}</p>`;
          })
          .join("")}
    </article>

    <footer>
        <button id="moreInfo" value="${element.id}">Mer Info</button>
        <div class="addToCartContainer">
            <button id="eraseFromCart" value="${element.id}">
                <i class="bi bi-cart-dash"></i>
            </button>
            <p id="itemInCart">0</p>
            <button id="addToCart" value="${element.id}">
                <i class="bi bi-cart-plus" value="add"></i>
            </button>
        </div>
    </footer>
</div>
`;
    })
    .join("");
}

//Renders popup
export const renderPopup = (id) => {
  const mainEL = document.querySelector<HTMLDivElement>("#app")!;
  const product = findProduct(id);
  const infoPopupHTML = `
    <div class="moreInfoPopup">
      <div class="moreInfoPopupContent">
        <img src="https://www.bortakvall.se${product.images.large}" alt="largecandy">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p>Antal i lager: ${product.stock_quantity}</p>
        <button class="closePopup">&times</button>
      </div>
    </div>`;

  mainEL.innerHTML += infoPopupHTML;

  const closePopup = document.querySelector<HTMLButtonElement>(".closePopup")!;

  closePopup.addEventListener("click", (event) => {
    const moreInfoPopup =
      document.querySelector<HTMLDivElement>(".moreInfoPopup");
    moreInfoPopup.remove();
  });
  setListeners();
};

// <div class="description"><p>${element.description.split("\n")[0]}</p></div>
