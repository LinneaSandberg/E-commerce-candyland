import { Product } from "./interface";
import { fetchAllproducts } from "./apiCalls";
import { findProduct } from "./localStorageLogic";
import { setListeners } from "./eventListners";
import { cartListener } from "./cart";

const productList = await fetchAllproducts();

export function numberOfProducts() {
  console.log(productList);
  const productsInStock = productList.filter(
    (product) => product.stock_status === "instock"
  );
  return `
  <div class="numberOfProducts">
    <p>Vi har ${productList.length} produkter varav ${productsInStock.length} är i lager</p>
  </div>
  `;
}

export async function productCard() {
  //Kollar inte efter error då det görs i fetchAllproducts, borde jag ändå  kolla?
  const products: Product[] = await fetchAllproducts();

  products.sort(function (a, b) {
    let nameA = a.name.toLocaleUpperCase();
    let nameB = b.name.toLocaleUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return products
    .map((element) => {
      return `
<div class="productCard" value="${element.id}" status="${element.stock_status}">
    <div class="notis">${element.stock_status == "instock" ? "In Stock" : "Not in stock"}</div>
    
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
export const renderPopup = (id: string) => {
  const mainEL = document.querySelector<HTMLDivElement>("#app")!;
  const product = findProduct(id);
  const infoPopupHTML = `
    <div class="moreInfoPopup">
      <div class="moreInfoPopupContent">
        <img src="https://www.bortakvall.se${
          product.images.large
        }" alt="largecandy">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p>Antal i lager: ${
          product.stock_quantity == null
            ? "Slut i lager"
            : product.stock_quantity
        }</p>
        <button class="closePopup">&times</button>
      </div>
    </div>`;

  mainEL.innerHTML += infoPopupHTML;

  const closePopup = document.querySelector<HTMLButtonElement>(".closePopup")!;

  closePopup.addEventListener("click", () => {
    const moreInfoPopup =
      document.querySelector<HTMLDivElement>(".moreInfoPopup");
    moreInfoPopup.remove();
  });
  setListeners();
  cartListener();
};

// <div class="description"><p>${element.description.split("\n")[0]}</p></div>
