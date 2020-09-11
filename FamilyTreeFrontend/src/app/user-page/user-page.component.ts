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

  change(): void {
    var u:User = new User();
    u.username = this.username.nativeElement.value;
    u.password = this.newPassword.nativeElement.value;
    u.repeatPassword = this.repeatPassword.nativeElement.value;
    u.email = this.email.nativeElement.value;
    var oldPas: string = this.oldPassword.nativeElement.value;
    if (oldPas == '' && u.password == '' && u.repeatPassword == '') {
      u.password = this.user.password;
      u.repeatPassword = this.user.password;
      oldPas = this.user.password;
    }
    
    this.service.changeDate(u, oldPas).subscribe(
      (res: User)=> {
        localStorage.setItem('user', JSON.stringify(res));
        this.user = res;
        this.newPassword.nativeElement.value = "";
        this.repeatPassword.nativeElement.value = "";
        this.oldPassword.nativeElement.value = "";
        const element = document.getElementById('modal');
        element.style.display = 'block';
        this.home();
      },
      err=> {
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
