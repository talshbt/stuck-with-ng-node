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
  isLoading$ = this.productsStore.isLoading$;

  totalProducts = 0;
  currentPage = 1;
  productsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  // isLoading = false;

  constructor(private readonly productsStore: ProductsStore,  private productService: ProductService,
    ) {
  }

  ngOnInit(): void {
    // this.isLoading = true;
    let newPageData: Page = {pageIndex: this.currentPage, pageSize: this.productsPerPage};
    this.productService.getProducts(newPageData);
  }

  onChangePage(pageData: PageEvent){
    let newPageData : Page = {pageIndex: pageData.pageIndex, pageSize: pageData.pageSize};
    this.productService.getProducts(newPageData);
  }

}
