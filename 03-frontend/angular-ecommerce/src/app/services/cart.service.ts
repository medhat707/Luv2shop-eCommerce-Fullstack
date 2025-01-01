import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {

  // empty array of CartItem objects
  theCartItems: CartItem[] =[];
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);


  constructor() { }



  // implement the method addToCart
  // we need to keep track of the total quantity and totalprice
    
  addToCart(cartItem: CartItem){

    let alreadyExists : boolean = false;
    let existingCartItem: CartItem = undefined;

    // check if the list is not empty
    if(this.theCartItems.length>0){

      /* OLD CODE

      - check if the same item already exists in the shopping cart
      - assign item in the tempCartItem to the existingCartItem property
      - NOTE: here we've to loop through all array items and we break loop if we found the element
      - BETTER: to use array.find to minimize code
      -------------------------------------------
       OLD CODE
        for(let tempCartItem of this.theCartItems){ 
        if(cartItem.id == tempCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      } 
      -------------------------------------------
       */

  
      /* NEW CODE
      - array.find(currentArrayElement => (condition)); returns the first element if the condition is true 
      - if condition is true for arrayElement return it
      - NOTE: if cartItems[] has currentArrayElement existing .. we check if the item we're adding == currentArrayElement
      - if yes, return arrayElement 
      - Else: then arrayElement = undefined
      - GOAL: This way we minimized our code - using only one line of code instead of the for loop
       */

      existingCartItem = this.theCartItems.find(currentItem => (currentItem.id == cartItem.id));


      // increase the quantity of the existingCartItem
      alreadyExists = (existingCartItem!= undefined);
  }

    if(alreadyExists){
    existingCartItem.quantity ++;
    } else{
      this.theCartItems.push(cartItem);
    }
    
    // display the total price and total quantity - implement method for that
    this.computeCartTotal();

    
  }


  // for calculating the total price and total quantity of cartItems
  computeCartTotal() {
    let theTotalPriceValue : number =0;
    let theTotalQuantityValue: number = 0;

    //loop over all theCartItems and compute their total quantity and price
    for(let currentItem of this.theCartItems){
      theTotalPriceValue += currentItem.unitPrice * currentItem.quantity;
      theTotalQuantityValue += currentItem.quantity;
    }

    // send them to the subscribers
    this.totalPrice.next(theTotalPriceValue);
    this.totalQuantity.next(theTotalQuantityValue);

    // log cart data
    this.logCartData(theTotalPriceValue, theTotalQuantityValue)

  }

  logCartData(theTotalPriceValue: number, theTotalQuantityValue: number) {
    console.log(`contents of the cart`);
    for(let tempCartItem of this.theCartItems){
      const subTotalPrice = tempCartItem.unitPrice * tempCartItem.quantity;
      console.log(`name: ${tempCartItem.name} , quantity=${tempCartItem.quantity} , unitPrice=${tempCartItem.unitPrice} , subTotalPrice=${subTotalPrice}`);

    }

    console.log(`totalPrice= ${theTotalPriceValue.toFixed(2)}`)
  }


  decrementQuantity(theCartItem :CartItem){

    theCartItem.quantity --;

    // if quantity ==0 remove it
    if(theCartItem.quantity ==0){
      this.remove(theCartItem);
    }

    this.computeCartTotal();
  }

  remove(theCartItem: CartItem){

    /*
    cartItems[] array contains the element of which we delete its quantity and other objects
    so our check must apply only for the element we decrement its quantity or if the array itself is empty
    get hold of the index of the item to be deleted and delete it 
    */

    const index= this.theCartItems.indexOf(theCartItem, 0);
    if(index>-1){
      this.theCartItems.splice(index,1);
      this.computeCartTotal();
    }

  }
}






