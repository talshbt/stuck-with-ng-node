import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductsStore } from './store/products.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsStore],
})
export class ProductsComponent {
}
