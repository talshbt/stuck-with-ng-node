import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../product.model";

export interface ProductsState  {
  products: Product[];
  currentId : string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState> {
  constructor() {
    super({products: [], currentId : '0'});
  }


  readonly getProducts$ = this.updater(
    (state: ProductsState, products: Product[]) => {
      state.products = products
        return {
            ...state,
             products: products,
        };
    }
);

  readonly add$ = this.updater(
      (state: ProductsState, product: Product) => {
        // state.currentId++;
        // product.id = state.currentId;
        state.products.push(product)
          return {
              ...state,
               products: state.products,
          };
      }
  );

  readonly remove$ = this.updater(
    (state: ProductsState, product: Product) => {
      var find = state.products.indexOf(state.products.find(prod=> prod.id === product.id))
       state.products.splice(find, 1)

        return {
            ...state,
             products: state.products,
        };
    }
);
  readonly products$: Observable<any> = this.select((state) => state.products);
  readonly currentId$: Observable<string> = this.select((state) => state.currentId);


}
