export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stock_status: string;
  stock_quantity: number | null;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface PlaceOrder {
  name: string;
  adress: string;
  postnumber: number;
  city: string;
  telefon: number | null;
  epost: string;
}

export interface ProductItem {
  // Tar emot från Johan
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem extends ProductItem {
  //cartItem
  amount: number;
  totalCost: number;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  order_total: number;
  order_items: Item[];
}

interface Item {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

