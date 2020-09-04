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
  @ViewChild('username') username: ElementRef;
  @ViewChild('oldPassword') oldPassword: ElementRef;
  @ViewChild('newPassword') newPassword: ElementRef;
  @ViewChild('repeatPassword') repeatPassword: ElementRef;
  @ViewChild('email') email: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService) { }

  user: User;
  userProfileHidden: Boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      alert('Illegal path');
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
    this.userProfileHidden = true;
  }

  home(): void {
    this.userProfileHidden = true;
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
        alert('Something went wrong');
      }
    )
  }

  change(): void {
    var u:User = new User();
    u.username = this.username.nativeElement.value;
    u.password = this.newPassword.nativeElement.value;
    u.repeatPassword = this.repeatPassword.nativeElement.value;
    u.email = this.email.nativeElement.value;
    var oldPas: string = this.oldPassword.nativeElement.value
    this.service.changeDate(u, oldPas).subscribe(
      (res: User)=> {
        localStorage.setItem('user', JSON.stringify(res));
        this.user = res;
        this.newPassword.nativeElement.value = "";
        this.repeatPassword.nativeElement.value = "";
        this.oldPassword.nativeElement.value = "";
        this.home();
      },
      err=> {
        alert('Something went wrong');
      }
    )

  }

  settings(): void {
    this.userProfileHidden = false;
  }

}
