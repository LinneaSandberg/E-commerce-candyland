// vi ska hitta HTML produkkorten
// hänsyn till asynkron metoder

export function setListeners(){
  //Hämtar alla eraseknappar
  const eraseButtons = document.querySelectorAll("#eraseFromCart") as NodeListOf<HTMLButtonElement>; //hämtar alla knappar som tar bort godis 


  //TODO hämta ut alla knappar som ska lägga till godis i cart 
 


  //Lägger  en knapp på alla click event på alla eraseknappar
eraseButtons.forEach((eraseBtn)=>{
  eraseBtn.addEventListener("click", (event)=>{
    // Behöver få ut ID på godiset som användaren har klickat på
    // Kolla om det finns i cart i  localStorage och ta bort 1st
  })
})
}

// yttersta div: class: productCard
//footer -> knapparna 
// -- minusknapp: addToCartContainer
// ++ plusknapp: addToCart
//visa hur många cart item: itemInCart
