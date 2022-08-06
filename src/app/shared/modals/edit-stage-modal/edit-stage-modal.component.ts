import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeStage } from 'src/app/inerfaces/recipe-stage';



@Component({
  selector: 'edit-stage-modal',
  templateUrl: './edit-stage-modal.component.html',
  styleUrls: ['./edit-stage-modal.component.css']
})
export class EditStageModalComponent implements OnInit {

  @Input() recipeStage?: RecipeStage;
  
  stageForm = new FormGroup({
  
    instructionOrder: new FormControl(this.recipeStage?.instructionOrder, [
      Validators.required    
    ]), 
    instruction: new FormControl(this.recipeStage?.instruction, [
      Validators.required,
      Validators.maxLength(255)
    ]), 
  });
 

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.recipeStage);
    // Output:
    //  {prop1: "Some Data", prop2: "From Parent Component", prop3: "This Can be anything"}
    
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
