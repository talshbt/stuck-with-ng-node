import { Component, OnInit } from '@angular/core';
import { ProductsStore } from './store/products.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsStore],
})
export class ProductsComponent implements OnInit {


  ngOnInit(): void {
  }
  products$ = this.productsStore.products$;

  constructor(private readonly productsStore: ProductsStore) {}



}
