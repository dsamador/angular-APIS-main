import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:''
    },
    description: ''
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Una descripcion',
      images: [''],
      price: 12,
      categoryId: 1
    }
    this.productsService.create(product).subscribe(
      data => {
        this.products.unshift(data);
      }
    )
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Nuevo title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id );
      this.products.splice(productIndex, 1);//con esto tambien eliminamos del render
      this.showProductDetail = false;
    });
  }

}
