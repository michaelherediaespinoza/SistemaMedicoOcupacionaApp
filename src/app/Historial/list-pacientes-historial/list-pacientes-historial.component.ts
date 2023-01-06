import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-pacientes-historial',
  templateUrl: './list-pacientes-historial.component.html',
  styleUrls: ['./list-pacientes-historial.component.css']
})
export class ListPacientesHistorialComponent implements OnInit {

  codigo2: number;
  nombrePaciente: any;
  consultas: ConsultaMedica[];

  pacientes: Paciente[];
  dataSource = new MatTableDataSource<Paciente>();
  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'apellido', 'edad', 'sexo', 'tipoSangre', 'telefono',  'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService) {


  }

  ngOnInit(): void {

    this.getAllPacientes();
    //this.ListarConsultaPorPaciente();

  }

  getAllPacientes = () => {
    this.service.getPacientes()
      .subscribe(data => {
        this.pacientes = data;
        this.dataSource.data = this.pacientes;
        console.log('res', data);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  getCodigoPacienteParaAddHistorial(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('cedula', paciente.cedula.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    localStorage.setItem('apellido', paciente.apellido.toString());
    localStorage.setItem('actualizar', "false");
    this.router.navigate(['add-historial']);
  }
/*
  getCodigoPacienteVerHistorial(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    this.router.navigate(['list-historial']);
  }
*/
  getCodigoPacienteVerEditHistorial(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    localStorage.setItem('actualizar', "true");
    this.router.navigate(['add-historial']);
  }

}