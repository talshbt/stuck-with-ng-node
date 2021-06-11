import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;
  constructor(private readonly productsStore: ProductsStore) {}

  ngOnInit(): void {
  }

  onRemove(){
    this.productsStore.remove$(this.product)
  }
}
