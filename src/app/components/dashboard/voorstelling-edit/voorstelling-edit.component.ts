import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy
  } from '@angular/core';
  
  import { Voorstelling } from '../../../models/voorstelling.model';
  import { VoorstellingService } from '../../../services/voorstelling.service';
  import { NgForm } from '@angular/forms';
  import { Subscription } from 'rxjs';
  
  @Component({
    selector: 'app-voorstelling-edit',
    templateUrl: './voorstelling-edit.component.html'
 })
  export class VoorstellingEditComponent implements OnInit, OnDestroy {
    @ViewChild("f") slForm: NgForm;
    subscription: Subscription;
    editMode: boolean = false;
    editedItemId: number;
    editedItem: Voorstelling;
  
    constructor(private slService: VoorstellingService) { }
  
    ngOnInit() {
  
      this.subscription = this.slService.startedEditing
        .subscribe(
          (id:number) => {
  
            this.editedItemId = id;
  
            this.editMode = true;
  
            this.slService.getVoorstellingen(id)
              .then( voorstelling => {
                this.editedItem = voorstelling
                this.slForm.setValue({
                  name : this.editedItem.name, 
                  description: this.editedItem.description,
                  imagePath: this.editedItem.imagePath
                })
              })
              .catch( error => console.log(error) );
            });
          };
    
  
    onSubmit(form: NgForm) {
      const value = form.value;
      const newVoorstelling = new Voorstelling(value.name, value.description, value.imagePath);
      if (this.editMode) {
        this.slService.updateVoorstelling(this.editedItemId, newVoorstelling);
      } else {
        this.slService.addVoorstelling(newVoorstelling);
      }
      this.editMode = false;
      form.reset();
    }
  
    onDelete() {
      this.slService.deleteVoorstelling(this.editedItemId);
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