import "./style.css";
import { productCard } from "./productCard.ts";
import { setListeners } from "./eventListners.ts";
import { cartListener } from "./cart.ts";
import { numberOfProducts } from "./productCard.ts";

// Funktion för att rendera hela hemsidan
async function renderScreen() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <nav>
    <p>CandyShop</p>
    <div class="bajs">
        <i class="bi bi-cart2"></i>
    </div>
  </nav>
 
  <main id="toRender">
  ${numberOfProducts()}
  ${await productCard()}
  </main>
  `;
  setListeners();
  cartListener();
}
renderScreen();
