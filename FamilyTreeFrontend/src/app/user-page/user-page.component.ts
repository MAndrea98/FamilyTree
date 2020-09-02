import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login-service';
import { User } from '../_model/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService) { }

  user: User;

  ngOnInit(): void {
    if (localStorage.getItem('user')==null) {
      alert('Illegal path');
      location.href="";
    }
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
}
