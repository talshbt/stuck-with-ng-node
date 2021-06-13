import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
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

  constructor(private readonly productsStore: ProductsStore, private productService:ProductService) {
    this.productService.getPosts().subscribe(products=>{
      console.log(products)
     this.productsStore.initProducts$(products)
    })
  }



}
