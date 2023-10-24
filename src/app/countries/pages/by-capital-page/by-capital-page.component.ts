import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent  implements OnInit{

  public countries: Country[] = [];
  public isLoading:boolean = false;

  public InitialValue:string = '';


  constructor( private countriesService: CountriesService ) {}
  ngOnInit(): void {
    //esto es para que los datos se queden pegados ala pantalla
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.InitialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ):void  {

    this.isLoading = true;

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }

}
