import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login-service';
import { User } from '../_model/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private service: LoginService) { }

  user: User;
  userProfileHidden: Boolean = true;
  treeHidden: Boolean = true;
  homeHidden: Boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.userProfileHidden = true;
    this.homeHidden = false;
  }

  hiddenAll(): void {
    this.userProfileHidden = true;
    this.treeHidden = true;
    this.homeHidden = true;
  }

  home(): void {
    this.hiddenAll();
    this.homeHidden = false;
  }

  logout(): void {
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.service.logout(this.user).subscribe(
      res=>{
        location.href="";
        localStorage.removeItem('user');
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
