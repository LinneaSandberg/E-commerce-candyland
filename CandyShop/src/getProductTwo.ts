import { Product } from "./interface";
import {productListToLocalStorage} from "./localStorageLogic"
let candies: Product[] = [];
export const divEl = document.querySelector<HTMLDivElement>('#app')!;


// fetch the products from the API
export async function fetchAllproducts(): Promise<Product[]> {
   const res = await fetch("https://www.bortakvall.se/api/v2/products")
   if (!res.ok) {
           throw new Error(`Could not fetch the list of prodecuts. The status code was: ${res.status}`);
   }
   const data: { data: Product[] } = await res.json()
   productListToLocalStorage(data.data);
   return data.data;
}


// get products from server and update local copy and render the products
export const renderFetchedProducts = async () => {

    try {
        candies = await fetchAllproducts();
        // renderProducts();

    } catch (error) {
       alert(`Could not get products!`)
    }
}




