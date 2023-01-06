import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Historial } from 'src/app/Modelo/Historial';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-historial',
  templateUrl: './list-historial.component.html',
  styleUrls: ['./list-historial.component.css']
})
export class ListHistorialComponent implements OnInit {

  //objDate = Date.now();

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  historiales: Historial[];
  //pacientes: Paciente[];
  //acidente: historial;
  dataSourceHistorial = new MatTableDataSource<Historial>();
  displayedColumnsHistorial: string[] = ['codigo', 'fuma', 'bebe', 'drogas', 'observacion', 'nombre', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDatosPaciente();
    this.listarHistorialPorPaciente();
  }

  listarHistorialPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getHistorialPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.historiales = data;
        this.dataSourceHistorial.data = this.historiales;
        console.log("Consultass 0001 " + data);

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHistorial.filter = filterValue.trim().toLowerCase();
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

  editarHistorial(historial: Historial) {
    localStorage.setItem('codigo', historial.codigo.toString());
    //localStorage.setItem('codigoPaciente', this.codigoPaciente+"");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-historial"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteHistorial(historial: Historial) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteHistorial(historial)
        .subscribe(data => {
          console.log("data de server:" + data);
          this.historiales = this.historiales.filter(p => p !== historial);
          this._snackBar.open('Consulta de historial', 'Eliminado', { duration: 2000 });
          this.listarHistorialPorPaciente();
        })
    }
  }
}