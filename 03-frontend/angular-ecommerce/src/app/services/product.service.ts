import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8085/api/products';

  private categoryUrl = 'http://localhost:8085/api/product-category';

  constructor(private httpClient: HttpClient) { }

  //getting the product details (single product) .. image + description
  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    // for getting a single product
    return this.httpClient.get<Product>(productUrl);
  }

  // for the categoryCompoent (search by category) that retrieves data based on id
  //since backend URL performs a query statement: select p from products where category_id = ?
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  /*  ------------------- NOTE -------------------------
    For the method getProducts():
    we will make use of that method since it gets repeated in other methods that 
    also return an observable of list or products 
    --------------------------------------------------
  */
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // STEP1
  //NEW CODE 13.11 

    //getting the product details (single product) .. image + description
    getCategory(theCategoryId: number): Observable<Product> {

      // need to build URL based on product id
      const categoryUrl = `${this.categoryUrl}/${theCategoryId}`;
  
      // for getting a single product
      return this.httpClient.get<ProductCategory>(categoryUrl);
    }
  

    
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

