import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExamenMedicoInicial } from 'src/app/Modelo/ExamenMedicoInicial';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-examen-medico-inicial',
  templateUrl: './list-examen-medico-inicial.component.html',
  styleUrls: ['./list-examen-medico-inicial.component.css']
})
export class ListExamenMedicoInicialComponent implements OnInit {

  paciente: Paciente = new Paciente();

  formattedDate: any;
  fechita: Date;

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  examnesMedicosInicio: ExamenMedicoInicial[];
  //pacientes: Paciente[];
  dataSourceExamenMedicoInicial = new MatTableDataSource<ExamenMedicoInicial>();
  displayedColumnsExamenMedicoInicial: string[] = ['codigo', 'fecha', 'peso', 'talla', 'estadoNutricional', 'respiracion', 'temperatura', 'anamnesis', 'sindrome', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNombrePaciente();
    this.listarExamnesMedicosInicioPorPaciente();
  }

  listarExamnesMedicosInicioPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    //let nomPac = localStorage.getItem('nombre');
    //this.nombrePaciente = nomPac;
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getExamenesMedicoInicialPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.examnesMedicosInicio = data;
        this.dataSourceExamenMedicoInicial.data = this.examnesMedicosInicio;
        console.log("Consultass 0001 " + data);
        this.examnesMedicosInicio.forEach(data => {
          // console.log("Consultass " + data.consulta);
          //this.nombrePaciente = data.paciente.nombre;
        });
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceExamenMedicoInicial.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo " + this.codigoPaciente)
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        this.codigoPaciente = this.paciente.codigo;
      }
    )
  }

  editarExamenMedicoInicial(ExamenMedicoInicial: ExamenMedicoInicial) {
    localStorage.setItem('codigo', ExamenMedicoInicial.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-examen-medico-inicial"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteExamenMedicoInicial(ExamenMedicoInicial: ExamenMedicoInicial) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteExamenMedicoInicial(ExamenMedicoInicial)
        .subscribe(data => {
          this.examnesMedicosInicio = this.examnesMedicosInicio.filter(p => p !== ExamenMedicoInicial);
          this._snackBar.open('Consulta Preventiva', 'Eliminado', { duration: 2000 });
          this.listarExamnesMedicosInicioPorPaciente();
        })
    }
  }

}
