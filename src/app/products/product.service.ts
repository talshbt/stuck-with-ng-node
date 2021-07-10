import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Page } from './page.model';
import { Product } from './product.model';
import { ProductsStore } from './store/products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$ = this.productsStore.products$;
  pageData: Page;
  private productsUpdated = new Subject<any>();


  constructor(
    private readonly productsStore: ProductsStore,
    private http: HttpClient,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  getProducts(pageData) {
    this.productsStore.getIsLoading$(true);
    this.pageData = pageData ?? this.pageData;
    let params = new HttpParams();
    params = params.append('pageIndex', this.pageData.pageIndex.toString());
    params = params.append('pageSize', this.pageData.pageSize.toString());
    return this.http
      .get<{ message: string; products: any; productsLens: number }>(
        'http://localhost:3000/api/products',
        { params: params }
      )
      .pipe(
        map((postData) => {
          const products = postData.products.map((product) => {
            return {
              title: product.title,
              content: product.content,
              id: product._id,
              imagePath: product.imagePath,
            };
          });
          const numberOfProducts = postData.productsLens;

          return {
            products: products,
            numberOfProducts: postData.productsLens,
          };
        })
      ).pipe(
        finalize(() => {
          this.productsStore.getIsLoading$(false);
        })
      )
      .subscribe((newPostData) => {
        this.productsStore.getProducts$(newPostData.products);
        this.productsStore.getNumberOfProducts$(newPostData.numberOfProducts)
        // this.prod
      });
  }

  addProduct(product) {
    //combine blob and text values
    console.log(product);
    let postData;
    if (typeof product.image == 'object') {
      postData = new FormData();
      console.log('upload new file');
      postData.append('title', product.title);
      postData.append('content', product.content);
      postData.append('image', product.image, title);
      postData.append('id', product.id);
    } else {
      postData = {
        id: product.id,
        title: product.title,
        content: product.content,
        imagePath: product.image,
      };
      console.log('same file');
    }
    return this.http
      .post<{ message: string; productId: string }>(
        'http://localhost:3000/api/products',
        postData
      )
      .pipe(
        map((responseData) => {
          console.log(responseData);
          this.getProducts(null);
          this.router.navigate(['/'], { relativeTo: this.route });
        })
      );
  }

  removeProduct(productId) {
    this.http
      .delete('http://localhost:3000/api/products/' + productId)
      .subscribe(() => {
        this.getProducts(null);
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
    return this.http
      .put<{ message: string; product: any }>(
        'http://localhost:3000/api/products/' + productId,
        product
      )
      .pipe(
        map((productData) => {
          this.getProducts(null);
          this.router.navigate(['/'], { relativeTo: this.route });
        })
      );
  }
}
