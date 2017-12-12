import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Bioscoop } from '../models/bioscoop.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BioscoopService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/bioscopen'; // URL to web api
  private bioscopen: Bioscoop[] = [];
  
  bioscopenChanged = new Subject<Bioscoop[]>();
  startedEditing = new Subject<number>();
  
  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getBioscopen(): Promise<Bioscoop[]> {
    console.log('bioscopen ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.bioscopen = response.json() as Bioscoop[];
        return this.bioscopen;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getBioscoop(index: number):Promise<Bioscoop> {
    console.log('bioscoop ophalen met id');
    return this.http.get(this.serverUrl + '/' + this.bioscopen[index]._id, { headers: this.headers } )
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Bioscoop;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public deleteBioscoop(index: number){
    console.log("Bioscoop verwijderen");
    this.http.delete(this.serverUrl + "/" + this.bioscopen[index]._id)
      .toPromise()
      .then( () => {
        console.log("bioscoop verwijderd") 
        this.getBioscopen()
        .then(
          bioscopen => {
            this.bioscopen = bioscopen
            this.bioscopenChanged.next(this.bioscopen.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addBioscoop(bioscoop: Bioscoop) {
    console.log('bioscoop opslaan');
    this.http.post(this.serverUrl, { name: bioscoop.name, description: bioscoop.description })
      .toPromise()
      .then( () => {
        console.log("bioscoop toegevoegd")
        this.getBioscopen()
        .then(
            bioscopen => {
                this.bioscopen = bioscopen
                this.bioscopenChanged.next(this.bioscopen.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

public updateBioscoop(index: number, newBioscoop : Bioscoop){
    console.log("bioscoop updaten");
    this.http.put(this.serverUrl + "/" + this.bioscopen[index]._id, { name: newBioscoop.name, description: newBioscoop.description })
      .toPromise()
      .then( () => {
        console.log("bioscoop veranderd")
        this.getBioscopen()
        .then(
          bioscopen => {
            this.bioscopen = bioscopen
            this.bioscopenChanged.next(this.bioscopen.slice());
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