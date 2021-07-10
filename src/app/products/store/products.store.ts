import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../product.model";

export interface ProductsState  {
  products: Product[];
  numberOfProducts: number;
  isLoading :boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState> {
  [x: string]: any;
  constructor() {
    super({products: [], numberOfProducts:0,isLoading:false});
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
readonly getNumberOfProducts$ = this.updater(
  (state: ProductsState, numberOfProducts:number) => {
    state.numberOfProducts = numberOfProducts
      return {
          ...state,
          numberOfProducts: numberOfProducts,
      };
  }
);

readonly getIsLoading$ = this.updater(
  (state: ProductsState, isLoading:boolean) => {
    state.isLoading = isLoading
      return {
          ...state,
          isLoading: isLoading,
      };
  }
);

  readonly products$: Observable<any> = this.select((state) => state.products);
  readonly numberOfProducts$: Observable<any> = this.select((state) => state.numberOfProducts);
  readonly isLoading$: Observable<any> = this.select((state) => state.isLoading);

  // readonly currentId$: Observable<string> = this.select((state) => state.currentId);


}
