// vi ska hitta HTML produkkorten
// hänsyn till asynkron metoder

export function setListeners(){
  const eraseButtons = document.querySelectorAll("#eraseFromCart") as NodeListOf<HTMLButtonElement>; //hämtar alla knappar som tar bort godis 
  console.log(eraseButtons);
eraseButtons.forEach((eraseBtn)=>{
  eraseBtn.addEventListener("click", (event)=>{
    console.log(`knapp ${eraseBtn} var klickad `)
  })
})
}

// yttersta div: class: productCard
//footer -> knapparna 
// -- minusknapp: addToCartContainer
// ++ plusknapp: addToCart
//visa hur många cart item: itemInCart