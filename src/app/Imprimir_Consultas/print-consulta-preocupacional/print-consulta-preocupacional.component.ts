import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';
import { FormControl } from '@angular/forms';
import { RevisionActual } from 'src/app/Modelo/RevisionActual';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';
import { MatSnackBar } from '@angular/material/snack-bar';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-print-consulta-preocupacional',
  templateUrl: './print-consulta-preocupacional.component.html',
  styleUrls: ['./print-consulta-preocupacional.component.css']
})
export class PrintConsultaPreocupacionalComponent implements OnInit {

  @ViewChild("myModalExamenElectrocardiograma", { static: false }) myModalExamenElectrocardiograma: TemplateRef<any>;
  @ViewChild("myModalExamenEspirometria", { static: false }) myModalExamenEspirometria: TemplateRef<any>;
  @ViewChild("myModalExamenLaboratorio", { static: false }) myModalExamenLaboratorio: TemplateRef<any>;
  @ViewChild("myModalExamenAudiometria", { static: false }) myModalExamenAudiometria: TemplateRef<any>;
  @ViewChild("myModalExamenRadiologia", { static: false }) myModalExamenRadiologia: TemplateRef<any>;
  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalInsertDiagnostico", { static: false }) myModalInsertDiagnostico: TemplateRef<any>;
  //@ViewChild("myModalSindrome", { static: false }) myModalSindrome: TemplateRef<any>;

  displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];
  dataSource = new MatTableDataSource<Sindrome>();
  sindromes: Sindrome[];

  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];

  fisicos = new FormControl();
  fisicoList: string[] = ['Temperatura alta', 'Temperatura baja', 'Radiación Lonizante', 'Radiación No Lonizante', 'Ruido', 'Vibracón', 'Iluminación', 'Ventilación', 'Fluido eléctrico', 'Otros.'];

  mecanicos = new FormControl();
  mecanicoList: string[] = ['Atrapamiento entre máquinas', 'Atrapamiento entre superficies', 'Atrapamiento entre objectos', 'Caídas de objetos', 'Caídas al mismo nivel', 'Contacto eléctrico', 'Proyección de fluidos', 'Pinchazos', 'Cortes', 'Atropellamiento', 'Choques', 'Otros.'];

  quimicos = new FormControl();
  quimicoList: string[] = ['Sólidos', 'Polvos', 'Humos', 'Liquidos', 'Vapores', 'Aerosoles', 'Neblinas', 'Gaseosos', 'Otros.'];

  biologicos = new FormControl();
  biologicoList: string[] = ['Virus', 'Hongos', 'Bacterias', 'Parásitos', 'Animales Selváticos', 'Otros.'];

  ergonomicos = new FormControl();
  ergonomicoList: string[] = ['Manual cargas', 'Movimientos Repetitivos', 'Posturas Forzadas', 'Trabajos con PVD', 'Otros.'];

  psicososiales = new FormControl();
  psicososialList: string[] = ['Sobrecarga Laboral', 'Monotonía del Trabajo', 'Alta responsabilidad', 'Conflictos de Rol', 'Turnos Rotativos', 'Relaciones Interpersonales', 'Inestabilidad Laboral', 'Otros.'];

  consultaPreocupacional: ConsultaPreocupacional = new ConsultaPreocupacional();
  electrocardiograma: Electrocardiograma = new Electrocardiograma();
  examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
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


  diagnosticoSelect = new Set<Diagnostico>();
  sindromeSelect = new Set<Sindrome>();

  codigoconsultaPreocupacional: number;
  codigoPaciente: number;
  banderaEditcp: String;
  messageResponse: String;

  cargito: String;
  empresita: String;
  ceduNombApellPaciente: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;
  peso: number;
  talla: number;
  codigo2: number;

  usuarioLogin: String;
  nombreUsuario: String;



  now = new Date();



  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.fechitaActual = new Date(this.formattedDate);

    this.consultaPreocupacional.fecha = this.now;
    this.examenLaboratorio.fecha = this.now;
    this.electrocardiograma.fecha = this.now;
    this.espirometria.fecha = this.now;
    this.audiometria.fecha = this.now;
    this.radiologia.fecha = this.now;

    //this.saveOrEditCP();
    this.verConsulta();
    this.getHistorialPorPaciente();
    this.getNombrePaciente();
    this.getDatosUser();

  }

  getHistorialPorPaciente(): void {
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigo Paciente getHistorial" + codigoPaciente);
    this.codigoPaciente = Number(codigoPaciente);
    this.service.getHistorialCodigo(this.codigoPaciente).subscribe(data => {
      this.historial = data;
      this.antecedenteTrabajoadd = data.antecedenteTrabajo;

    })
  }

  verConsulta(): void {
    let codigoCP = localStorage.getItem('codigoConsultaPreocupacional');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("reciviendo codigo consl preocupal " + codigoCP);
    this.codigoconsultaPreocupacional = Number(codigoCP);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigo Consulta preocupacional 002: " + codigoPaciente);
    this.service.getConsultaPreocupacionalCodigo(this.codigoconsultaPreocupacional)
      .subscribe(data => {
        this.consultaPreocupacional = data;
        this.examenFisico = data.examenFisico;
        //this.sindrome = data.diagnostico.sindrome;
        //this.diagnostico = data.diagnostico;
        this.revisionActual = data.revisionActual;
        //this.consultaPreocupacional.examenGeneral = data.examenGeneral;
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
    this.router.navigate(["list-consulta-preocupacional"]);
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
