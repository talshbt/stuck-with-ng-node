import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  productId:string= null;
  product:Product= null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('productId')){
        this.productId = paramMap.get("productId");
        this.productService.getProduct(this.productId).subscribe(product=>{
          this.product = product;
        });
      }else{
        this.productId = null;
        this.product = null;
        console.log('create')
      }
    })
  }

  constructor(
    private productService: ProductService,
    public route: ActivatedRoute
  ) {}

  onAddPost(post) {
    this.productService.addProduct(post.value);
  }
}
