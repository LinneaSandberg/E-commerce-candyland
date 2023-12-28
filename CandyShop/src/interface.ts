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

export interface placeOrder {
  name: string;
  adress: string;
  postnumber: number;
  city: string;
  telefon: number | null;
  epost: string;
}
