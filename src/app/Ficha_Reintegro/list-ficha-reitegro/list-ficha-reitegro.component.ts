import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaReintegro } from 'src/app/Modelo/ConsultaReintegro';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-ficha-reitegro',
  templateUrl: './list-ficha-reitegro.component.html',
  styleUrls: ['./list-ficha-reitegro.component.css']
})
export class ListFichaReitegroComponent implements OnInit {

  //objDate = Date.now();

  paciente: Paciente = new Paciente();

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  consultasReintegro: ConsultaReintegro[];
  //pacientes: Paciente[];
  //acidente: ConsultaReintegro;
  dataSourceConsultaReintegro = new MatTableDataSource<ConsultaReintegro>();
  displayedColumnsConsultaReintegro: string[] = ['codigo', 'fecha', 'peso', 'talla', 'masaCorporal', 'estadoNutricional', 'enfermedadActual', 'tratamiento', 'acciones1', 'acciones2'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDatosPaciente();
    this.listarConsultaReintegroPorPaciente();
  }

  listarConsultaReintegroPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getConsultaReintegroPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.consultasReintegro = data;
        this.dataSourceConsultaReintegro.data = this.consultasReintegro;
        console.log("Consultass 0001 " + data);

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConsultaReintegro.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  getDatosPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo " + this.codigoPaciente)
    console.log("000012 " + this.service.getPacienteId(this.codigoPaciente))

    let cedula = localStorage.getItem('cedula');
    let nombre = localStorage.getItem('nombre');
    let apellido = localStorage.getItem('apellido');
    //this.ceduNombApellPaciente = (String(cedula) + "   " + String(nombre) + "  " + String(apellido));
    this.service.getPacienteId(this.codigoPaciente)
    .subscribe(data => {
      this.paciente = data;
      this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
      this.codigoPaciente = this.paciente.codigo;
    })
  }

  editarConsultaReintegro(consultaReintegro: ConsultaReintegro) {
    localStorage.setItem('codigo', consultaReintegro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-ficha-reitegro"]);

  }

  deleteConsultaReintegro(consultaReintegro: ConsultaReintegro) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteConsultaReintegro(consultaReintegro)
        .subscribe(data => {
          console.log("data de server:" + data);
          this.consultasReintegro = this.consultasReintegro.filter(p => p !== consultaReintegro);
          this._snackBar.open('Consulta Reintegro', 'Eliminado', { duration: 2000 });
          this.listarConsultaReintegroPorPaciente();
        })
    }
  }


  addNewConsultaReintegro(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-ficha-reitegro"]);
  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }

  redirectCertificadoAptitud(consultaReintegro: ConsultaReintegro): void {
    localStorage.setItem('codigoConsultaPreocupacional', consultaReintegro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('tipoConsultaParaCA', "ConsultaReintegro");
    this.router.navigate(["add-ficha-reitegro"]);
  }

  redirectImprimirConsulta(consultaReintegro: ConsultaReintegro): void {
    localStorage.setItem('codigoConsultaReintegro', consultaReintegro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    this.router.navigate(["print-consulta-reintegro"]);
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientes-ficha-reitegro"]);
  }
}