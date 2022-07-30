import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from '../../_services/recipes.service';
import { RecipesStage } from '../../models/recipes-stage';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditStageModalComponent } from 'src/app/shared/modals/edit-stage-modal/edit-stage-modal.component';


@Component({
  selector: 'edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  closeResult: string | undefined;

  curentRecipe: Recipe = {} as Recipe;
  recipeId?: any;
  currDiv?: string;
  currentStage?: RecipesStage = {} as RecipesStage;

  recipeStage?: RecipesStage = {} as Recipe;

  recipeForm = new FormGroup({
    name: new FormControl(this.curentRecipe.name, [
      Validators.required,
      Validators.maxLength(40)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),

  });

  


  constructor(
    private recipeService: RecipesService,
    private activatedroute: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

 

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.recipeId = params.get('recipeId'); 
  });
 this.getRecipeById(this.recipeId)
  }


  showDiv(divVal: string, stage: RecipesStage) {
    this.currDiv = divVal;
    this.currentStage = stage
}

  getRecipeById(data: any): void {
    this.recipeService.getRecipeById(data).subscribe(
      (data) => {
        this.curentRecipe = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
// isiaiskint kopdel ir kaip kveciasi  funkcija
  save() {
    console.warn(this.recipeForm.value);
    this.curentRecipe = this.recipeForm.value;
    if (this.curentRecipe !== undefined) {
      this.recipeService.updateRecipe(this.curentRecipe).subscribe((results) => { this.curentRecipe = results })
    }
  };

  saveStade(){

  }

    openModal() {
      
      const modalRef = this.modalService.open(EditStageModalComponent,
        {
          scrollable: true,
          // windowClass: 'myCustomModalClass',
          // keyboard: false,
          backdrop: 'static'
        });
  
modalRef.componentInstance.recipeStage = this.currentStage;
  
      modalRef.result.then((result) => {
        console.log(result);
      }, (reason) => {
      });
    }
  
    private getDismissReason(reason: any): string {
  
      if (reason === ModalDismissReasons.ESC) {
  
        return 'by pressing ESC';
  
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
        return 'by clicking on a backdrop';
  
      } else {
  
        return  `with: ${reason}`;
  
      }
  
    }
}
