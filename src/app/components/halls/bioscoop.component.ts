import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bioscoop } from '../../models/bioscoop.model';
import { BioscoopService } from '../../services/bioscoop.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bioscoop',
  templateUrl: './bioscoop.component.html'
})
export class BioscopenComponent implements OnInit, OnDestroy {
  bioscopen: Bioscoop[];
  private subscription : Subscription;
  constructor(private slService: BioscoopService) { }

  ngOnInit() {
        this.slService.getBioscopen()
          .then((bioscopen) => {
            this.bioscopen = bioscopen
          }
        );
        this.subscription = this.slService.bioscopenChanged
        .subscribe(
          (bioscopen: Bioscoop[]) => {
            this.bioscopen = bioscopen;
          }
        );
      }

  onEditItem(id:number){
    console.log("dit id klik je aan : " + id);
    this.slService.startedEditing.next(id);
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
}