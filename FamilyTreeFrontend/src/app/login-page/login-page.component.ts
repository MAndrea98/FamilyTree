import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../_services/login-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_model/user';
import { TestService } from '../_services/test-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('user') usern: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('repeat') repeat: ElementRef;
  @ViewChild('email') email: ElementRef;
  
  user: User;

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService, private testService: TestService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')!=null) {
      localStorage.removeItem('user');
    }
  }

  home(): void {
    this.home1();
    this.home2();
  }

  home1(): void {
    this.usern.nativeElement.value = "";
    this.pass.nativeElement.value = "";
  }

  home2(): void {
    this.username.nativeElement.value = "";
    this.password.nativeElement.value = "";
    this.repeat.nativeElement.value = "";
    this.email.nativeElement.value = "";
  }

  login():void {
    this.user = new User();
    this.user.username = this.usern.nativeElement.value;
    this.user.password = this.pass.nativeElement.value;
    this.service.login(this.user).subscribe(
      (res:User)=> {
        this.home();
        localStorage.setItem('user', JSON.stringify(res));
        location.href = "workspace";
      },
      err=> {
        alert('Something went wrong');
        this.home2();
      }
    )
    
  }

  signUp(): void {
    this.user = new User();
    this.user.username = this.username.nativeElement.value;
    this.user.password = this.password.nativeElement.value;
    this.user.repeatPassword = this.repeat.nativeElement.value;
    this.user.email = this.email.nativeElement.value;
    this.service.registration(this.user).subscribe(
      res=> {
        const element = document.getElementById('id01');
        element.style.display = 'block';
        this.home();
      },
      err=> {
        alert('Something went wrong');
        this.home1();
        if (!this.user.email.includes("@") || !this.user.email.includes(".")) {
          this.email.nativeElement.style.background = "rgba(255,0,0,.6)";
          setTimeout(() => {
            this.email.nativeElement.style.background = "rgba(255,255,255,.6)";
          }, 2000);
        }
        if (this.user.password != this.user.repeatPassword) {
          this.password.nativeElement.style.background = "rgba(255,0,0,.6)";
          this.repeat.nativeElement.style.background = "rgba(255,0,0,.6)";
          setTimeout(() => {
            this.repeat.nativeElement.style.background = "rgba(255,255,255,.6)";
            this.password.nativeElement.style.background = "rgba(255,255,255,.6)";
          }, 2000);
        }
      }
    )
  }

  test(): void {
    this.testService.test().subscribe(
      res => {
        alert(res);
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    )
  }

}
