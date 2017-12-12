import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy
  } from '@angular/core';
  
  import { Bioscoop } from '../../../models/bioscoop.model';
  import { BioscoopService } from '../../../services/bioscoop.service';
  import { NgForm } from '@angular/forms';
  import { Subscription } from 'rxjs';
  
  @Component({
    selector: 'app-bioscoop-edit',
    templateUrl: './bioscoop-edit.component.html'
 })
  export class BioscoopEditComponent implements OnInit, OnDestroy {
    @ViewChild("f") slForm: NgForm;
    subscription: Subscription;
    editMode: boolean = false;
    editedItemId: number;
    editedItem: Bioscoop;
  
    constructor(private slService: BioscoopService) { }
  
    ngOnInit() {
  
      this.subscription = this.slService.startedEditing
        .subscribe(
          (id:number) => {
  
            this.editedItemId = id;
  
            this.editMode = true;
  
            this.slService.getBioscoop(id)
              .then( bioscoop => {
                this.editedItem = bioscoop
                this.slForm.setValue({
                  name : this.editedItem.name, 
                  description: this.editedItem.description
                })
              })
              .catch( error => console.log(error) );
            });
          };
    
  
    onSubmit(form: NgForm) {
      const value = form.value;
      const newBioscoop = new Bioscoop(value.name, value.description);
      if (this.editMode) {
        this.slService.updateBioscoop(this.editedItemId, newBioscoop);
      } else {
        this.slService.addBioscoop(newBioscoop);
      }
      this.editMode = false;
      form.reset();
    }
  
    onDelete() {
      this.slService.deleteBioscoop(this.editedItemId);
      this.onClear();
    }
  
    onClear(){
      this.slForm.reset();
      this.editMode = false;
    }
  
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
    
  }