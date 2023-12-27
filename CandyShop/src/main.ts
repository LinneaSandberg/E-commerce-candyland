import "./style.css";
import { productCard } from "./productCard.ts";
import {setListeners} from "./eventListners.ts"



async function renderScreen(){
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <nav>
    <p>CandyShop</p>
   
    <div class="bajs">
        <i class="bi bi-cart2"></i>
        <div class="itemAmountInCart">0<div>
    </div>
 
  </nav>
 
<main id="toRender">
  ${await productCard()}
 
  </main>
  `
   setListeners()
}
renderScreen()


