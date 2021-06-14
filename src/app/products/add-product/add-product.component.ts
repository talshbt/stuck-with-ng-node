import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productId: string = null;
  product: Product = null;
  isLoading = false;
  private subscriptions = new Subscription();

  ngOnInit(): void {


    this.subscriptions.add(
      this.route.paramMap

        .subscribe((paramMap: ParamMap) => {
          if (paramMap.has('productId')) {
            this.isLoading = true
            this.productId = paramMap.get('productId');
            this.subscriptions.add(
              this.productService
                .getProduct(this.productId)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe((product) => {
                  this.product = product;
                })
            );
          } else {
            this.productId = null;
            this.product = null;
          }
        }),

    );
  }

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddPost(form: NgForm) {
    if (form.valid) {
      if (this.product) {
        this.productService.editProduct(this.productId, form.value);
      } else {
        this.productService.addProduct(form.value);
      }
    }
  }
}
