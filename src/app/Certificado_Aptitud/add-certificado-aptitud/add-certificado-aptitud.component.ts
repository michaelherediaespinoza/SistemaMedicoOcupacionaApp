import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/Modelo/Paciente';
import { CertificadoAptitud } from 'src/app/Modelo/CertificadoAptitud';
import { ServiceService } from 'src/app/Service/service.service';
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConsultaPreventiva } from 'src/app/Modelo/ConsultaPreventiva';
import { ExamenMedicoRetiro } from 'src/app/Modelo/ExamenMedicoRetiro';
import { ConsultaReintegro } from 'src/app/Modelo/ConsultaReintegro';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-add-certificado-aptitud',
  templateUrl: './add-certificado-aptitud.component.html',
  styleUrls: ['./add-certificado-aptitud.component.css']
})

export class AddCertificadoAptitudComponent implements OnInit {

  paciente: Paciente = new Paciente();
  certificadoAptitud: CertificadoAptitud = new CertificadoAptitud();
  consultaPreocupacional: ConsultaPreocupacional = new ConsultaPreocupacional();
  consultaPreventiva: ConsultaPreventiva = new ConsultaPreventiva();
  examenMedicoRetiro: ExamenMedicoRetiro = new ExamenMedicoRetiro();
  consultaReintegro: ConsultaReintegro = new ConsultaReintegro();

  codigoConsultaPreocupacionalCA: number;
  codigoPaciente: number;
  getTipoConsulta: String;
  messageResponse: String;

  ceduNombApellPaciente: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;

  empresita: String;
  cargito: String;

  //codigoCertificadoAptitud: number;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR CERTIFICADO DE APTITUD";

