import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { TreesComponent } from './user-page/trees/trees.component';
import { UserDataComponent } from './user-page/user-data/user-data.component';
import { FamilyTreeComponent } from './user-page/family-tree/family-tree.component';
import { AddPersonComponent } from './user-page/add-person/add-person.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserPageComponent,
    TreesComponent,
    UserDataComponent,
    FamilyTreeComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [FamilyTreeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
