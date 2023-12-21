import { Product } from "./interface";

let candies: Product[] = [];

export const divEl = document.querySelector<HTMLDivElement>('#app')!;

// fetch the products from the API
export async function fetchAllproducts(): Promise<Product[]> {
   const res = await fetch("http://www.bortakvall.se/api/v2/products")

   if (!res.ok) {
           throw new Error(`Could not fetch the list of prodecuts. The status code was: ${res.status}`);
   }

   const data: { data: Product[] } = await res.json();

   return data.data;
   
}

await fetchAllproducts();
console.log(candies);



export const renderProducts = () => {

    divEl.innerHTML = candies.map(data => 
    `<div>
    <img src="${data.images.thumbnail}" alt="${data.name}"/>
    <h2>${data.name}</h2>
    <p>Price: ${data.price}</p>
    </div>
    `).join("");

}



// get products from server and update local copy and render the products
export const renderFetchedProducts = async () => {

    try {
        candies = await fetchAllproducts();
        renderProducts();
        console.log('rendering the products', candies);

    } catch (error) {
       alert(`Could not get products!`)
    }
}

renderFetchedProducts();


