export interface Product {
    id: number
    name: string
    description: string
    price: number
    on_sale: boolean
    images: Image
    stock_status: string
    stock_quantity: number | null
    tags: Tag[]
}

interface Tag {
    id: number
    name: string
    slug: string
}

interface Image {
    thumbnail: string
    large: string
}


export let candies: Product[] = [];

export const divEl = document.querySelector<HTMLDivElement>('#app')!;


//! OSCAR SKREV, DETTA FUNGERAEDE NÄR VI VAR PÅ SKOLAN 
// async function getAllProducts(){
//     const res  =  await fetch("http://www.bortakvall.se/api/v2/products")
//     const data = await res.json();
//     console.log("data: ",  data);
//   }
//     getAllProducts();

// fetch the products from the API
export async function fetchAllproducts() {
   const res = await fetch("http://www.bortakvall.se/api/v2/products")

   if (!res.ok) {
           throw new Error(`Could not fetch the list of prodecuts. The status code was: ${res.status}`);
   }

   // const data = await res.json();

   const data: Product[] = await res.json();

   console.log('data: ', data)

   return data;
   
}

fetchAllproducts();

// export const fetchProducts = async () => {

//     const res = await fetch("http://www.bortakvall.se/api/v2/products")

//     if (!res.ok) {
//         throw new Error(`Could not fetch the list of prodecuts. The status code was: ${res.status}`);
//     }

//     const data: Product[] = await res.json();

//     return data;
   
// }

// console.log(fetchProducts)





// get products from server and update local copy and render the products
export const renderFetchedProducts = async () => {

    try {
        candies = await fetchAllproducts();

       renderProducts();

        console.log('rendering the products', renderFetchedProducts);


    } catch (error) {
       alert(`Could not get products!`)
    }
}

export const renderProducts = () => {

    divEl.innerHTML = candies.map(data => `<div><img>${data.images.thumbnail}</img><h2>${data.name}</h2></div>`).join("");

}


