import { Product, ProductItem, CartItem } from "./interface";

let cart: CartItem[] = []; //kundvagn
let existingItem: CartItem | undefined;

//Lägga in apiAnropet i localStorage
//Lägg till om det inte redan finns en lista
export function productListToLocalStorage(productList: Product[]) {
  localStorage.setItem("productList", JSON.stringify(productList));
  // const cart = JSON.parse(localStorage.getItem('cart'));;
  addProductShoppingCart({
    id: 965,
    image: "http:KISS",
    name: "Oscar",
    price: 100,
    stock: 1,
  });
}

//DEN FUNGERAR 🧹 Städa bara uppp -> fungerar med dummy data
// Ta emot id:, image:, name: , price, stock:
export function addProductShoppingCart(product: ProductItem) {
  const item = findExistingItem(product);
  if (item) {
    existingItem = item;
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
        candyItem.amount++;
        candyItem.totalCost = candyItem.price * candyItem.amount;
      }
    });
  }
}

//Ger dig hela kundvagnen
export function getCart() {
  const cartJSON = localStorage.getItem("cart");
  if (cartJSON !== null) {
    const cart = JSON.parse(cartJSON);
    return cart;
  } else {
    return "Couldnt give you cart";
  }
}

function findExistingItem(product: ProductItem): CartItem | undefined {
  const cartJSON = localStorage.getItem("cart");
  if (cartJSON) {
    const cart: CartItem[] = JSON.parse(cartJSON);
    return cart.find((candy) => candy.id === product.id);
  }
  return undefined;
}

//Rendera hela kundvagnen
