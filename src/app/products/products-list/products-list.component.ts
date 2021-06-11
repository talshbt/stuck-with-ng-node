import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products$ = this.productsStore.products$;
  constructor(private readonly productsStore: ProductsStore) {}

  ngOnInit(): void {
  }

}
