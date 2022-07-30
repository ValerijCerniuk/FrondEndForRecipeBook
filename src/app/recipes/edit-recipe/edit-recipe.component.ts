import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from '../../_services/recipes.service';
import { RecipesStage } from '../../models/recipes-stage';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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
    private recipeService: RecipesService,
    private activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

 

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.recipeId = params.get('recipeId'); 
  });
  this.getRecipeById(this.recipeId)
  }

  ngOnChanges(){
    
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

  save() {
    console.warn(this.recipeForm.value);
    this.curentRecipe = this.recipeForm.value;
    if (this.curentRecipe !== undefined) {
      this.recipeService.updateRecipe(this.curentRecipe).subscribe((results) => { this.curentRecipe = results })
    }
  };

  saveStade(){

  }

    /**

   * Write code on Method

   *

   * @return response()

   */

     open(content:any) {

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
  
    } 
  
      
  
    /**
  
     * Write code on Method
  
     *
  
     * @return response()
  
     */
  
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
