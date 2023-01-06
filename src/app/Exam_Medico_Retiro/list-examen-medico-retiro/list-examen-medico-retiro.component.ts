import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExamenMedicoRetiro } from 'src/app/Modelo/ExamenMedicoRetiro';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-examen-medico-retiro',
  templateUrl: './list-examen-medico-retiro.component.html',
  styleUrls: ['./list-examen-medico-retiro.component.css']
})
export class ListExamenMedicoRetiroComponent implements OnInit {

  formattedDate: any;
  fechita: Date;

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  examenMedicoRetiro: ExamenMedicoRetiro[];
  //pacientes: Paciente[];
  dataSourceExamenMedicoRetiro = new MatTableDataSource<ExamenMedicoRetiro>();
  displayedColumnsExamenMedicoRetiro: string[] = ['codigo', 'fecha', 'peso', 'talla', 'masaCorporal', 'estadoNutricional', 'enfermedadActual', 'tratamiento', 'acciones1','acciones2'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paciente: Paciente = new Paciente();

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNombrePaciente();
    this.listarexamenMedicoRetiroPorPaciente();
  }

  listarexamenMedicoRetiroPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    //let nomPac = localStorage.getItem('nombre');
    //this.nombrePaciente = nomPac;
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getExamenMedicoRetiroPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.examenMedicoRetiro = data;
        this.dataSourceExamenMedicoRetiro.data = this.examenMedicoRetiro;
        console.log("Consultass 0001 " + data);
        this.examenMedicoRetiro.forEach(data => {
          //console.log("Consultass " + data.consulta);
          //this.nombrePaciente = data.paciente.nombre;
        });
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceExamenMedicoRetiro.filter = filterValue.trim().toLowerCase();
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
    })

  }

  editarExamenMedicoRetiro(examenMedicoRetiro: ExamenMedicoRetiro) {
    localStorage.setItem('codigo', examenMedicoRetiro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-examen-medico-retiro"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteExamenMedicoRetiro(examenMedicoRetiro: ExamenMedicoRetiro) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteExamenMedicoRetiro(examenMedicoRetiro)
        .subscribe(data => {
          this.examenMedicoRetiro = this.examenMedicoRetiro.filter(p => p !== examenMedicoRetiro);
          this._snackBar.open('Consulta Medico Retiro', 'Eliminado', { duration: 2000 });
          this.listarexamenMedicoRetiroPorPaciente();
        })
    }
  }

  addNewConsultaRetiro(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-examen-medico-retiro"]);
  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }

  redirectCertificadoAptitud(examenMedicoRetiro: ExamenMedicoRetiro): void {
    localStorage.setItem('codigoConsultaPreocupacional', examenMedicoRetiro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('tipoConsultaParaCA', "ExamenMedicoRetiro");
    this.router.navigate(["add-certificado-aptitud"]);
  }

  redirectImprimirConsulta(examenMedicoRetiro: ExamenMedicoRetiro): void {
    localStorage.setItem('codigoConsultaRetiro', examenMedicoRetiro.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    this.router.navigate(["print-consulta-retiro"]);
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientespara-emr"]);
  }

}
