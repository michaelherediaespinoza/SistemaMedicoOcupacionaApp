import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/Modelo/Consulta';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-pacientesparaconsulta-preventiva',
  templateUrl: './list-pacientesparaconsulta-preventiva.component.html',
  styleUrls: ['./list-pacientesparaconsulta-preventiva.component.css']
})
export class ListPacientesparaconsultaPreventivaComponent implements OnInit {

  codigo2: number;
  nombrePaciente: any;
  consultas: Consulta[];

  pacientes: Paciente[];
  dataSource = new MatTableDataSource<Paciente>();
  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'apellido', 'edad', 'sexo', 'tipoSangre', 'telefono',  'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("componentListPacientesConsulPeriodica") componentListPacientesConsulPeriodica: ElementRef;



  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
    this.getAllPacientes();
  }

  ngAfterViewInit() {
    this.componentListPacientesConsulPeriodica.nativeElement.focus();
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

  GetCodigoPacienteParaAddConsultaPreventiva(paciente: Paciente): void {
    localStorage.setItem('codigoPaciente', paciente.codigo.toString());
    localStorage.setItem('cedula', paciente.cedula.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    localStorage.setItem('apellido', paciente.apellido.toString());
    localStorage.setItem('actualizar', "false");
    this.router.navigate(['add-consulta-preventiva']);
  }
  

  GetCodigoPacienteVerConsulta(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    this.router.navigate(['list-consulta-preventiva']);
  }

  /*
   AddConsulta(): void {
     this.router.navigate(["add-consulta"]);
   }
 */
}