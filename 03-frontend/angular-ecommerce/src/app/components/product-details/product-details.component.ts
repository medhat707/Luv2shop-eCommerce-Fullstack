import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product: Product = new Product();
  categoryId!: number;
  // categoryId: number ;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute
              ){}

  ngOnInit():void{
    this.categoryId = +this.route.snapshot.paramMap.get('catId')!;

    this.route.paramMap.subscribe(() => 
    this.handleProductDetails()
  )
  }


  handleProductDetails(): void {
    // get id param string and convert it into a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;
      }
    )
    
  }


  addToCart(theProduct: Product){

    // log theProduct data
    console.log(`product name: ${theProduct.name} , product price = ${theProduct.unitprice}`);

    // create an object of cartItem
    let theCartItem = new CartItem (theProduct);
    // call the method addToCart on the cart-status service
    this.cartService.addToCart(theCartItem);

  }

}
