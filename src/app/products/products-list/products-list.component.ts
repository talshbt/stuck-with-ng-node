import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../product.model';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products$ = this.productsStore.products$;
  productsPerPage = 2;
  // dropdown for user to select products per page
  pageSizeOptions = [1, 2, 5, 10]
  constructor(private readonly productsStore: ProductsStore) {
  }

  ngOnInit(): void {
  }

  onChangePage(pageData: PageEvent){
    console.log(pageData)
  }

}
