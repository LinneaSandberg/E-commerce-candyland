export default function navBar() {
  const content: string = `
<nav>
    <p>CandyShop</p> 
   
    <div class="bajs">
        <i class="bi bi-cart2"></i>
        <div class="itemAmountInCart">0<div>
    </div>

  </nav>
`;
  return content;
}
navBar();

export function addListenerCart() {
  const shoppingCart = document.querySelector(".bajs");
  shoppingCart?.addEventListener("click", () => {
    console.log("Öppna vart vid klick");
  });
}
