import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistamaMedicoOcupacionaApp';
  private isButtonVisible = true;
  public isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  Listar() {
    this.router.navigate(["list-paciente"]);
  }

  Nuevo() {
    this.router.navigate(["add-paciente"]);
  }

}
