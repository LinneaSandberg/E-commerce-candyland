export interface Product {
    id: number
    name: string
    description: string
    price: number
    on_sale: boolean
    images: {
        thumbnail: string
        large: string
    }
    stock_status: string
    stock_quantity: number | null
    tags: Tag[]
}

interface Tag {
    id: number
    name: string
    slug: string
}

