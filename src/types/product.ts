export interface ProductItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductPayload {
  title: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  brand?: string;
  discountPercentage?: number;
  sku?: string;
  weight?: number;
  availabilityStatus?: string;
}
