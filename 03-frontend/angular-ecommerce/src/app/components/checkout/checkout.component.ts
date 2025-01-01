import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';
import { CheckoutService } from '../../services/checkout.service';
import {Router } from '@angular/router';
import { Purchase } from '../../common/purchase';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutFromGroup: FormGroup;

  // adding the totalQuantity and totalPrice to display on the html page
  myTotalQuantity: number = 0;
  myTotalPrice: number = 0;

  // initializing an array of creditCartMonths and creditCardYears of type number
  myCreditCardMonths: number[] = [];
  myCreditCardYears: number[] = [];

  //initializing an array of type Country for countries population
  myCountries: Country[] = [];

  // initializing an array of type State for states population
  billingStates: State[] = [];
  shippingStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
    private cartservice: CartService,
    private luv2shopService: Luv2ShopFormService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkoutFromGroup = this.formBuilder.group({
      customer: this.formBuilder.group(
        {
          firstName: new FormControl('',
            [Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhiteSpace]),
          lastName: new FormControl('',
            [Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhiteSpace]),
          email: new FormControl('',
            [Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            Luv2ShopValidators.notOnlyWhiteSpace])
        }),

      shippingAddress: this.formBuilder.group({

        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),

        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),

        state: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),

        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),

        state: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace]),
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),

        nameOnCard: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2ShopValidators.notOnlyWhiteSpace]),

        cardNumber: new FormControl('', [Validators.required,
        Validators.pattern('[0-9]{16}')]),

        securityCode: new FormControl('', [Validators.required,
          Validators.pattern('[0-9]{3}')]),

        expirationMonth: [''],
        expirationYear: ['']
      })

    });

    this.reviewCartDetails();
    this.populateCardInformation();
    this.populateCountries()
  }


  // implementing getters and setters for form control customer, shippingAddress, billingAddress
  get firstName() { return this.checkoutFromGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFromGroup.get('customer.lastName'); }
  get email() { return this.checkoutFromGroup.get('customer.email'); }

  // shippingAddress form control
  get shippingAddressStreet() { return this.checkoutFromGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFromGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFromGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFromGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFromGroup.get('shippingAddress.zipCode'); }

  // billingAddress form control
  get billingAddressStreet() { return this.checkoutFromGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFromGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFromGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFromGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFromGroup.get('billingAddress.zipCode'); }

  // credit card form control
  get creditCardType() { return this.checkoutFromGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFromGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFromGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFromGroup.get('creditCard.securityCode'); }
  


  // event handler for handling the "purchase" button 
  onSubmit() {
    console.log(`Handling the submit button`);

    // upon clicking on submit button, all fields that are invalid must be cleared / lose focus
    // or if we click on purchase without filling the fields, then fields display the appropriate error
    if (this.checkoutFromGroup.invalid) {
      this.checkoutFromGroup.markAllAsTouched();
    }

    console.log(this.checkoutFromGroup.get(`customer`).value);
    console.log(`the shipping address country is ` + this.checkoutFromGroup.get(`shippingAddress`).value.country.name);
    console.log(`the shipping address state is ` + this.checkoutFromGroup.get(`shippingAddress`).value.state.name);

    // set up order
    let order = new Order();
    order.totalPrie = this.myTotalPrice;
    order.totalQuantity = this.myTotalQuantity;

    // get cart items
    const cartItems = this.cartservice.theCartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = [];
    for(let i=0 ; i<cartItems.length ; i++){
      orderItems[i] =  new OrderItem(cartItems[i]);
    }

    // set up purchase
    let purchase =  new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFromGroup.controls[`customer`].value;
    // populate purchase - shipping address
    purchase.shippingAddress   = this.checkoutFromGroup.controls[`shippingAddress`].value;
    const shippingState: State= JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry: Country= JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country= shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFromGroup.controls[`billingAddress`].value
    const billingState: State= JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry: Country= JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country= billingCountry.name;

    // populate purchase - order and orderItems
    purchase.orderItems = orderItems;
    purchase.order = order;
    // call REST API via the checkoutService
    this.checkoutService.placeOrder(purchase).subscribe(

      {
        next: response => {
          alert(`Your order has been received .\nOder tracking number: ${response.orderTrackingNumber}`)
          // reset cart
          this.resetCart();

        },
        error: err=>{
          alert(`There was an error: ${err.message}`)
        }
      }
    );

  }
  resetCart() {

    // reset cart data
    this.cartservice.theCartItems=[];
    this.cartservice.totalPrice.next(0);
    this.cartservice.totalQuantity.next(0);
    //reset the form
    this.checkoutFromGroup.reset();
    // navigate back to products page
    this.router.navigateByUrl("/products");
  
  }

  copyShippingAddressToBillingAddresse(event) {
    if (event.target.checked) {
      this.checkoutFromGroup.controls.billingAddress
        .setValue(this.checkoutFromGroup.controls.shippingAddress.value);

      this.billingStates = this.shippingStates;

    } else {
      this.checkoutFromGroup.controls.billingAddress.reset();
      this.billingStates = [];
    }

  }


  // subscribe to events for totalPrice and totalQuantity
  reviewCartDetails() {

    this.cartservice.totalPrice.subscribe(
      data => {
        this.myTotalPrice = data;
      }
    )

    this.cartservice.totalQuantity.subscribe(
      data => {
        this.myTotalQuantity = data;
      }
    )
  }


  populateCardInformation() {
    // subscribing to luv2ShopService to populate creditCardData
    // adding a field for startMonth
    const startMonth = new Date().getMonth() + 1;
    this.luv2shopService.getCreditCartMonths(startMonth).subscribe(
      data => {
        this.myCreditCardMonths = data;
      })


    this.luv2shopService.getCreditCartYears().subscribe(
      data => {
        this.myCreditCardYears = data;
      })
  }


  handleChangeOfYear() {

    // get hold of the creditCard form group
    const creditCardFormGroup = this.checkoutFromGroup.get('creditCard');

    //declare start month and read the selected year
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    let beginMonth: number;
    // check if currentYear = selectedYear
    if (currentYear === selectedYear) {
      //show only the currentMonths + remaning months
      beginMonth = new Date().getMonth() + 1;
    } else {
      beginMonth = 1;
    }

    this.myCreditCardMonths = [];

    // then subscribe to the data (return months array after passing the startMonth as a parameter)
    this.luv2shopService.getCreditCartMonths(beginMonth).subscribe(
      data => {
        console.log('AHMED MEDHAT ' + JSON.stringify(data));
        console.log('AHMED MEDHAT 22' + JSON.stringify(data));
        console.log(creditCardFormGroup);
        console.log(creditCardFormGroup?.value.expirationYear);
        console.log('AHMED MEDHAT 33 ' + selectedYear);
        console.log('AHMED MEDHAT 34 ' + currentYear);
        this.myCreditCardMonths = data;
        console.log('AHMED MEDHAT 55 ' + this.myCreditCardMonths);

      }
    )

  }


  populateCountries() {
    this.luv2shopService.getCountries().subscribe(
      data => {
        console.log(`Retrieving countries ` + JSON.stringify(data))
        this.myCountries = data;
      }
    )
  }


  // event handler for changing country - select state based on country
  chageCountry(formGroupName: string) {
    /* 
    * read from group name from the form
    * NOTE: we've 2 country fields in two form groups 1. shippingAddress 2. billingAddress
    * so we've to read the form group - pass it as a parameter to the function
    */
    const theFormGroupName = this.checkoutFromGroup.get(formGroupName);
    /* 
    * NOTE: we select state based on country code as per our RestAPI
    * http://localhost8085/api/states/search/findByCountryCode?code=($code)
    * so we should consider that when subscribing to the data
    * that means we've to read the country code from the form based on the formGroupName 
    * formGroupName = either 'shippingAddress' or 'billingAddress'
    */
    const theCountryCode = theFormGroupName.value.country.code;
    console.log(`this is the country code ... ` + theCountryCode);
    /* 
    * subscribe to the data
    * as usual we've to push the incoming data from the RestAPI into an empty array
    * so create an empty array for both biilingStates and shippingStates above of type State
    */
    this.luv2shopService.getStates(theCountryCode).subscribe(
      data => {
        console.log(`*********** DATA` + JSON.stringify(data))
        // check if we're at the shippingAddress, populate states there (subscribe to the data)
        if (formGroupName === 'shippingAddress') {
          this.shippingStates = data;
        } else {
          this.billingStates = data;
        }
        /* 
        * select first item by default
        * read the form group name e.g. 'shippingAddress' 
        * then set the value of the state to display the first state by default
        * e.g. DE has many states like Berlin, Hamburg. We select Berlin as first one
        */
        theFormGroupName.get('state').setValue(data[0]);
        console.log(`THese are my shipping STATES ` + this.shippingStates);

      });

  }

}