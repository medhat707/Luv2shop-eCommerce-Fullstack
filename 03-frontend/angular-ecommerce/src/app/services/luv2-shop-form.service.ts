import { Injectable } from '@angular/core';
// import { start, State } from '@popperjs/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// methods for retrieving current Month and current Year
//methods should return an observable so that we can subscribe to them using our checkoutComponent

export class Luv2ShopFormService {

  //define RestAPIs for country and State
  private countryUrl = 'http://localhost:8085/api/countries';
  private statesUrl =  "http://localhost:8085/api/states";

  constructor( private httpClient: HttpClient ) { }

  // we'll subscribe on this method in our checkoutComponent
  getCreditCartMonths(startMonth): Observable<number[]> {

  // creating an array of months
  let data: number[]=[];
  for(let currentMonth=startMonth; currentMonth<=12 ; currentMonth++){
    // push current month into the array
    data.push(currentMonth);
  }
  // to convert array into observable because components only subscribe to observable
  return of(data);
  }



  getCreditCartYears(): Observable<number[]> {

    // creating an array of months
    let data: number[]=[];
    const startYear = new Date().getFullYear();
    const endYear = startYear +10;
    for(let currentYear=startYear; currentYear<=endYear ; currentYear++){
      // push current month into the array
      data.push(currentYear);
    }
  
    return of(data);
    }


    // adding methods for getting the data from the RestAPI for country and state
    getCountries(): Observable<Country[]> {
       
        return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
          map(response => response._embedded.countries));
      
    }


    getStates(theCode: string): Observable<State[]>{

      const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCode}`;
      return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
        map(response => response._embedded.states));
    }



}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}


interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}