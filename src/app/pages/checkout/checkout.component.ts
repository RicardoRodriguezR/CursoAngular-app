import { ProductsService } from './../products/services/products.service';
import { Product } from './../products/Interface/product.interface';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { Order, Details } from './../../shared/interfaces/order.interface';
import { Store } from './../../shared/interfaces/stores.interface';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  };

  isDelivery = true;
  cart: Product[]=[];
  stores: Store[] = [
  ]
  constructor(
    private dataSvc: DataService,
    private ShoppingCartSvc: ShoppingCartService,
    private router: Router,
    private ProductsSvc: ProductsService
    ) { 
      this.checIfCartIsEmpty();
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value:boolean):void{
    this.isDelivery = value
  }

  onSubmit({value: formData}: NgForm):void{
    console.log('Guardar', formData);
    const data:Order = {
      ...formData,
      date:this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log('Order ->', res)),
      switchMap((order) => {
        const orderId = order.id;
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({ details, orderId });
      }),
      tap(res => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000), //Tiempo de espera 2seg
      tap(() => this.ShoppingCartSvc.resetCart()),
      //delay(3000, tap (() => this.router.navigate(['/products'])))
    )
    .subscribe();
  }

  private getStores():void {
    this.dataSvc.getStores()
    .pipe(
      tap((stors:Store[]) => this.stores = stors))
    .subscribe()
  }

  private getCurrentDay() {
    return new Date().toLocaleDateString();
  }

  private prepareDetails():Details[]{
    const details: Details[] = [];
    this.cart.forEach((product:Product) => {
      const { id:productId, name:productName, qty:quantity, stock }= product;
      const updateStock = (stock - quantity);

      this.ProductsSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() => details.push({ productId, productName, quantity }))
      )
      .subscribe();
    })
    return details;
  }

  private getDataCart():void{
    this.ShoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }
  //Metodo que me comprueba si el carrito esta bacio me redirije a la pagina de los productos.
  private checIfCartIsEmpty():void{
    this.ShoppingCartSvc.cartAction$.pipe(
      tap((products: Product[])=> {
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products'])
        }
      })
    ).subscribe()
  }

}
