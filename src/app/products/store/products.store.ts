import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

export interface ProductsState  {
  products: Product[];
  currentId : number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState> {
  constructor(productService:ProductService) {
    super({products: [], currentId : 0});

  }

  // readonly products$: Observable<Product[]> = this.select(state => state.products);
  readonly add$ = this.updater(
      (state: ProductsState, product: Product) => {
        console.log('adddddd')
        state.currentId++;
        product.id = state.currentId;
        state.products.push(product)
          return {
              ...state,
               products: state.products,
          };
      }
  );

  readonly remove$ = this.updater(
    (state: ProductsState, product: Product) => {
      //  state.products.splice(product)
      var find = state.products.indexOf(state.products.find(prod=> prod.id === product.id))
       state.products.splice(find, 1)

        return {
            ...state,
             products: state.products,
        };
    }
);
  readonly products$: Observable<any> = this.select((state) => state.products);
  readonly currentId$: Observable<number> = this.select((state) => state.currentId);


}
