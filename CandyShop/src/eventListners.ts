export function setListeners() {
  const eraseButtons = document.querySelectorAll(
    "#eraseFromCart"
  ) as NodeListOf<HTMLButtonElement>; //hämtar alla knappar som tar bort godis
  console.log(eraseButtons);
  eraseButtons.forEach((eraseBtn) => {
    eraseBtn.addEventListener("click", (event) => {
      console.log(`knapp ${eraseBtn} var klickad `);
    });
  });
}
