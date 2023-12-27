// vi ska hitta HTML produkkorten
// hänsyn till asynkron metoder

export function setListeners() {
  //Hämtar alla eraseknappar
  const eraseButtons = document.querySelectorAll(
    "#eraseFromCart"
  ) as NodeListOf<HTMLButtonElement>; //hämtar alla knappar som tar bort godis

  //TODO hämta ut alla knappar som ska lägga till godis i cart

  //Lägger  en knapp på alla click event på alla eraseknappar
  eraseButtons.forEach((eraseBtn) => {
    eraseBtn.addEventListener("click", (event) => {
      // Behöver få ut ID på godiset som användaren har klickat på
      // Kolla om det finns i cart i  localStorage och ta bort 1st
    });
  });
}

//Sätta eventlyssnare på alla knappar som ska lägga till godis i cart
//Du behöver lista ut hur du tar ut följande information om godiset på det produktkort som har fått ett event (click)
/*
  interface ProductItem{ 
  id: number, <- godis ID
  image: string <- godis URL
  name: string <- Godiset namn
  price: number <- Priset för godiset
  stock: number <- Hur många som är i stock // osäker låt mig tänka lite här varför du behöver skicka detta. 
  } */

// skicka in objectet till addProductShoppingCart()
// nu ska det inte behöva göras mer

// ------------------ TIPS ------------------------

// Du behöver ha koll på localStorageLogic tar emot och gör.
