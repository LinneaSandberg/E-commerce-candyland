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

//DEN FUNGERAR 🧹 Städa bara uppp -> fungerar med dummy data
// Ta emot id:, image:, name: , price, stock:
export function addProductShoppingCart(product: ProductItem) {
  adjustProductList(product.id, "remove")

  const item = findExistingItem(product);
  

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
  adjustProductList(product.id, "add")
  const item = findExistingItem(product);


  if (item) {

    // Loopar  igen vår array och hittar rätt objekt och uppdaterar det
    cart.forEach((candyItem: CartItem, index) => {
      console.log(candyItem.amount);
      if (candyItem.id === item.id && candyItem.amount !== 1) {
        candyItem.amount --;
        candyItem.totalCost = candyItem.price * candyItem.amount;
        cart.splice(index, 1, candyItem)

      }else{
        cart.splice(index, 1)
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });

  }
}

function adjustProductList(idOfCandy, action){
  const productList = JSON.parse(localStorage.getItem("productList"))
  const candyItme = productList.find((candy)=> {return candy.id === idOfCandy })

  console.log("candyItme :", candyItme)
  const indexOfCandy = productList.findIndex((candy)=> {return candy.id === idOfCandy})
  

    if(action === "remove"){
      candyItme.stock_quantity-- 
    }else{
      candyItme.stock_quantity++ 
    }
    console.log("candyObj: ", candyItme)
    productList.splice(indexOfCandy, 1, candyItme);
    localStorage.setItem("productList", JSON.stringify(productList));
  


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

  const cartJSON = localStorage.getItem("cart");
  if (cartJSON) {
    cart = JSON.parse(cartJSON);
    const found = cart.find((candy) => candy.id === product.id);
  return found;
  
  }else{
    console.log("else kördes")
    return undefined;
  }
}



