import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../page.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products$ = this.productsStore.products$;
  numberOfProducts$ = this.productsStore.numberOfProducts$;

  productsPerPage = 2;
  // dropdown for user to select products per page
  pageSizeOptions = [1, 2, 5, 10]
  constructor(private readonly productsStore: ProductsStore,  private productService: ProductService,
    ) {
  }

  ngOnInit(): void {
  }

  onChangePage(pageData: PageEvent){
    let newPageData : Page = {pageIndex: pageData.pageIndex, pageSize: pageData.pageSize};
    this.productService.getProducts(newPageData);
  }

}
