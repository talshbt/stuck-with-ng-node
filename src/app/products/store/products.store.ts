import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../product.model";

export interface ProductsState  {
  products: Product[];
  numberOfProducts: number;
  // currentId : string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsStore extends ComponentStore<ProductsState> {
  [x: string]: any;
  constructor() {
    super({products: [], numberOfProducts:0});
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

//   readonly add$ = this.updater(
//       (state: ProductsState, product: Product) => {
//         // state.currentId++;
//         // product.id = state.currentId;
//         state.products.push(product)
//           return {
//               ...state,
//                products: state.products,
//           };
//       }
//   );

//   readonly remove$ = this.updater(
//     (state: ProductsState, product: Product) => {
//       var find = state.products.indexOf(state.products.find(prod=> prod.id === product.id))
//        state.products.splice(find, 1)

//         return {
//             ...state,
//              products: state.products,
//         };
//     }
// );
  readonly products$: Observable<any> = this.select((state) => state.products);
  readonly numberOfProducts$: Observable<any> = this.select((state) => state.numberOfProducts);

  // readonly currentId$: Observable<string> = this.select((state) => state.currentId);


}
