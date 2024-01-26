type Product = {
    id: number;
    productCategory: string;
    name: string;
    brand: string;
    description: string;
    basePrice: number;
    inStock: boolean;
    stock: number;
    featuredImage: string;
    thumbnailImage: string;
    storageOptions: string[];
    colorOptions: string[];
    display: string;
    CPU: string;
    GPU: string;
  };


export default Product;