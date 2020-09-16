import { Component, OnInit, ViewChild, ElementRef, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { LoginService } from '../_services/login-service';
import { User } from '../_model/user';
import { FamilyTree } from '../_model/family-tree';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { TreesComponent } from './trees/trees.component';
import { UserDataComponent } from './user-data/user-data.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild('homes') homes: ElementRef;

  constructor(private service: LoginService, private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector, 
    private appRef: ApplicationRef,
    private renderer: Renderer2) { }

  user: User;
  userProfileHidden: Boolean = true;
  treeHidden: Boolean = true;
  homeHidden: Boolean = true;
  selectedTree: FamilyTree;
  familyTreeHidden: Boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
    this.userProfileHidden = true;
    this.homeHidden = false;
  }

  hiddenAll(): void {
    this.userProfileHidden = true;
    this.treeHidden = true;
    this.homeHidden = true;
    this.familyTreeHidden = true;
  }

  home(): void {
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
    const childElements = this.homes.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.homes.nativeElement, child);
    }
    if (this.selectedTree.id != 0) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FamilyTreeComponent); 
      const componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);  
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      const element: HTMLElement = document.createElement('div');
      element.appendChild(domElem); 
      this.homes.nativeElement.appendChild(element);
      this.homes.nativeElement.style.background = "rgb(255, 255, 255)";
    }
    else {
      this.homes.nativeElement.style.background = "url('../../assets/images/tree.jpg') no-repeat center";
    }
  }

  logout(): void {
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.service.logout(this.user).subscribe(
      res=>{
        location.href="";
        localStorage.removeItem('user');
        localStorage.removeItem('selectedTree');
      },
      err=>{
        console.log(err);
        alert('Something went wrong');
      }
    )
  }

  settings(): void {
    const childElements = this.homes.nativeElement.childNodes;
    for (let child of childElements) {
      this.renderer.removeChild(this.homes.nativeElement, child);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserDataComponent); 
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);  
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const element: HTMLElement = document.createElement('div');
    element.appendChild(domElem); 
    this.homes.nativeElement.appendChild(element);
    this.homes.nativeElement.style.background = "rgb(255, 255, 255)";
  }

  trees(): void {
    const childElements = this.homes.nativeElement.childNodes;
    for (let child of childElements) {
      this.renderer.removeChild(this.homes.nativeElement, child);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TreesComponent); 
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);  
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const element: HTMLElement = document.createElement('div');
    element.appendChild(domElem); 
    this.homes.nativeElement.appendChild(element);
    this.homes.nativeElement.style.background = "rgb(255, 255, 255)";
  }

}
