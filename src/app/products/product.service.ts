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
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      ).subscribe(products=>{
        this.productsStore.getProducts$(products);
      })
  }

  addProduct(title: string, content: string) {
    const product: Product = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; productId: string }>(
        'http://localhost:3000/api/products',
        product
      )
      .subscribe((responseData) => {
        const id = responseData.productId;
        this.productsStore.add$(product);
        this.getProducts();
        this.router.navigate(['/'], { relativeTo: this.route });

      });
  }
}
