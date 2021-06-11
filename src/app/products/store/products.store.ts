import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../product.model";

export interface ProductsState  {
  products: Product[];
}


@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState> {
  constructor() {
    super({products: []});

  }

  // readonly products$: Observable<Product[]> = this.select(state => state.products);
  readonly add$ = this.updater(
      (state: ProductsState, product: Product) => {
         state.products.push(product)

          return {
              ...state,
               products: state.products,
          };
      }
  );
  readonly products$: Observable<any> = this.select((state) => state.products);



  // readonly add = this.updater((state, product) => ({ products$: state.products.push(product) }));



}
