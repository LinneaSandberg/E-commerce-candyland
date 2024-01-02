import { Product, ProductItem, CartItem } from "./interface";
import { productCard } from "./productCard";

let cart: CartItem[] = []; //kundvagn


//Lägga in apiAnropet i localStorage
//Lägg till om det inte redan finns en lista
export function productListToLocalStorage(productList: Product[]) {
  localStorage.setItem("productList", JSON.stringify(productList));
  // const cart = JSON.parse(localStorage.getItem('cart'));;
}

export function findProduct(id) {
  const productList = JSON.parse(localStorage.getItem("productList"));
  const product = productList.find((product) => product.id === Number(id));
  return product;
}

export function adjustCart(id, action) {
  const item = findExistingItem(id);
  const cart = getCart();
  const indexOfItem = cart?.findIndex((candy) => candy.id === Number(id));
  console.log("item: ", item);

  if (action === "add") {
    item.amount++;
    item.totalCost = item.price * item.amount;
  } else {
    item.amount--;
    item.totalCost = item.price * item.amount;
  }
  
  if(item.amount == 0){
    removeFromCart(Number(item.id))
  }else {
    cart?.splice(indexOfItem, 1, item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
}

export function removeFromCart(id:number){
  const cart = getCart();
  cart?.forEach((candy, index)=>{
    if(candy.id === id){
      const indexOfCandy = cart.findIndex((candy)=> candy.id === id)
      console.log("indexOfCandy: ",indexOfCandy)
      cart.splice(indexOfCandy, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  })
}

//DEN FUNGERAR 🧹 Städa bara uppp -> fungerar med dummy data
// Ta emot id:, image:, name: , price, stock:
export function addProductShoppingCart(product: ProductItem) {
  const item = findExistingItem(product.id);

  //validera att det är av findExistingItem
  if (item) {
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
  console.log("removeProductShoppingCart | product", product) //Innehåller data 
  const item = findExistingItem(product.id); // <- SÅ HÄR BLIR DET FEL
  console.log("item: ", item)// item innehåller inte data 

  if (item) {
    // Loopar  igen vår array och hittar rätt objekt och uppdaterar det
    cart.forEach((candyItem: CartItem, index) => {
      console.log(candyItem.amount);
      if (candyItem.id === item.id && candyItem.amount !== 1) {
        candyItem.amount--;
        candyItem.totalCost = candyItem.price * candyItem.amount;
        cart.splice(index, 1, candyItem);
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
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
    return cart = [];
  }
}

function findExistingItem(id) {
  const cartJSON = localStorage.getItem("cart");
  if (cartJSON) {
    cart = JSON.parse(cartJSON);
    const found = cart.find((candy) =>   candy.id == id);
    return found;
  } else {
    return undefined;
  }
}
