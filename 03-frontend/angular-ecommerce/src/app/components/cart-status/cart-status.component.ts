import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {


  mytotalPrice :number =0;
  mytotalQuantity: number=0;

  constructor(private cartService: CartService){

  }

  ngOnInit(): void {

    this.handleCartService();
  }
  //subscribing to the data coming from the cart.service

  handleCartService(): void {

    /* 
   */
     this.cartService.totalPrice.subscribe(
       data =>{
         this.mytotalPrice = data;
       }
     )

     this.cartService.totalQuantity.subscribe(
      data =>{
        this.mytotalQuantity = data;
      }
    )
     
   }
 
}
