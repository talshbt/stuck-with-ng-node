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
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(
        map((postData) => {
          return postData.products.map((product) => {
            return {
              title: product.title,
              content: product.content,
              id: product._id,
            };
          });
        })
      )
      .subscribe((products) => {
        this.productsStore.getProducts$(products);
      });
  }

  addProduct(product: Product) {

    console.log(product)
    return this.http
      .post<{ message: string; productId: string }>(
        'http://localhost:3000/api/products',
        product
      )
      .pipe(
        map((productData) => {
          console.log(productData)
          this.getProducts();
        })
      );
  }

  removeProduct(productId) {
    this.http
      .delete('http://localhost:3000/api/products/' + productId)
      .subscribe(() => {
        this.getProducts();
        this.router.navigate(['/'], { relativeTo: this.route });

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
    return this.http.put<{ message: string; product: any }>(
      'http://localhost:3000/api/products/' + productId,
      product
    ).pipe(
      map((productData) => {
        this.getProducts();
        this.router.navigate(['/'], { relativeTo: this.route });
      })
    );
  }
}
