import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../_services/login-service';
import { User } from '../_model/user';
import { FamilyTree } from '../_model/family-tree';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild('homes') homes: ElementRef;

  constructor(private service: LoginService) { }

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
    this.hiddenAll();
    this.homeHidden = false;
    var tree = localStorage.getItem('selectedTree');
    this.selectedTree = JSON.parse(tree);
    if (this.selectedTree.id == 0) {
      this.homes.nativeElement.style.background = "url('../../assets/images/tree.jpg') no-repeat center";
    }
    else {
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

}
