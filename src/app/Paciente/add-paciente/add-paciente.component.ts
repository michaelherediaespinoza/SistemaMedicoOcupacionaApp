import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/Modelo/Cargo';
import { Departamento } from 'src/app/Modelo/Departamento';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.css']
})
export class AddPacienteComponent implements OnInit {

  @ViewChild("addpacientefocus") focusAddPaciente: ElementRef;

  @ViewChild("myModalCargo", { static: false }) myModalCargo: TemplateRef<any>;
  @ViewChild("myModalInsertCargo", { static: false }) myModalInsertCargo: TemplateRef<any>;

  cargoSelect = new Set<Cargo>();
  formattedDate: any;

  departamento: Departamento = new Departamento();
  paciente: Paciente = new Paciente();
  cargo: Cargo = new Cargo();

  fechaNacimientoAnio: String;
  fechaNaciAnio: number;
  fechaNacimientoAnioActual: String;
  fechaNaciAnioActual: number;
  totalAnioPaciente: number;

  cargos: Cargo[];
  dataSourceCargo = new MatTableDataSource<Cargo>();
  displayedColumnsCargo: string[] = ['codigo', 'nombre'];

  favoriteSeason: string;
  seasons: string[] = ['MASCULINO', 'FEMENINO'];

  cedulaPaciente: boolean;

  //selectedcorrecion = "";

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.paciente.fechaIngresoEmpresa = this.formattedDate;
    // this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.focusAddPaciente.nativeElement.focus();
  }

  guardar(): void {
    console.log("sexo paciente: " + this.paciente.sexo);
    this.paciente.cargo = this.cargo;
    this.service.createPaciente(this.paciente)
      .subscribe(data => {
        console.log(this.paciente);
        this._snackBar.open('Paciente Guardado!', 'Exitasamente', { duration: 4000 });
        //alert("Se Agrego con Exito...!!!");
        this.router.navigate(["list-paciente"]);
      })
  }

  openDialogCargo() {
    this.cargoSelect = new Set<Cargo>();
    const dialogRef = this.dialog.open(this.myModalCargo, { width: '50%', panelClass: 'icon-outside', });
    this.getAllCargos();

    dialogRef.afterClosed().subscribe(result => {

      for (let carg of this.cargoSelect) {
        this.cargo = carg;
      }

    });
  }

  getAllCargos = () => {
    this.service.getCargos()
      .subscribe(data => {
        this.cargos = data;
        this.dataSourceCargo.data = this.cargos;
        // console.log('res', data);
      })
  }

  selectCargoDialog(row: any) {
    this.cargoSelect.clear();
    this.cargoSelect.add(row);
    //this.dialog.close;
  }

  calculateAge(): void {


    this.fechaNacimientoAnio = this.paciente.fechaNacimiento.substr(-4);
    this.fechaNaciAnio = Number(this.fechaNacimientoAnio);

    this.fechaNacimientoAnioActual = this.formattedDate.substr(-4);
    this.fechaNaciAnioActual = Number(this.fechaNacimientoAnioActual);
    this.totalAnioPaciente = this.fechaNaciAnioActual - this.fechaNaciAnio;

    this.paciente.edad = this.totalAnioPaciente;

  }


  openDialogInsertCargoDepartamento() {
    const dialogRef = this.dialog.open(this.myModalInsertCargo, { width: '40%' });

    dialogRef.afterClosed().subscribe(result => {
      this.insertCargo();
    });
  }

  insertCargo(): void {
    if (this.cargo.nombre || this.departamento.nombre == "") {
      this.cargo.departamento = this.departamento;
      this.service.insertCargo(this.cargo)
        .subscribe(data => {
          this.cargo = data;
          this._snackBar.open('Cargo Guardado!', 'Exitasamente', { duration: 4000 });
        })
    } else {
      this._snackBar.open('NO TIENE DATOS!', 'PARA INSERTAR', { duration: 4000 });
    }
  }

  cacelar(): void {
    this.router.navigate(["list-paciente"]);
  }

  validaCedulita(): void {
    this.cedulaPaciente = this.validarCedula(this.paciente.cedula + "");
    console.log("resul de cedula: " + this.cedulaPaciente);
    if (this.cedulaPaciente == true)
      this._snackBar.open('Cédula Ingresada', 'correctamente!', { duration: 4000 });
    else
      this._snackBar.open('Cédula', 'Invalida!', { duration: 4000 });
  }



  validarCedula(cedula: string): boolean {
    // Créditos: Victor Diaz De La Gasca.
    // Autor: Adrián Egüez
    // Url autor: https://gist.github.com/vickoman/7800717
    // Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {

      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);

      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {

        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));

        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;

        // Suma total
        const sumaTotal = (pares + impares);

        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);

        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;

        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;

        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }

        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }

      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }

  }

}


