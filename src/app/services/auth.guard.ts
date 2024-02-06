import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private toast: NgToastService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      if (this.authService.isLoggedInGuard) {
        return true
      } else {
        this.toast.error({detail: "ERROR", summary: "Please Login first!", duration: 3000});
        this.router.navigate(['/login']);
        return false
      }
  }
  
}
