import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsultaPreventiva } from 'src/app/Modelo/ConsultaPreventiva';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { Hemograma } from 'src/app/Modelo/Hemograma';
import { Sindrome } from 'src/app/Modelo/Sindrome';
import { ServiceService } from 'src/app/Service/service.service';
import { Quimico } from 'src/app/Modelo/Quimico';
import { Serologia } from 'src/app/Modelo/Serologia';
import { Orina } from 'src/app/Modelo/Orina';
import { Heces } from 'src/app/Modelo/Heces';
import { ExamenLaboratorio } from 'src/app/Modelo/ExamenLaboratorio';
import { Electrocardiograma } from 'src/app/Modelo/Electrocardiograma';
import { Espirometria } from 'src/app/Modelo/Espirometria';
import { Radiologia } from 'src/app/Modelo/Radiologia';
import { Paciente } from 'src/app/Modelo/Paciente';
import { Audiometria } from 'src/app/Modelo/Audiometria';
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RevisionActual } from 'src/app/Modelo/RevisionActual';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';

@Component({
  selector: 'app-print-consulta-periodica',
  templateUrl: './print-consulta-periodica.component.html',
  styleUrls: ['./print-consulta-periodica.component.css']
})
export class PrintConsultaPeriodicaComponent implements OnInit {


  consultaPreventiva: ConsultaPreventiva = new ConsultaPreventiva();
  electrocardiograma: Electrocardiograma = new Electrocardiograma();
  examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
  examenInicial: ExamenInicial = new ExamenInicial();
  examenFisico: ExamenFisico = new ExamenFisico();
  espirometria: Espirometria = new Espirometria();
  diagnostico: Diagnostico = new Diagnostico();
  audiometria: Audiometria = new Audiometria();
  radiologia: Radiologia = new Radiologia();
  hemograma: Hemograma = new Hemograma();
  serologia: Serologia = new Serologia();
  sindrome: Sindrome = new Sindrome();
  paciente: Paciente = new Paciente();
  quimico: Quimico = new Quimico();
  orina: Orina = new Orina();
  heces: Heces = new Heces();

