import { Product } from './../Interface/product.interface';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick():void{
    this.addToCartClick.emit(this.product);
  }
}
