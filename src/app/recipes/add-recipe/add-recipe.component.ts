
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { RecipesService } from 'src/app/_services/recipes.service';
import { Recipe } from '../../inerfaces/recipe';


const apiUrl: string = 'http://localhost:8080/api/recipes/';

@Component({
  selector: 'add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})

export class AddRecipeComponent implements OnInit {
  recipeData: Recipe = {} as Recipe;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos: any;
  noMoreImage: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private fb: FormBuilder,
    private uploadService: FileUploadService
  ) {}

  recipeForm = this.fb.group({
    
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', Validators.required),
    photo1:new FormControl(''),
    photo2:new FormControl(''),
    ingredients: this.fb.array([]) as FormArray,
    recipeStages: this.fb.array([]) as FormArray,
  }) as FormGroup;

  createIngredientForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  createRecipeStageForm(): FormGroup {
    return this.fb.group({
      instructionOrder: new FormControl('', Validators.required),
      instruction: new FormControl('', Validators.required),
    });
  }

  get recipeStages() {
    return this.recipeForm.controls['recipeStages'] as FormArray;
  }
  get ingredients() {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  ngOnInit(): void {
    this.recipeForm = this.recipeForm;
  }

  addNewIngredientGroup() {
    this.ingredients.push(this.createIngredientForm());
  }

  addNewStageGroup() {
    this.recipeStages.push(this.createRecipeStageForm());
  }

  deleteStageFormGroup(index: number) {
    this.recipeStages.removeAt(index);
  }

  deleteIngredientFormGroup(index: number) {
    this.ingredients.removeAt(index);
  }

  removeEmptyStage() {
    let indexToRemove: any = [];

    this.recipeStages.controls.forEach((cotrol, index) => {
      if (!cotrol.value.instructionOrder) {
        indexToRemove.push(index);
      }
    });
    indexToRemove.reverse().forEach((index: any) => {
      this.recipeStages.removeAt(index);
    });
  }

  removeEmptyIngredient() {
    let indexToRemove: any = [];

    this.ingredients.controls.forEach((cotrol, index) => {
      if (!cotrol.value.name) {
        indexToRemove.push(index);
      }
    });
    indexToRemove.reverse().forEach((index: any) => {
      this.ingredients.removeAt(index);
    });
  }

  addProduct(): void {
    this.recipeData = this.recipeForm.value;
    if (this.recipeData) {
      this.recipesService.createRecipe(this.recipeData).subscribe({
        next: (res) => {
          console.log(res);
          if (res != null) {
            this.recipeForm.reset();
            this.removeEmptyIngredient();
            this.removeEmptyStage();
          }
        },
        error: (e) => console.error(e),
      });
    }
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        const fileUrl = reader.readAsDataURL(this.currentFile);
        if(this.recipeForm.controls['photo1'].value){
        this.recipeForm.setValue({photo1: fileUrl});
        } else {
          this.recipeForm.setValue({photo2: fileUrl});
        }

        if(this.recipeForm.controls['photo1'].value && this.recipeForm.controls['photo2'].value){
          this.noMoreImage = true;
        }
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
