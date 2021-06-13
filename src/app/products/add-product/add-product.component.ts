import { Component, OnInit } from '@angular/core';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  ngOnInit(): void {
  }


  constructor(private readonly productsStore: ProductsStore) {}


  onAddPost(post){
    console.log("????")
    this.productsStore.add$(post.value)
  }
}
