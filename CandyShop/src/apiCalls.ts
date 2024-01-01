import { Product, PlaceOrder } from "./interface";
import { productListToLocalStorage } from "./localStorageLogic";
let candies: Product[] = [];
export const divEl = document.querySelector<HTMLDivElement>("#app")!;


// fetch the products from the API
export async function fetchAllproducts(): Promise<Product[]> {

  //-> Hämtar produktlistan från Johans API
  const res = await fetch("https://www.bortakvall.se/api/v2/products");
  if (!res.ok) {
    throw new Error(
      `Could not fetch the list of prodecuts. The status code was: ${res.status}`
    );
  }
  const data: { data: Product[] } = await res.json();

  //-> Skickar produktlistan till en funktion i localStorageLogic.ts
  productListToLocalStorage(data.data);
  return data.data; // Denna ska tass bort 
}

// get products from server and update local copy and render the products
// ? vet inte varför denna finns
export const renderFetchedProducts = async () => {
  try {
    candies = await fetchAllproducts();
    // renderProducts();
  } catch (error) {
    alert(`Could not get products!`);
  }
};



// post an order to api
export async function sendOrder(placeOrder: PlaceOrder) {

  const apiURL = "https://www.bortakvall.se/api/v2/users/31/orders";

  const res = await fetch(apiURL, {
      method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(placeOrder),
  });
  console.log('sending to api', res)

  if (!res.ok) {
      throw new Error(`Sorry! There is an problem, could not place your order. Status code was: ${res.status}`)
  }
};
