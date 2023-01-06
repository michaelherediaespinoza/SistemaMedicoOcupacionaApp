import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';

import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("inserUsuaer") inserUsuaer: ElementRef;

  form: FormGroup;
  loading: boolean = false;

  usuario: String;
  password: String;

  responseLogin: String;
  usuarios: Usuario[];

  routeRedirect = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  login() {

    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;

    this.authService.login();
    this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
    this.authService.urlUsuarioIntentaAcceder = '';
    console.log("URL.. " + this.routeRedirect);
    localStorage.setItem('usuariologin', this.usuario + "");
    if (this.routeRedirect === '')
      this.router.navigate(["/dashboard"])
    else
      this.router.navigate([this.routeRedirect]);
  }

  ngOnInit(): void {
    console.log("ENTRO EN NAvETACION");
  }

  ingresar() {
    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;

    if (this.usuario == 'patito' && this.password == 'patito.123') {
      //rediccecionamos al dashboarf
      this.cargandooo();
      this.router.navigate(["dashboard"])

    } else {
      //mostramos un mensaje de error!
      this.error2();
      this.form.reset();
    }
  }

  error2() {
    this._snackBar.open('Usuario o contraseña inválidos', 'Ingrese nuevamente', {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  cargandooo() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  loginUsuario() {

    this.usuario = this.form.value.usuario;
    this.password = this.form.value.password;

    this.authService.login();
    this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
    this.authService.urlUsuarioIntentaAcceder = '';
    console.log("URL.. " + this.routeRedirect);

    this.service.getUsuarioLogin(this.usuario, this.password)
      .subscribe(data => {
        this.usuarios = data;
        console.log("valor: ", data);
        //console.log("valor: ", this.usuarios[1].nombre);
        if (data) {
          //rediccecionamos al dashboarf
          localStorage.setItem('usuariologin', this.usuario + "");
          this._snackBar.open('Usuario Ingresado', 'Exitosamente!', { duration: 3000 });
          this.cargandooo();
          //this.login();
          if (this.routeRedirect === '')
            this.router.navigate(["/dashboard"]);
          else
            this.router.navigate([this.routeRedirect]);

        } else {
          //mostramos un mensaje de error!
          this.error2();
          this.form.reset();
          this.userIncorrectoFocus();
        }
      })
  }

  userIncorrectoFocus() {
    this.inserUsuaer.nativeElement.focus();
  }

}

