
export default function navBar(){
    const content:string =`<nav><p>CandyShop</p> <i class="bi bi-cart2"></i>
  </nav>
  <button><i class="bi bi-cart-plus"></i>Lägg i varukorg</button>
`
    return content
}

navBar()

export function addListenerCart(){
    const shoppingCart = document.querySelector("nav > i");
    shoppingCart?.addEventListener("click",  (event)=>{
        console.log("Öppna vart vid klick")
    })
    
}



async function getAllProducts(){
const res  =  await fetch("http://www.bortakvall.se/api/v2/products")
const data = await res.json();
console.log("data: ",  data);
}
getAllProducts();

//placera i main ev
// if(navBar()){
//     addListenerCart();
//     console.log("kör listenOnCart")
//   }