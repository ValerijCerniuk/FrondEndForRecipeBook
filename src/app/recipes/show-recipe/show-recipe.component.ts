import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/inerfaces/recipe';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { RecipesService } from 'src/app/_services/recipes.service';

@Component({
  selector: 'show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css'],
})

export class ShowRecipeComponent implements OnInit {
  curentRecipe: Recipe = {} as Recipe;
  recipeId?: any;

  imageBlob1?: any;
  imageBlob2?: any;

  constructor(
    private sanitizer: DomSanitizer,
    private fileUpload: FileUploadService,
    private recipeService: RecipesService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.recipeId = params.get('recipeId');
    });

    this.getRecipeById(this.recipeId)
    this.setUpImages1();
    this.setUpImages2();


  }
  //  image part
  setUpImages1() {
    this.fileUpload.fetchRecipeImage('1')
      .subscribe((result: any) => {
        let objectURL = URL.createObjectURL(result);
        this.imageBlob1 = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }

  setUpImages2() {
    this.fileUpload.fetchRecipeImage('2')
      .subscribe((result: any) => {
        let objectURL = URL.createObjectURL(result);
        this.imageBlob2 = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }
  // recipe part
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

  deleteRecipeById(recipeId: number) {
    this.recipeService.delete(recipeId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (e) => console.error(e)
    });
  }

}