    //this.saveOrEditCA();
    this.getDatosPaciente();
    this.getTipoConsulaParaCertificadoAptitud();
    //this.getDatosAptitudLaboralDeConsulta();
    //this.editarCertificadoAptitud();
    //this.getConsultaPreocupacional();
    //this.editarCertificadoAptitud();
  }

  getTipoConsulaParaCertificadoAptitud(): void {
    let val1 = localStorage.getItem('tipoConsultaParaCA');
    this.getTipoConsulta = String(val1);
    console.log("Tipo Consulta: " + this.getTipoConsulta);
    if (this.getTipoConsulta == "ConsultaPreocupacional") {
      console.log("llego a Consulta Preocupacional: ");
      this.getConsultaPreocupacional();
      this.editarCertificadoAptitud();
    } else if (this.getTipoConsulta == "ConsultaPeriodica") {
      this.getConsultaPeriodica();
      this.editarCertificadoAptitud();
    } else if (this.getTipoConsulta == "ExamenMedicoRetiro") {
      this.getConsultaRetiro();
      this.editarCertificadoAptitud();
    } else if (this.getTipoConsulta == "ConsultaReintegro") {
      this.getConsultaReintegro();
      this.editarCertificadoAptitud();
    } else {
      this._snackBar.open('TIPO CONSULTA', 'NO ENCONTRADO', { duration: 4000 });
      //this.getNombrePaciente();
      //this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }

  /*
  saveOrEditCA(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR CERTIFICADO DE APTITUD";
      this.messageResponse = "Actualización Exitosa..!"
      //this.editarCertificadoAptitud();
      //this.getHistorialPorPaciente();
    } else {
      //this.getDatosPaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }
  */

  guardarCertificadoAptitud(): void {
    // this.certificadoAptitud.paciente = this.paciente;
    console.log("codigo Consulta para gaudar CERT APT: " + this.codigoConsultaPreocupacionalCA);
    this.certificadoAptitud.codigoConsulta = this.codigoConsultaPreocupacionalCA;

    this.service.createCertificadoAptitud(this.certificadoAptitud)
      .subscribe(data => {
        this.certificadoAptitud = data;
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        console.log("Enviadno C..A..para List: " + this.paciente.codigo.toString())
        this._snackBar.open('CERTIFCADO DE APTITUD', 'GUARDADO', { duration: 4000 });
        this.cambioPagina();
      }
      )
  }

  /*
  editarCertificadoAptitud(): void {
    let codigoCP = localStorage.getItem('codigoCP');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigo Paciente 0101" + codigoPaciente);
    this.codigoCertificadoAptitud = Number(codigoCP);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigo Ceticado Aptitud0101: " + this.codigoCertificadoAptitud);
    this.service.getCertificadoAptitudCodigo(this.codigoCertificadoAptitud)
      .subscribe(data => {
        this.certificadoAptitud = data;
      })
  }
  */

  editarCertificadoAptitud(): void {
    let codigoCP = localStorage.getItem('codigoConsultaPreocupacional');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigo Paciente 0101" + codigoPaciente);
    this.codigoConsultaPreocupacionalCA = Number(codigoCP);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigo Consulta Para CA: " + this.codigoConsultaPreocupacionalCA);
    this.service.getCertificadoAptitudCodigo(this.codigoConsultaPreocupacionalCA)
      .subscribe(data => {
        console.log("codigo Paciente 0101" + data);
        if (data == null)
          this._snackBar.open('NO TIENE CERTIFCADO DE APTITUD', 'INGRESADO', { duration: 4000 });
        else
          this.certificadoAptitud = data;
      })
  }

  getConsultaPreocupacional(): void {
    let codigoCP = localStorage.getItem('codigoConsultaPreocupacional');
    this.codigoConsultaPreocupacionalCA = Number(codigoCP);
    this.service.getConsultaPreocupacionalCodigo(this.codigoConsultaPreocupacionalCA)
      .subscribe(data => {
        if (data == null) {
          this._snackBar.open('NO TIENE CERTIFCADO DE APTITUD', 'INGRESADO', { duration: 4000 });
        } else {
          this.consultaPreocupacional = data;
          this.certificadoAptitud.apto = this.consultaPreocupacional.apto;
          this.certificadoAptitud.noApto = this.consultaPreocupacional.noApto;
          this.certificadoAptitud.aptoObservacion = this.consultaPreocupacional.aptoObservacion;
          this.certificadoAptitud.aptoLimitacion = this.consultaPreocupacional.aptoLimitacion;
          this.certificadoAptitud.observacionCertificadoAptitud = this.consultaPreocupacional.observacion;

          this.certificadoAptitud.tipoEvaluacion = "INGRESO";
        }
      })
  }


  getConsultaPeriodica(): void {
    let codigoCP = localStorage.getItem('codigoConsultaPreocupacional');
    this.codigoConsultaPreocupacionalCA = Number(codigoCP);
    this.service.getConsultaPreventivaCodigo(this.codigoConsultaPreocupacionalCA)
      .subscribe(data => {
        if (data == null) {
          this._snackBar.open('NO TIENE CERTIFCADO DE APTITUD', 'INGRESADO', { duration: 4000 });
        } else {
          this.consultaPreventiva = data;
          this.certificadoAptitud.apto = this.consultaPreventiva.apto;
          this.certificadoAptitud.noApto = this.consultaPreventiva.noApto;
          this.certificadoAptitud.aptoObservacion = this.consultaPreventiva.aptoObservacion;
          this.certificadoAptitud.aptoLimitacion = this.consultaPreventiva.aptoLimitacion;
          this.certificadoAptitud.observacionCertificadoAptitud = this.consultaPreventiva.observacionAptitudPeriodica;

          this.certificadoAptitud.tipoEvaluacion = "PERIÓDICO";
        }
      })
  }

  getConsultaRetiro(): void {
    this.certificadoAptitud.tipoEvaluacion = "SALIDA";
  }

  getConsultaReintegro(): void {
    let codigoCP = localStorage.getItem('codigoConsultaPreocupacional');
    this.codigoConsultaPreocupacionalCA = Number(codigoCP);
    this.service.getConsultaReintegroCodigo(this.codigoConsultaPreocupacionalCA)
      .subscribe(data => {
        if (data == null) {
          this._snackBar.open('NO TIENE CERTIFCADO DE APTITUD', 'INGRESADO', { duration: 4000 });
        } else {
          this.consultaReintegro = data;
          this.certificadoAptitud.apto = this.consultaReintegro.apto;
          this.certificadoAptitud.noApto = this.consultaReintegro.noApto;
          this.certificadoAptitud.aptoObservacion = this.consultaReintegro.aptoObservacion;
          this.certificadoAptitud.aptoLimitacion = this.consultaReintegro.aptoLimitacion;
          this.certificadoAptitud.observacionCertificadoAptitud = this.consultaReintegro.observacionAptitudReintegro;

          this.certificadoAptitud.tipoEvaluacion = "REINTEGRO";
        }
      })
  }

  /*
  getDatosAptitudLaboralDeConsulta(): void {
    let apto = localStorage.getItem('apto');
    let noapto = localStorage.getItem('noapto');
    let aptoobservacion = localStorage.getItem('aptoobservacion');
    let aptolimitacion = localStorage.getItem('aptolimitacion');
    let observacion = localStorage.getItem('observacion');
    console.log("codigo Paciente 0101" + apto);
    this.certificadoAptitud.apto = String(apto);
    this.certificadoAptitud.noApto = String(noapto);
    this.certificadoAptitud.aptoObservacion = String(aptoobservacion);
    this.certificadoAptitud.aptoLimitacion = String(aptolimitacion);
    this.certificadoAptitud.observacionCertificadoAptitud = String(observacion);
  }

  */

  getDatosPaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("codigoo Paciente " + this.codigoPaciente)
    //console.log("000012 " + this.service.getPacienteId(this.codigo2))

    //let cedula = localStorage.getItem('cedula');
    //let nombre = localStorage.getItem('nombre');
    //let apellido = localStorage.getItem('apellido');
    //this.ceduNombApellPaciente = (String(nombre) + "  " + String(apellido));
    //console.log("nombre " + this.ceduNombApellPaciente)

    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        console.log("01212 " + this.paciente.nombre);
        this.empresita = data.cargo.departamento.empresa.nombre;
        this.cargito = data.cargo.nombre;
        this.ceduNombApellPaciente = (data.nombre + "  " + data.apellido);
      })

  }

  btnCancelar(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    this.cambioPagina();
    //this.router.navigate(["list-paciente"]);
  }

  cambioPagina(): void {
    if (this.getTipoConsulta == "ConsultaPreocupacional")
      this.router.navigate(["list-consulta-preocupacional"]);
    else if (this.getTipoConsulta == "ConsultaPeriodica")
      this.router.navigate(["list-consulta-preventiva"]);
    else if (this.getTipoConsulta == "ExamenMedicoRetiro")
      this.router.navigate(["list-examen-medico-retiro"]);
    else if (this.getTipoConsulta == "ConsultaReintegro")
      this.router.navigate(["list-ficha-reitegro"]);
  }

}