  revisionActual: RevisionActual = new RevisionActual();
  factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo = new FactorRiesgoPuestoTrabajo();
  historial: Historial = new Historial();
  antecedenteTrabajo: AntecedenteTrabajo = new AntecedenteTrabajo();

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];

  codigoConsultaPreventiva: number;
  ceduNombApellPaciente: String;
  codigoPaciente: number;
  cargito: String;

  usuarioLogin: String;
  nombreUsuario: String;

  empresita: String;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.verConsulta();
    this.getHistorialPorPaciente();
    this.getNombrePaciente();
    this.getDatosUser();
  }

  verConsulta(): void {
    let codigoConsulta = localStorage.getItem('codigoConsultaPeriodica');
    this.codigoConsultaPreventiva = Number(codigoConsulta);
    console.log("codigoConslta222 " + codigoConsulta);
    this.service.getConsultaPreventivaCodigo(this.codigoConsultaPreventiva)
      .subscribe(data => {
        this.consultaPreventiva = data;
        this.examenFisico = data.examenFisico;
        //this.sindrome = data.diagnostico.sindrome;
        //this.diagnostico = data.diagnostico;
        //this.consultaPreocupacional.examenGeneral = data.examenGeneral;

        this.factorRiesgoPuestoTrabajo = data.factorRiesgoPuestoTrabajo;
        this.revisionActual = data.revisionActual;

        this.examenGeneralAdd = data.examenGeneral;

        this.examenLaboratorio = data.examenLaboratorio;
        this.hemograma = data.examenLaboratorio.hemograma;
        this.quimico = data.examenLaboratorio.quimico;
        this.serologia = data.examenLaboratorio.serologia;
        this.orina = data.examenLaboratorio.orina;
        this.heces = data.examenLaboratorio.heces;

        this.electrocardiograma = data.electrocardiograma;
        this.espirometria = data.espirometria;
        this.audiometria = data.audiometria;
        this.radiologia = data.radiologia;

        //this.historial = data.hi

        // VALIDAS DATOS NULOS PARA data.factorRiesgoPuestoTrabajo

        //this.factorRiesgoPuestoTrabajo = data.factorRiesgoPuestoTrabajo;
        if (data.factorRiesgoPuestoTrabajo.puestoTrabajoArea === "undefined") {
          this.factorRiesgoPuestoTrabajo.puestoTrabajoArea = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.puestoTrabajoArea = data.factorRiesgoPuestoTrabajo.puestoTrabajoArea;
        }
        if (data.factorRiesgoPuestoTrabajo.actividad === "undefined") {
          this.factorRiesgoPuestoTrabajo.actividad = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.actividad = data.factorRiesgoPuestoTrabajo.actividad;
        }

        if (data.factorRiesgoPuestoTrabajo.fisico === "undefined") {
          this.factorRiesgoPuestoTrabajo.fisico = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.fisico = data.factorRiesgoPuestoTrabajo.fisico;
        }

        if (data.factorRiesgoPuestoTrabajo.mecanico === "undefined") {
          this.factorRiesgoPuestoTrabajo.mecanico = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.fisico = data.factorRiesgoPuestoTrabajo.fisico;
        }
        if (data.factorRiesgoPuestoTrabajo.quimico === "undefined") {
          this.factorRiesgoPuestoTrabajo.quimico = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.quimico = data.factorRiesgoPuestoTrabajo.quimico;
        }
        if (data.factorRiesgoPuestoTrabajo.biologico === "undefined") {
          this.factorRiesgoPuestoTrabajo.biologico = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.biologico = data.factorRiesgoPuestoTrabajo.biologico;
        }
        if (data.factorRiesgoPuestoTrabajo.ergonomico === "undefined") {
          this.factorRiesgoPuestoTrabajo.ergonomico = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.ergonomico = data.factorRiesgoPuestoTrabajo.ergonomico;
        }

        if (data.factorRiesgoPuestoTrabajo.psicosocial === "undefined") {
          this.factorRiesgoPuestoTrabajo.psicosocial = " ";
        } else {
          this.factorRiesgoPuestoTrabajo.psicosocial = data.factorRiesgoPuestoTrabajo.psicosocial;
        }


        //this.paciente = data.paciente;
        //this.ceduNombApellPaciente = (String(data.paciente.nombre) + "  " + String(data.paciente.apellido));
        //this.cargito = data.paciente.cargo.nombre;
        //this.empresita = data.paciente.cargo.departamento.empresa.nombre;

      })
  }

  getHistorialPorPaciente(): void {
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigo Paciente getHistorial" + codigoPaciente);
    this.codigoPaciente = Number(codigoPaciente);
    this.service.getHistorialCodigo(this.codigoPaciente).subscribe(data => {
      if (data == null) {
        this._snackBar.open('Paciente no tiene HISTORIAL..!', 'INGRESAR', { duration: 3000 });
      } else {
        this.historial = data;
        this.antecedenteTrabajoadd = data.antecedenteTrabajo;
      }
    })
  }

  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        console.log("01212 " + this.paciente.nombre);
        this.ceduNombApellPaciente = (String(data.nombre) + "  " + String(data.apellido));
        this.cargito = data.cargo.nombre;
        this.empresita = data.cargo.departamento.empresa.nombre;
      })
  }

  btnCancelar(): void {
    localStorage.setItem('codigo', this.codigoPaciente + "");
    this.router.navigate(["list-consulta-preventiva"]);
  }

  getDatosUser(): void {
    let usuarioLogin = localStorage.getItem('usuariologin');
    this.usuarioLogin = String(usuarioLogin);

    this.service.getUsuarioLoginUP(this.usuarioLogin)
      .subscribe(data => {
        console.log("ENTRO USRER");
        //this.usuario = data;
        this.nombreUsuario = data.nombre;
      })
  }

}
