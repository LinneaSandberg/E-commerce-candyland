import {
  addProductShoppingCart,
  removeProductShoppingCart,
  findProduct,
} from "./localStorageLogic";

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

  //Renders popup
  const renderPopup = (id) => {
    const mainEL = document.querySelector<HTMLDivElement>("#app")!;
    const product = findProduct(id);
    const infoPopupHTML = `
      <div class="moreInfoPopup">
        <div class="moreInfoPopupContent">
          <img src="https://www.bortakvall.se${product.images.large}" alt="largecandy">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p>Antal i lager: ${product.stock_quantity}</p>
          <button class="closePopup">&times</button>
        </div>
      </div>`;

    mainEL.innerHTML += infoPopupHTML;

    const closePopup =
      document.querySelector<HTMLButtonElement>(".closePopup")!;

    closePopup.addEventListener("click", (event) => {
      const moreInfoPopup =
        document.querySelector<HTMLDivElement>(".moreInfoPopup");
      moreInfoPopup.remove();
    });
    setListeners();
  };

  //Knapp för mer information
  infoBtns.forEach((infoBtn) => {
    infoBtn.addEventListener("click", (event) => {
      event.preventDefault();
      renderPopup(infoBtn.value);
    });
  });

  //Tar bort produkt i localStorage
  eraseBtns.forEach((eraseBtn) => {
    eraseBtn.addEventListener("click", (event) => {
      console.log("Erase btn: ", eraseBtn.value);
      const product = findProduct(eraseBtn.value);

      removeProductShoppingCart({
        id: product.id,
        price: product.price,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });

      // Behöver få ut ID på godiset som användaren har klickat på
      // Kolla om det finns i cart i  localStorage och ta bort 1st
    });
  });

  //Lägger till produkt i localStorage
  addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", (event) => {
      const product = findProduct(addBtn.value);

      addProductShoppingCart({
        id: product.id,
        price: product.price,
        image: `https://www.bortakvall.se${product.images.thumbnail}`,
        name: product.name,
        stock: product.stock_quantity,
      });
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
