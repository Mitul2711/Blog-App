import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  isLoggedInGuard: boolean = false;
  loginBtn: boolean = true;

  constructor(private afAuth: AngularFireAuth, private toast: NgToastService, private router: Router) { }

  login(email: any, password: any) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.toast.success({detail: 'SUCCESS', summary: "Logged in successfully..", duration: 3000})
      this.loadUser()
      this.loggedIn = true
      this.loginBtn = false
      this.isLoggedInGuard = true
      this.router.navigate([''])
    }).catch(e => {
      this.toast.error({detail: 'ERROR', summary: "Invalid UserName or PassWord", duration: 3000})
    })
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toast.success({detail: 'SUCCESS', summary: 'User logged out successfully..', duration: 3000})
      localStorage.removeItem('user')
      this.loggedIn = false
      this.loginBtn = true
      this.isLoggedInGuard = false
      this.router.navigate(['/'])
    })
  }

}
