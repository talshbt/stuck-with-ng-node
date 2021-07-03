import { Component } from '@angular/core';
import { Page } from './products/page.model';
import { ProductService } from './products/product.service';
import { ProductsStore } from './products/store/products.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'post';

  ngOnInit(): void {}

  products$ = this.productsStore.products$;

  constructor(
    private readonly productsStore: ProductsStore,
    private productService: ProductService
  ) {
    let newPageData : Page = {pageIndex: 0, pageSize:2};

    this.productService.getProducts(newPageData);
    // this.productService.getProducts().subscribe(products=>{
    //   // console.log(products)
    //  this.productsStore.getProducts$(products);
    // })
  }
}
