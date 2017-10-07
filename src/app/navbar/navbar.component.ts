import { AuthService } from './../services/user/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    
    public get isLoggedIn(): boolean {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else {
            return false;
        }
    }

    public get userName(): string {
        return 'Ando';
    }

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    public signOut(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }

}
