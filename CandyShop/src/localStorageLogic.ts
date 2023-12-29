import { Product, ProductItem, CartItem } from "./interface";

let cart: CartItem[] = []; //kundvagn
let existingItem: CartItem | undefined;


//Lägga in apiAnropet i localStorage
//Lägg till om det inte redan finns en lista
export function productListToLocalStorage(productList: Product[]) {
  localStorage.setItem("productList", JSON.stringify(productList));
  // const cart = JSON.parse(localStorage.getItem('cart'));;
}

export function findProduct(id) {
  const productList = JSON.parse(localStorage.getItem("productList"));
  const product = productList.find((product) => product.id === Number(id));
  console.log("product: ", )
  return product;
}

//DEN FUNGERAR 🧹 Städa bara uppp -> fungerar med dummy data
// Ta emot id:, image:, name: , price, stock:
export function addProductShoppingCart(product: ProductItem) {

console.log("addProductShoppingCart:", product)
  const item = findExistingItem(product);
  console.log("efter findExistingItem: ", item)

  if (item) {
    existingItem = item;
    console.log("existingItem: ", existingItem);
  } else {
    existingItem = undefined;
  }

  //validera att det är av findExistingItem
  if (existingItem) {
    // Loopar  igen vår array och hittar rätt objekt och uppdaterar det
    cart.forEach((candyItem: CartItem) => {
      if (candyItem.id === product.id) {
        candyItem.amount++;
        candyItem.totalCost = candyItem.price * candyItem.amount;
      }
    });
  } else {
    // Lägger till nytt godis om det inte finns i varukorgen
    cart.push({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      stock: product.stock,
      amount: 1,
      totalCost: product.price,
    });
  }

  // Uppdaterar Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeProductShoppingCart(product: ProductItem) {
  const item = findExistingItem(product);

  if (item) {
    existingItem = item;
  }

  if (existingItem) {
    // Loopar  igen vår array och hittar rätt objekt och uppdaterar det
    cart.forEach((candyItem: CartItem) => {
      if (candyItem.id === product.id) {
        candyItem.amount--;
        candyItem.totalCost = candyItem.price * candyItem.amount;
      }
      // Här kan vi kolla om candyItem är === 0 så tar vi bort den från listan
    });
  }
}

//Ger dig hela kundvagnen
export function getCart(): CartItem[] | null {
  const cartJSON = localStorage.getItem("cart");
  if (cartJSON !== null) {
    const cart = JSON.parse(cartJSON);
    return cart;
  } else {
    return "Couldnt give you cart";
  }
}

function findExistingItem(product: ProductItem): CartItem | undefined {
  console.log("findExistingItem: ", product)

  const cartJSON = localStorage.getItem("cart");
  if (cartJSON) {

    const cart: CartItem[] = JSON.parse(cartJSON);
    const found = cart.find((candy) => candy.id === product.id);
    console.log("found: ", found);
  return found;
  
  }else{
    console.log("else kördes")
    return undefined;
  }
  
}

//Rendera hela kundvagnen
