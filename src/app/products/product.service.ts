import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { map } from 'rxjs/operators';
import { Page } from './page.model';
import { Product } from './product.model';
import { ProductsStore } from './store/products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$ = this.productsStore.products$;
  pageData : Page = {pageIndex: 0, pageSize: 2};

  constructor(
    private readonly productsStore: ProductsStore,
    private http: HttpClient,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  getProducts(pageData) {
    let params = new HttpParams();

    params = params.append('pageIndex', pageData.pageIndex);
    params = params.append('pageSize', pageData.pageSize);
    return this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/products',
        { params: params }
      )
      .pipe(
        map((postData) => {
          return postData.products.map((product) => {
            return {
              title: product.title,
              content: product.content,
              id: product._id,
              imagePath: product.imagePath,
            };
          });
        })
      )
      .subscribe((products) => {
        console.log(products);
        this.productsStore.getProducts$(products);
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
