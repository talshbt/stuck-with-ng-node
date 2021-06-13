import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private readonly productsStore: ProductsStore,
    public route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  onAddPost(post) {
    this.productService.addProduct(post.value);
    // this.productsStore.add$(post.value);
    // this.router.navigate(['/'], { relativeTo: this.route });
  }
}
