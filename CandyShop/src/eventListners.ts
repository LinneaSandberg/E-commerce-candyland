export function setListeners() {
  const infoBtns = document.querySelectorAll(
    "#moreInfo"
  ) as NodeListOf<HTMLButtonElement>;

  const eraseBtns = document.querySelectorAll(
    "#eraseFromCart"
  ) as NodeListOf<HTMLButtonElement>;

  const addBtns = document.querySelectorAll(
    "#addToCart"
  ) as NodeListOf<HTMLButtonElement>;

  //TODO hämta ut alla knappar som ska lägga till godis i cart
  infoBtns.forEach((infoBtn) => {
    infoBtn.addEventListener("click", (event) => {
      console.log("more info");
    });
  });

  //Lägger  en knapp på alla click event på alla eraseknappar
  eraseBtns.forEach((eraseBtn) => {
    eraseBtn.addEventListener("click", (event) => {
      console.log("remove");
      // Behöver få ut ID på godiset som användaren har klickat på
      // Kolla om det finns i cart i  localStorage och ta bort 1st
    });
  });

  addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", (event) => {
      console.log("add");
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
