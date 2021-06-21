import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productId: string = null;
  product: Product = null;
  isLoading = false;
  form: FormGroup;
  fileAttr: 'Choose Image';
  uploadImage = false;
  private subscriptions = new Subscription();
  imagePreview: string;

  ngOnInit(): void {
    this.createFormGroup();
    this.handleAction();
  }

  private createFormGroup() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null , {validators:[Validators.required] , asyncValidators: [mimeType]}),
    });
  }

  private handleAction() {
    this.subscriptions.add(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('productId')) {
          this.isLoading = true;
          this.productId = paramMap.get('productId');
          this.subscriptions.add(
            this.productService
              .getProduct(this.productId)
              .pipe(finalize(() => (this.isLoading = false)))
              .subscribe((product) => {
                this.product = product;
                this.form.setValue({
                  title: product?.title,
                  content: product?.content,
                  image: null,
                });
              })
          );
        } else {
          this.productId = null;
          this.product = null;
        }
      })
    );
  }

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddProduct() {

    if (this.form.valid) {
      this.isLoading = true;
      this.subscriptions.add(
        this.productService
          .addProduct({
            id: this.productId,
            title: this.form.value.title,
            content: this.form.value.content,
            image: this.form.value.image,
          })
          .pipe(finalize(() => {
            this.isLoading = false
          }))
          .subscribe((responseData) => {
            this.isLoading = false;
          })
      );

    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadImage = true;
  }
}
