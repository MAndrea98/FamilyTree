import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_model/user';
import { LoginService } from 'src/app/_services/login-service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('oldPassword') oldPassword: ElementRef;
  @ViewChild('newPassword') newPassword: ElementRef;
  @ViewChild('repeatPassword') repeatPassword: ElementRef;
  @ViewChild('email') email: ElementRef;

  constructor(private service: LoginService) { }

  user: User;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      location.href="";
    }
    var retrievedObject = localStorage.getItem('user');
    this.user = JSON.parse(retrievedObject);
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
      },
      err=> {
        console.log(err);
        alert('Something went wrong');
      }
    )

  }

}
