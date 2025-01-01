import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../common/product-category';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-list',
  //   templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',

  styleUrl: './product-list.component.css'
})


export class ProductListComponent {

  //ch.6 search bar
  /*
  since in the router path we added an instance of productListComponent
  so here we have to enhance this component to allow the new feature to seach for products
  */


  searchMode: boolean = false;
  currentCategoryId: number = 1;
  previousCategoryId: number =1;

  // adding new name property that we'll read from the routerLink
  currentCategoryName: string = "";
  // initialize an empty array of products
  products: Product[] = [];
  //initializing pagination properties
  thePageNumber: number=1;
  thePageSize: number=10;
  theTotalElements: number=0;
  // track the previous keyword for pagination
  previousKeyword: string="";
  
  // STEP3
  //NEW CODE 13.11 
  category: ProductCategory = new ProductCategory();
  

  //also injecting the activated route
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // do additional configuration subscribe on the param map for that given route
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      this.handleCategoryName();
    });
  }


// Method for both searchComponent and categoriesComponent features 
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }

    else {
      this.handleListProducts();
    }
  }

/*  ------------------- NOTE ---------------------------------------------
  Modifying THE RouterLink TO PASS the categoryName along with the id
  2. read the categoryName from the routerLink
  -------------------------------------------------------------------------
*/

// Method for search by category
  handleListProducts() {
    
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // if it has this categoryId, get id and convert into a number using '+' sign
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
          // get the "name" param string
          this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

        }
    else {
      // return default category id of 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    } 

    /* Pagination for findByCategoryId
    NOTE: 
    if we've a different categoryId than previous
    then set thePageNumber back to 1
    */
    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId = ${this.currentCategoryId} , thePageNumber = ${this.thePageNumber}`)
    
    // Method for search by category
    //now get the products by category id
    this.productService.getProductListPaginate(this.currentCategoryId, 
                                              this.thePageNumber -1 ,   
                                               this.thePageSize).subscribe(
                                                                        data => {
                                                                           this.products = data._embedded.products;
                                                                           this.thePageNumber =  data.page.number+1;
                                                                           this.thePageSize = data.page.size;
                                                                           this.theTotalElements = data.page.totalElements;
                                                                          }
                                                                          );

  }


    
  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    // if we've a different keyword that the previous we set thePageNumber=1
    if(this.previousKeyword != theKeyWord){
      this.thePageNumber=1;
    }
    //now get the products for the given category id
    this.productService.searchProductListPaginate(theKeyWord, 
                                                this.thePageNumber -1 ,
                                                this.thePageSize).subscribe(
                                                                              data => {
                                                                                this.products = data._embedded.products;
                                                                                this.thePageNumber =  data.page.number+1;
                                                                                this.thePageSize = data.page.size;
                                                                                this.theTotalElements = data.page.totalElements;     
                                                                              }
    );

  }

  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber =1;
    this.listProducts();
  }


  // event handler for adding product.name and product.price to the shopping cart
  addToCart(theProduct: Product){
    console.log(` adding product to the cart ${theProduct.name}  , ${theProduct.unitprice}` );

    // TODO more work to do

    // defining a cart object
    let myCartItem = new CartItem(theProduct);
    // calling the addToCart() in the cart-status.service.ts 
    this.cartService.addToCart(myCartItem);

  }

  // STEP2
  //NEW CODE 13.11 

  handleCategoryName(): void {

   /* 
   we don't need additional code since the default this.currentCategoryId =1 
   so this code should return the first category 
   BUT if we clicked on a category name on the side bar menu this.currentCategoryId 
   changes based on the method handleListProducts() 
  */
    this.productService.getCategory(this.currentCategoryId).subscribe(
      data =>{
        this.category = data;
      }
    )
    
  }



}
