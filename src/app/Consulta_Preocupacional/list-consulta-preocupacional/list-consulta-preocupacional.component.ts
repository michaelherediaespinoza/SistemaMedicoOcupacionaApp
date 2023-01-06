import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-consulta-preocupacional',
  templateUrl: './list-consulta-preocupacional.component.html',
  styleUrls: ['./list-consulta-preocupacional.component.css']
})
export class ListConsultaPreocupacionalComponent implements OnInit {

  formattedDate: any;
  fechita: Date;

  paciente: Paciente = new Paciente();

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  consultaPreocupacional: ConsultaPreocupacional[];
  //pacientes: Paciente[];
  dataSourceconsultaPreocupacional = new MatTableDataSource<ConsultaPreocupacional>();
  displayedColumnsconsultaPreocupacional: string[] = ['codigo', 'fecha', 'peso', 'talla', 'masaCorporal', 'estadoNutricional', 'enfermedadActual', 'tratamiento', 'acciones1', 'acciones2'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.geDatosPaciente();
    this.listarconsultaPreocupacionalPorPaciente();
  }

  listarconsultaPreocupacionalPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    //let nomPac = localStorage.getItem('nombre');
    //this.nombrePaciente = nomPac;
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getConsultaPreocupacionalPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.consultaPreocupacional = data;
        this.dataSourceconsultaPreocupacional.data = this.consultaPreocupacional;
        console.log("Consultass 0001 " + data);
        this.consultaPreocupacional.forEach(data => {
          //console.log("Consultass " + data.consulta);
          //this.nombrePaciente = data.paciente.nombre;
        });
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceconsultaPreocupacional.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  geDatosPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo " + this.codigoPaciente);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        this.codigoPaciente = this.paciente.codigo;
      })
  }

  editarconsultaPreocupacional(consultaPreocupacional: ConsultaPreocupacional) {
    localStorage.setItem('codigoCP', consultaPreocupacional.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-consulta-preocupacional"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteconsultaPreocupacional(consultaPreocupacional: ConsultaPreocupacional) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteConsultaPreocupacional(consultaPreocupacional)
        .subscribe(data => {
          this.consultaPreocupacional = this.consultaPreocupacional.filter(p => p !== consultaPreocupacional);
          this._snackBar.open('CONSULTA PREOCUPACIONAL INICIO', 'ELIMINADO', { duration: 2000 });
          this.listarconsultaPreocupacionalPorPaciente();
        })
    }
  }

  addNewConsultaPreocupacionalInicio(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-consulta-preocupacional"]);
  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }

  redirectCertificadoAptitud(consultaPreocupacional: ConsultaPreocupacional): void {
    localStorage.setItem('codigoConsultaPreocupacional', consultaPreocupacional.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('tipoConsultaParaCA', "ConsultaPreocupacional");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    this.router.navigate(["add-certificado-aptitud"]);
    /*
    localStorage.setItem('apto', consultaPreocupacional.apto+"");
    localStorage.setItem('noapto', consultaPreocupacional.NoApto+"");
    localStorage.setItem('aptoobservacion', consultaPreocupacional.aptoObservacion+"");
    localStorage.setItem('aptolimitacion', consultaPreocupacional.aptoLimitacion+"");
    localStorage.setItem('observacion', consultaPreocupacional.observacion+"");
    */
  }

  redirectImprimirConsulta(consultaPreocupacional: ConsultaPreocupacional): void {
    localStorage.setItem('codigoConsultaPreocupacional', consultaPreocupacional.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo consul preocupacional enviado .. " + consultaPreocupacional.codigo.toString());
    this.router.navigate(["print-consulta-preocupacional"]);
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientes-consulta-preocupacional"]);
  }

}
