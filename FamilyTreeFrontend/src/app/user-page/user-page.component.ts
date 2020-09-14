import { Component, OnInit, ViewChild, ElementRef, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../_services/login-service';
import { User } from '../_model/user';
import { FamilyTree } from '../_model/family-tree';
import { FamilyTreeComponent } from './family-tree/family-tree.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild('homes') homes: ElementRef;
  @ViewChild('welcome') welcome: ElementRef;

  constructor(private service: LoginService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector, 
    private appRef: ApplicationRef, 
    private render: Renderer2) { }

  user: User;
  userProfileHidden: Boolean = true;
  treeHidden: Boolean = true;
  homeHidden: Boolean = true;
  selectedTree: FamilyTree;
  familyTreeHidden: Boolean = true;
  addPersonHidden: Boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    this.userProfileHidden = true;
    this.hiddenAll();
    this.homeHidden = false;
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
  }

  hiddenAll(): void {
    this.userProfileHidden = true;
    this.treeHidden = true;
    this.homeHidden = true;
    this.familyTreeHidden = true;
    this.addPersonHidden = true;
  }

  home(): void {
    this.hiddenAll();
    this.homeHidden = false;
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
    if (this.selectedTree.id == 0) {
      this.homes.nativeElement.style.background = "url('../../assets/images/tree.jpg') no-repeat center";
      const childElements = this.homes.nativeElement.children;
      for (let child of childElements) {
        this.render.removeChild(this.homes.nativeElement, child);
      }
    }
    else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FamilyTreeComponent); 
      const componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);  
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      const element: HTMLElement = document.createElement('div');
      element.appendChild(domElem); 
      this.homes.nativeElement.appendChild(element);
      this.homes.nativeElement.style.background = "rgb(255, 255, 255)";
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
    this.hiddenAll();
    this.userProfileHidden = false;
  }

  trees(): void {
    this.hiddenAll();
    this.treeHidden = false;
  }

  addPerson(): void {
    this.hiddenAll();
    this.addPersonHidden = false;
  }

}
