import './style.css'
import { fetchAllproducts, renderProducts, renderFetchedProducts } from './getProductTwo'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div>
  <h1>The file is clean 🛀🏽</h1>
  </div>
`

fetchAllproducts();
console.log(fetchAllproducts);

renderProducts();
console.log(renderProducts);

renderFetchedProducts();
console.log(renderFetchedProducts)

