import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../common/product-category';


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
  // adding new name property that we'll read from the routerLink
  currentCategoryName: string = "";

  /*ch.7 Master view
  add products field
  */
  products: Product[] = [];

  // STEP3
  //NEW CODE 13.11 
  category: ProductCategory = new ProductCategory();
  

  //also injecting the activated route
  constructor(private productService: ProductService,
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

    //now get the products by category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );

  }

  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    //now get the products for the given category id
    this.productService.searchProducts(theKeyWord).subscribe(
      data => {
        this.products = data;
      }
    );

  }


  // STEP2
  //NEW CODE 13.11 

  handleCategoryName(): void {
    // get id param string and convert it into a number
    const theCategoryId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getCategory(theCategoryId).subscribe(
      data =>{
        this.category = data;
      }
    )
    
  }



}
