import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CertificadoAptitud } from 'src/app/Modelo/CertificadoAptitud';
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-certificado-aptitud',
  templateUrl: './list-certificado-aptitud.component.html',
  styleUrls: ['./list-certificado-aptitud.component.css']
})
export class ListCertificadoAptitudComponent implements OnInit {

  certificadoAptitud: CertificadoAptitud[];
  //pacientes: Paciente[];
  dataSourcecertificadoAptitud = new MatTableDataSource<CertificadoAptitud>();
  displayedColumnscertificadoAptitud: string[] = ['codigo', 'fecha', 'tipoEvaluacion', 'apto', 'aptoObservacion', 'aptoLimitacion', 'NoApto', 'condicionSalud', 'recomendacion', 'acciones'];

  codigoPaciente: number;
  ceduNombApellPaciente: String;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.geDatosPaciente();
    this.listarCertificadoAptitudPorPaciente();
  }

  listarCertificadoAptitudPorPaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    console.log("Codigo Paciente..  " + codigo);
    //let nomPac = localStorage.getItem('nombre');
    //this.nombrePaciente = nomPac;
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para pacinte 222..  " + this.codigoPaciente);
    this.service.getCertificadoAptitudPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.certificadoAptitud = data;
        this.dataSourcecertificadoAptitud.data = this.certificadoAptitud;
        //console.log("Consultass 0001 " + data);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcecertificadoAptitud.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  geDatosPaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo Get PACIENTE" + this.codigoPaciente);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        // this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
      })
  }

  editarCertificadoAptitud(certificadoAptitud: CertificadoAptitud) {
    localStorage.setItem('codigoCP', certificadoAptitud.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-certificado-aptitud"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteCertificadoAptitud(certificadoAptitud: CertificadoAptitud) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteCertificadoAptitud(certificadoAptitud)
        .subscribe(data => {
          this.certificadoAptitud = this.certificadoAptitud.filter(p => p !== certificadoAptitud);
          this._snackBar.open('Certificado Aptitud', 'Eliminado', { duration: 4000 });
          this.listarCertificadoAptitudPorPaciente();
        })
    }
  }

  addNewcertificadoAptitudInicio(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-certificado-aptitud"]);
  }

}
