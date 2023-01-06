import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    usuarioLogueado = false;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver, private router:Router) {}

  ngOnInit() {
    this.usuarioLogueado = this.authService.isLoggedIn('');
    this.authService.changeLoginStatus$.subscribe((loggedStatus: boolean) => {
      this.usuarioLogueado = loggedStatus;
    })
  }

  logout() {
    this.authService.logout();
  }


}