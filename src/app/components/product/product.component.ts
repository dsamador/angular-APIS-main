import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:''
    },
    description: ''
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();//enviamos solo el id para que el componente padre haga la request por id

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }

}
