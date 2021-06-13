import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsStore } from './store/products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$ = this.productsStore.products$;

  constructor(
    private readonly productsStore: ProductsStore,
    private http: HttpClient,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  getProducts() {
    return this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map((product) => {
            return {
              title: product.title,
              content: product.content,
              id: product.id,
            };
          });
        })
      )
      .subscribe((products) => {
        console.log(products);
        this.productsStore.getProducts$(products);
      });
  }

  addProduct(product: Product) {
    this.http
      .post<{ message: string; productId: string }>(
        'http://localhost:3000/api/products',
        product
      )
      .subscribe((responseData) => {
        const id = responseData.productId;
        this.getProducts();
        this.router.navigate(['/'], { relativeTo: this.route });
      });
  }

  removeProduct(productId) {
    this.http
      .delete('http://localhost:3000/api/products/' + productId)
      .subscribe(() => {
        this.getProducts();
      });
  }

  getProduct(productId: string) {
    return this.http
      .get<{ message: string; product: any }>(
        'http://localhost:3000/api/products/' + productId
      )
      .pipe(
        map((productData) => {
          return productData.product;
        })
      );
  }

  editProduct(productId: string, product: Product) {
    return this.http
      .put<{ message: string; product: any }>(
        'http://localhost:3000/api/products/' + productId,
        product
      ).subscribe(data=>{
        this.getProducts();
        this.router.navigate(['/'], { relativeTo: this.route });
      })

  }
}
