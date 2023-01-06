import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { ExamenMedicoInicial } from 'src/app/Modelo/ExamenMedicoInicial';

@Component({
  selector: 'app-add-examen-medico-inicial',
  templateUrl: './add-examen-medico-inicial.component.html',
  styleUrls: ['./add-examen-medico-inicial.component.css']
})
export class AddExamenMedicoInicialComponent implements OnInit {


  @ViewChild("myModalExamenElectrocardiograma", { static: false }) myModalExamenElectrocardiograma: TemplateRef<any>;
  @ViewChild("myModalExamenEspirometria", { static: false }) myModalExamenEspirometria: TemplateRef<any>;
  @ViewChild("myModalExamenLaboratorio", { static: false }) myModalExamenLaboratorio: TemplateRef<any>;
  @ViewChild("myModalExamenAudiometria", { static: false }) myModalExamenAudiometria: TemplateRef<any>;
  @ViewChild("myModalExamenRadiologia", { static: false }) myModalExamenRadiologia: TemplateRef<any>;
  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalSindrome", { static: false }) myModalSindrome: TemplateRef<any>;

  displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];
  dataSource = new MatTableDataSource<Sindrome>();
  sindromes: Sindrome[];

  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

  examenMedicoInicial: ExamenMedicoInicial = new ExamenMedicoInicial();
  //electrocardiograma: Electrocardiograma = new Electrocardiograma();
  examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();
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

  diagnosticoSelect = new Set<Diagnostico>();
  sindromeSelect = new Set<Sindrome>();

  banderaEditcp: String;
  messageResponse: String;
  getPacienteCodigo: number;
  codigoExamenMedicoInicial: number;

  ceduNombApellPaciente: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;
  peso: number;
  talla: number;

  oidoMejor: number;
  oidoPeor: number;

  fvc_med: number;
  fvc_pred: number;
  fvc_pred_total: number;
  fev1_med: number;
  fev1_pred: number;
  fev1_pred_total: number;
  ff_med: number;
  ff_pred: number;
  ff_pred_total: number;

  aux1: number; aux2: number; aux3: number; aux4: number; aux5: number; aux6: number; aux7: number; aux8: number;


  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR EXAMEN MEDICO INICIAL";
    this.formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.fechitaActual = new Date(this.formattedDate);
    this.examenMedicoInicial.fecha = this.fechitaActual;

    this.getDatosPaciente();
    this.verExamenInicial();
    this.saveOrEditexamenMedicoInicial();
  }

  saveOrEditexamenMedicoInicial(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR EXAMEN MEDICO INICIAL";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarExamenMedicoInicial();
      //this.getDatosPaciente();
    } else {
      this.getDatosPaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }

  //GUARDAR DATOS DE WEB
  saveExamenLaboratorio(): void {
    this.examenLaboratorio.hemograma = this.hemograma;
    this.examenLaboratorio.quimico = this.quimico;
    this.examenLaboratorio.serologia = this.serologia;
    this.examenLaboratorio.orina = this.orina;
    this.examenLaboratorio.heces = this.heces;
  }

  guardarExamenMedicoInicialPaciente(): void {
    this.examenMedicoInicial.paciente = this.paciente;
    this.saveExamenLaboratorio();
    console.log("Inser Paceinte: " + this.paciente.nombre)
    this.examenMedicoInicial.paciente = this.paciente;
    console.log("Insertado Paceinte 002: " + this.examenMedicoInicial.paciente)
    this.examenMedicoInicial.diagnostico = this.diagnostico;
    this.examenMedicoInicial.examenFisico = this.examenFisico;
    this.examenMedicoInicial.examenLaboratorio = this.examenLaboratorio;
    this.examenMedicoInicial.espirometria = this.espirometria;
    this.examenMedicoInicial.audiometria = this.audiometria;
    this.examenMedicoInicial.radiologia = this.radiologia
    this.service.createExamenMedicoInicial(this.examenMedicoInicial)
      .subscribe(data => {
        this.examenMedicoInicial = data;
        alert(this.messageResponse);
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        this.router.navigate(["list-examen-medico-inicial"]);
      })
  }

  editarExamenMedicoInicial(): void {
    let codigo = localStorage.getItem('codigo');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigoConslta " + codigoPaciente);
    this.codigoExamenMedicoInicial = Number(codigo);
    this.getPacienteCodigo = Number(codigoPaciente);
    console.log("codigoConslta222 " + codigoPaciente);
    this.service.getExamenMedicoInicialCodigo(this.codigoExamenMedicoInicial)
      .subscribe(data => {
        this.examenMedicoInicial = data;
        this.examenFisico = data.examenFisico;
        //this.sindrome = data.diagnostico.sindrome;
        this.diagnostico = data.diagnostico;
        this.examenLaboratorio = data.examenLaboratorio;

        this.hemograma = data.examenLaboratorio.hemograma;
        this.quimico = data.examenLaboratorio.quimico;
        this.serologia = data.examenLaboratorio.serologia;
        this.orina = data.examenLaboratorio.orina;
        this.heces = data.examenLaboratorio.heces;

        //this.electrocardiograma = data.electrocardiograma;
        this.espirometria = data.espirometria;
        this.audiometria = data.audiometria;
        this.radiologia = data.radiologia;

        this.paciente = data.paciente;
        this.ceduNombApellPaciente = (String(data.paciente.cedula) + "   " + String(data.paciente.nombre) + "  " + String(data.paciente.apellido));

      })
  }

  getDatosPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.getPacienteCodigo = Number(codigo);
    this.service.getPacienteId(this.getPacienteCodigo)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        console.log("01212 " + this.paciente.nombre)
      })
  }

  verExamenInicial(): void {
    this.service.getExamenInicialCodigo(this.getPacienteCodigo)
      .subscribe(data => {
        if (data == null)
          this.messageResponse = "Paciente no tiene examen de Inicio..!"
        else
          this.examenInicial = data;
      })
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientes-emi"]);
  }


  openDialogSindromesPorCapitulo(): void {
    this.sindromeSelect = new Set<Sindrome>();
    const dialogRef = this.dialog.open(this.myModalSindrome, { width: '50%', panelClass: 'icon-outside' });
    this.getAllSindromesPorCapitulo();

    dialogRef.afterClosed().subscribe(result => {
      for (let sindrom of this.sindromeSelect) {
        //sindrom.codigo;
        //sindrom.nombre;
        this.sindrome = sindrom;

      }
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  openDialogDiagnostico(): void {
    this.diagnosticoSelect = new Set<Diagnostico>();
    const dialogRef = this.dialog.open(this.myModalDiagnostico, { width: '50%', panelClass: 'icon-outside' });
    this.getAllDiagnostico();

    dialogRef.afterClosed().subscribe(result => {

      for (let diagnostic of this.diagnosticoSelect) {
        this.diagnostico = diagnostic;
      }

      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  selectDiaganosticoDialog(row: any) {
    this.diagnosticoSelect.clear();
    this.diagnosticoSelect.add(row)
    //this.dialog.close;
  }

  selectSindromeDialog(row: any) {
    this.sindromeSelect.clear();
    this.sindromeSelect.add(row)
    //this.dialog.close;
  }

  getAllSindromesPorCapitulo = () => {
    this.service.getSindromesPorCapitulo(this.sindrome.capitulo)
      .subscribe(data => {
        this.sindromes = data;
        this.dataSource.data = this.sindromes;
        console.log('res', data);
      })
  }

  getAllDiagnostico = () => {
    this.service.getDiagnostico(this.sindrome.nombre)
      .subscribe(data => {
        this.diagnosticos = data;
        this.dataSourceDiag.data = this.diagnosticos;
        console.log('res', data);
      })
  }

  openDialogExamenAudiometria(): void {
    const dialogRef = this.dialog.open(this.myModalExamenAudiometria, { width: '70%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        //this.guardarElectrocardiograma(this.electrocardiograma);
        //console.log(this.examenLaboratorio.fecha)
        console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  openDialogExamenRadiologia(): void {
    const dialogRef = this.dialog.open(this.myModalExamenRadiologia, { width: '50%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        //this.guardarElectrocardiograma(this.electrocardiograma);
        //console.log(this.examenLaboratorio.fecha)
        console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }


  openDialogExamenEspirometria(): void {
    const dialogRef = this.dialog.open(this.myModalExamenEspirometria, { width: '60%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        //this.guardarElectrocardiograma(this.electrocardiograma);
        //console.log(this.examenLaboratorio.fecha)
        console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  openDialogExamenElectrocardiograma(): void {
    const dialogRef = this.dialog.open(this.myModalExamenElectrocardiograma, { width: '50%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        //this.guardarElectrocardiograma(this.electrocardiograma);
        //console.log(this.examenLaboratorio.fecha)
        console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  openDialogExamenLaboratorio(): void {
    const dialogRef = this.dialog.open(this.myModalExamenLaboratorio, {
      width: '100%',
      height: 'auto',
      hasBackdrop: true,
      maxHeight: '700px', panelClass: 'icon-outside',
    });
    //this.getAllDiagnostico();

    dialogRef.afterClosed().subscribe(result => {
      //sthis.guardarExamenLaboratorio();
      console.log(this.examenLaboratorio.fecha)
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  

  calculoEspirometria(): void {

    this.fvc_pred_total = (this.fvc_med * 100) / this.fvc_pred;
    this.fev1_pred_total = (this.fev1_med * 100) / this.fev1_pred;
    this.ff_pred_total = (this.ff_med * 100) / this.ff_pred;

    this.espirometria.fvc = this.fvc_pred_total;
    this.espirometria.fev1 = this.fev1_pred_total;
    this.espirometria.relacionFV1_FVC = this.ff_pred_total;

    //  FVC
    console.log("valor FVC: " + this.fvc_pred_total);

    if (this.fvc_pred_total >= 80) {
      console.log("valor FVC 001: " + this.fvc_pred_total);
      this.espirometria.resultadoFVC = "NORMAL";
    } else if (this.fvc_pred_total >= 50 && this.fvc_pred_total < 80) {
      console.log("valor FVC 002: " + this.fvc_pred_total);
      this.espirometria.resultadoFVC = "RESTRICTIVO";
    } else if (this.fvc_pred_total >= 30 && this.fvc_pred_total < 50) {
      console.log("valor FVC 003: " + this.fvc_pred_total);
      this.espirometria.resultadoFVC = "OBSTRUCTIVO";
    }

    //  FEV1

    if (this.fev1_pred_total >= 80) {
      this.espirometria.resultadoFEV = "NORMAL";
    } else if (this.fev1_pred_total >= 50 && this.fev1_pred_total < 80) {
      this.espirometria.resultadoFEV = "RESTRICTIVO";
    } else if (this.fev1_pred_total >= 30 && this.fev1_pred_total < 50) {
      this.espirometria.resultadoFEV = "OBSTRUCTIVO";
    }

    if (this.espirometria.resultadoFVC === 'NORMAL' && this.espirometria.resultadoFEV === 'NORMAL') {
      this.espirometria.resultado = "NORMAL";
    } else if (this.espirometria.resultadoFVC === 'NORMAL' || this.espirometria.resultadoFVC === 'RESTRICTIVO'
      && this.espirometria.resultadoFEV === 'RESTRICTIVO' || this.espirometria.resultadoFEV === 'NORMAL') {
      this.espirometria.resultado = "RESTRICTIVO";
    } else if (this.espirometria.resultadoFVC === 'NORMAL' || this.espirometria.resultadoFVC === 'OBSTRUCTIVO'
      && this.espirometria.resultadoFEV === 'OBSTRUCTIVO' || this.espirometria.resultadoFEV === 'NORMAL') {
      this.espirometria.resultado = "OBSTRUCTIVO";
    } else {
      this.espirometria.resultado = "COMBINADO"
    }
  }


  calcularAudimetria(): void {

    // CALCULO SAL

    this.audiometria.valorSalOidoI = (this.audiometria.oidoIzquierdoA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoIzquierdoA2000Hz) / 3;

    this.audiometria.valorSalOidoD = (this.audiometria.oidoDerechaA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoDerechaA2000Hz) / 3;

    if (this.audiometria.valorSalOidoI < 8) {
      this.audiometria.resultadoSalI = "A - NORMAL / EXCELENTE"
    } else if (this.audiometria.valorSalOidoI >= 8 && this.audiometria.valorSalOidoI <= 14) {
      this.audiometria.resultadoSalI = "B - NORMAL / BUENA"
    } else if (this.audiometria.valorSalOidoI >= 15 && this.audiometria.valorSalOidoI <= 22) {
      this.audiometria.resultadoSalI = "C - NORMAL"
    } else if (this.audiometria.valorSalOidoI >= 23 && this.audiometria.valorSalOidoI <= 29) {
      this.audiometria.resultadoSalI = "D - Sospecha Trauma Acustico"
    } else if (this.audiometria.valorSalOidoI >= 30) {
      this.audiometria.resultadoSalI = "E - Claro Indicio Trauma Acustico "
    }

    if (this.audiometria.valorSalOidoD < 8) {
      this.audiometria.resultadoSalD = "A - NORMAL / EXCELENTE"
    } else if (this.audiometria.valorSalOidoD >= 8 && this.audiometria.valorSalOidoD <= 14) {
      this.audiometria.resultadoSalD = "B - NORMAL / BUENA"
    } else if (this.audiometria.valorSalOidoD >= 15 && this.audiometria.valorSalOidoD <= 22) {
      this.audiometria.resultadoSalD = "C - NORMAL"
    } else if (this.audiometria.valorSalOidoD >= 23 && this.audiometria.valorSalOidoD <= 29) {
      this.audiometria.resultadoSalD = "D - Sospecha Trauma Acustico"
    } else if (this.audiometria.valorSalOidoD >= 30) {
      this.audiometria.resultadoSalD = "E - Claro Indicio Trauma Acustico "
    }

    // CALCULO P G A  

    this.audiometria.valorPgaOidoI = (this.audiometria.oidoIzquierdoA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoIzquierdoA2000Hz +
      this.audiometria.oidoIzquierdoA3000Hz);

    this.audiometria.valorPgaOidoD = (this.audiometria.oidoDerechaA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoDerechaA2000Hz +
      this.audiometria.oidoDerechaA3000Hz);

    this.audiometria.perdidaPgaOidoI = ((this.audiometria.valorPgaOidoI / 4) * 1.5) - 25;
    this.audiometria.perdidaPgaOidoD = ((this.audiometria.valorPgaOidoD / 4) * 1.5) - 25;

    // CALCULO TOTAL 

    if (this.audiometria.perdidaPgaOidoI > this.audiometria.perdidaPgaOidoD) {
      this.oidoMejor = this.audiometria.valorPgaOidoI;
      this.oidoPeor = this.audiometria.valorPgaOidoD;
    } else {
      this.oidoPeor = this.audiometria.valorPgaOidoI;
      this.oidoMejor = this.audiometria.valorPgaOidoD;
    }

    this.audiometria.perdidaPgaTotal = ((5 * (this.oidoMejor) + (1 * (this.oidoPeor)))) / 6;

  }

  calculoIndiceMasaCorporal() {
    this.peso = this.examenMedicoInicial.peso;
    this.talla = this.examenMedicoInicial.talla;

    this.examenMedicoInicial.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    console.log('res_masaCorporal', this.examenMedicoInicial.masaCorporal);

    if (this.examenMedicoInicial.masaCorporal < 18.5) {
      this.examenMedicoInicial.estadoNutricional = "PESO BAJO";
    } else if (this.examenMedicoInicial.masaCorporal >= 18.5 && this.examenMedicoInicial.masaCorporal < 30) {
      this.examenMedicoInicial.estadoNutricional = "PESO NORMAL";
    } else if (this.examenMedicoInicial.masaCorporal >= 30) {
      this.examenMedicoInicial.estadoNutricional = "OBESIDAD";
    }

  }

}