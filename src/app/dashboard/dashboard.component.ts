import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  constructor(private breakpointObserver: BreakpointObserver, private router:Router) {}

    
  Listar(){
    this.router.navigate(["list-paciente"]);
  }

  Nuevo(){
    this.router.navigate(["add-paciente"]);
  }

}
