import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  userEmail: any;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {

    this.userEmail = JSON.parse (localStorage.getItem('user') ?? 'null' ).email;
    
  }

  onLogOut() {
    this.authService.logOut();
  }


  isLoggedIn() {
    return this.authService.loggedIn
  }
  
  loginBtn() {
    return this.authService.loginBtn
  }

}
