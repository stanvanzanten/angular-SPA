import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Voorstelling } from '../models/voorstelling.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class VoorstellingService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/voorstellingen'; // URL to web api
  private voorstellingen: Voorstelling[] = [];
  
  voorstellingenChanged = new Subject<Voorstelling[]>();
  startedEditing = new Subject<number>();
  
  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getVoorstellingen(): Promise<Voorstelling[]> {
    console.log('voorstellingen ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.voorstellingen = response.json() as Voorstelling[];
        return this.voorstellingen;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getVoorstelling(index: number):Promise<Voorstelling> {
    console.log('voorstelling ophalen met id');
    return this.http.get(this.serverUrl + '/' + this.voorstellingen[index]._id, { headers: this.headers } )
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Voorstelling;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public deleteVoorstelling(index: number){
    console.log("Voorstelling verwijderen");
    this.http.delete(this.serverUrl + "/" + this.voorstellingen[index]._id)
      .toPromise()
      .then( () => {
        console.log("voorstelling verwijderd") 
        this.getVoorstellingen()
        .then(
          voorstellingen => {
            this.voorstellingen = voorstellingen
            this.voorstellingenChanged.next(this.voorstellingen.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addVoorstelling(voorstelling: Voorstelling) {
    console.log('voorstelling opslaan');
    this.http.post(this.serverUrl, { name: voorstelling.name, description: voorstelling.description, imagePath: voorstelling.imagePath })
      .toPromise()
      .then( () => {
        console.log("voorstelling toegevoegd")
        this.getVoorstellingen()
        .then(
            voorstellingen => {
                this.voorstellingen = voorstellingen
                this.voorstellingenChanged.next(this.voorstellingen.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

public updateVoorstelling(index: number, newVoorstelling : Voorstelling){
    console.log("voorstelling updaten");
    this.http.put(this.serverUrl + "/" + this.voorstellingen[index]._id, { name: newVoorstelling.name, description: newVoorstelling.description, imagePath: voorstelling.imagePath })
      .toPromise()
      .then( () => {
        console.log("voorstelling veranderd")
        this.getVoorstellingen()
        .then(
          voorstellingen => {
            this.voorstellingen = voorstellingen
            this.voorstellingenChanged.next(this.voorstellingen.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}