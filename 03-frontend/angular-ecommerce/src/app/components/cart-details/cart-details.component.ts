import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})

// subscribe to the data from the cartService.ts
export class CartDetailsComponent {

  theCartItems: CartItem[] =[];
  theTotalPrice: number =0;
  theTotalQuantity: number=0;

  constructor(private theCartService: CartService , 
    private route: ActivatedRoute
   ){}

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
    this.listCartItems();
    });
  }



  listCartItems(){

    // assign the cartService.cartItems to the parameter
    this.theCartItems = this.theCartService.theCartItems;

    this.theCartService.totalPrice.subscribe(
      data => this.theTotalPrice = data
    );

    this.theCartService.totalQuantity.subscribe(
      data => this.theTotalQuantity = data
    );

    //compute total price
    this.theCartService.computeCartTotal();
  }

  incremetQuantity(tempCartItem:CartItem){
    this.theCartService.addToCart(tempCartItem);
  }

  decrementQuantity(tempCartItem){
    this.theCartService.decrementQuantity(tempCartItem);

  }

  remove(tempCartItem){
    this.theCartService.remove(tempCartItem)
  }
  
}
