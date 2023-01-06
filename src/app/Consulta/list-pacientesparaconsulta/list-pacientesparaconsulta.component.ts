import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-pacientesparaconsulta',
  templateUrl: './list-pacientesparaconsulta.component.html',
  styleUrls: ['./list-pacientesparaconsulta.component.css']
})
export class ListPacientesparaconsultaComponent implements OnInit {

 
  codigo2: number;
  nombrePaciente: any;
  consultas: ConsultaMedica[];

  pacientes: Paciente[];
  dataSource = new MatTableDataSource<Paciente>();
  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'apellido', 'edad', 'sexo', 'tipoSangre', 'telefono', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("componentListPacientesConsulMedica") componentListPacientesConsulMedica: ElementRef;

  constructor(private router: Router, private service: ServiceService) {


  }

  ngOnInit(): void {
    this.getAllPacientes();
    //this.ListarConsultaPorPaciente();
  }

  ngAfterViewInit() {
    this.componentListPacientesConsulMedica.nativeElement.focus();
  }

  getAllPacientes = () => {
    this.service.getPacientes()
      .subscribe(data => {
        this.pacientes = data;
        this.dataSource.data = this.pacientes;
        console.log('res', data);
      })
  }

  ListarConsultaPorPaciente() {
    let codigo = localStorage.getItem('codigo');
    let nomPac = localStorage.getItem('nombre');
    this.nombrePaciente = nomPac;
    this.codigo2 = Number(codigo);
    this.service.getConsultasPorPaciente(this.codigo2)
      .subscribe(data => {
        this.consultas = data;

        this.consultas.forEach(data => {
          //console.log("01212222222222s " + data.paciente.nombre);
          //this.nombrePaciente = data.paciente.nombre;
        });
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  getCodigoPacienteParaAddConsulta(paciente: Paciente): void {
    localStorage.setItem('codigoPaciente', paciente.codigo.toString());
    localStorage.setItem('cedula', paciente.cedula.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    localStorage.setItem('apellido', paciente.apellido.toString());
    localStorage.setItem('actualizar', "false");
    this.router.navigate(['add-consulta']);
  }

  getCodigoPacienteVerConsulta(paciente: Paciente): void {
    localStorage.setItem('codigoPaciente', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    this.router.navigate(['list-consulta']);
  }

  /*
  getCodigoPacienteVerEditExamenInical(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('cedulaPaciente', paciente.cedula.toString());
    localStorage.setItem('nombrePaciente', paciente.nombre.toString());
    localStorage.setItem('apellidoPaciente', paciente.apellido.toString());
    //localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-examen-inicial"]);
  }
  */

  /*
   AddConsulta(): void {
     this.router.navigate(["add-consulta"]);
   }
 */
}