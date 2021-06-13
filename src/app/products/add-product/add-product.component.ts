import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private productService: ProductService
  ) {}

  onAddPost(post) {
    this.productService.addProduct(post.value);
  }
}
