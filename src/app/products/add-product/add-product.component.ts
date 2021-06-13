import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  ngOnInit(): void {
  }


  constructor(private readonly productsStore: ProductsStore, public route: ActivatedRoute,  private router: Router) {}


  onAddPost(post){
    this.productsStore.add$(post.value)
     this.router.navigate(['/'], { relativeTo: this.route });

  }
}
