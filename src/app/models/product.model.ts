export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

/* Con omit estamos diciendo cuales campos queremos que no se clonen */
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

//con partial todos los atributos son opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
