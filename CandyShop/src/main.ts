import "./style.css";
import { productCard } from "./productCard.ts";
import navBar from "./navBar";

async function renderScreen() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${navBar()}  
  <main id="toRender">
  ${await productCard()}
  </main>
  `
}
renderScreen()

