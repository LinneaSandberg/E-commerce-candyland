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

export interface Tag {
    id: number
    name: string
    slug: string
}

export interface Image {
    thumbnail: string
    large: string
}

console.log('testa att det fungerar')
console.log('testar igen för att se om jag kommer ifrån main!')


export let candies: Product[] = [];

const divEl = document.querySelector<HTMLDivElement>('#app')!;


// fetch the products from the API
export const fetchProducts = async () => {

    const res = await fetch("http://www.bortakvall.se/api/v2/products")

    if (!res.ok) {
        throw new Error(`Could not fetch the list of prodecuts. The status code was: ${res.status}`);
    }

    const data: Product[] = await res.json();

    return data;
    
}

console.log(fetchProducts)





// get products from server and update local copy and render the products
export const renderFetchedProducts = async () => {

    try {
        candies = await fetchProducts();

        renderProducts();

        console.log('rendering the products', renderFetchedProducts);


    } catch (error) {
        alert(`Could not get products!`)

    }

}

export const renderProducts = () => {

    divEl.innerHTML = candies.map(candy => `<div><img>${candy.images.thumbnail}</img><h2>${candy.name}</h2></div>`).join("");

}

renderFetchedProducts();


