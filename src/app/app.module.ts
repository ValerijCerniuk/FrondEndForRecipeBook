import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import { ShowRecipeComponent } from './recipes/show-recipe/show-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { SortByPipe } from './shared/pipes/sort-by.pipe';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditStageModalComponent } from './shared/modals/edit-stage-modal/edit-stage-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    ShowRecipeComponent,
    AboutComponent,
    SortByPipe,
    EditStageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  
  ],
  providers: [SortByPipe,NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents:[
    EditStageModalComponent
  ],
})
export class AppModule { }
