import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../common/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(
    private rotuer: Router){}


  ngOnInit(){

  }


  doSearch(value: string){
    //logging the value
    console.log(`value = ${value}`);
    this.rotuer.navigateByUrl(`/search/${value}`);

  }
}
