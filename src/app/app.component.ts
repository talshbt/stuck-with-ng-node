import { Component } from '@angular/core';
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
    this.productService.getProducts();
    // this.productService.getProducts().subscribe(products=>{
    //   // console.log(products)
    //  this.productsStore.getProducts$(products);
    // })
  }
}
