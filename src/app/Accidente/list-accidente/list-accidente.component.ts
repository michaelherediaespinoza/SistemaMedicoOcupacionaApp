import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Accidente } from 'src/app/Modelo/Accidente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-accidente',
  templateUrl: './list-accidente.component.html',
  providers: [DatePipe],
  styleUrls: ['./list-accidente.component.css']
})
export class ListAccidenteComponent implements OnInit {

  //objDate = Date.now();

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  accidentes: Accidente[];
  //pacientes: Paciente[];
  //acidente: Accidente;
  dataSourceAccidente = new MatTableDataSource<Accidente>();
  displayedColumnsAccidente: string[] = ['codigo', 'fecha', 'naturalezaLesion', 'regionAfectada', 'nombre', 'parteAfectada', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar,  public datee: DatePipe) { }

  ngOnInit(): void {
    this.getDatosPaciente();
    this.listarAccidentesPorPaciente();
  }

  listarAccidentesPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getAccidentePorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.accidentes = data;
        this.dataSourceAccidente.data = this.accidentes;
        console.log("Consultass 0001 " + data);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAccidente.filter = filterValue.trim().toLowerCase();
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
    this.ceduNombApellPaciente = (String(cedula) + "   " + String(nombre) + "  " + String(apellido));
  }

  editarAccidente(accidete: Accidente) {
    localStorage.setItem('codigo', accidete.codigo.toString());
    //localStorage.setItem('codigoPaciente', this.codigoPaciente+"");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-accidente"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteAccidente(accidente: Accidente) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteAccidente(accidente)
        .subscribe(data => {
          console.log("data de server:" + data);
          this.accidentes = this.accidentes.filter(p => p !== accidente);
          this._snackBar.open('Consulta de Accidente', 'Eliminado', { duration: 2000 });
          this.listarAccidentesPorPaciente();
        })
    }
  }
}