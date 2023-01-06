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
import { ExamenMedicoRetiro } from 'src/app/Modelo/ExamenMedicoRetiro';
import { RevisionActual } from 'src/app/Modelo/RevisionActual';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';

@Component({
  selector: 'app-add-examen-medico-retiro',
  templateUrl: './add-examen-medico-retiro.component.html',
  styleUrls: ['./add-examen-medico-retiro.component.css']
})
export class AddExamenMedicoRetiroComponent implements OnInit {

  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalInsertDiagnostico", { static: false }) myModalInsertDiagnostico: TemplateRef<any>;


  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

  fisicos = new FormControl();
  fisicoList: string[] = ['NINGUNO','FÍSICO', 'MECÁNICO', 'QUIMICO', 'BIOLÓGICO', 'ERGONOMICO', 'PSICOSOCIAL'];

  //electrocardiograma: Electrocardiograma = new Electrocardiograma();
  //examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();


  factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo = new FactorRiesgoPuestoTrabajo();
  antecedenteTrabajo: AntecedenteTrabajo = new AntecedenteTrabajo();
  examenMedicoRetiro: ExamenMedicoRetiro = new ExamenMedicoRetiro();
  //revisionActual: RevisionActual = new RevisionActual();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
  examenFisico: ExamenFisico = new ExamenFisico();
  diagnostico: Diagnostico = new Diagnostico();
  historial: Historial = new Historial();
  paciente: Paciente = new Paciente();

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];


  diagnosticoSelect = new Set<Diagnostico>();
  sindromeSelect = new Set<Sindrome>();

  codigoexamenMedicoRetiro: number;
  codigoPaciente: number;
  banderaEditcp: String;
  messageResponse: String;

  ceduNombApellPaciente: String;
  cargito: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;
  peso: number;
  talla: number;
  codigo2: number;

  now = new Date();

  auxDiagnosrtico1: String;
  auxDiagnosrtico2: String = "";
  auxDiagnosrtico3: String = "";
  auxDiagnosrtico4: String = "";
  auxDiagnosrtico5: String = "";
  auxDiagnosticoGeneral: String;
  indexDiagnostico = 1;

  fisicoList22: string[] = [];
  selectedFisicosFRPT: String;
  nombress: string = "HOLA, HOLA2";

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR CONSULTA MEDICA DE RETIRO";
    this.formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.fechitaActual = new Date(this.formattedDate);

    this.examenMedicoRetiro.fecha = this.now;

    this.getNombrePaciente();
    this.getHistorialPorPaciente();
    this.saveOrEditEMR();

    //this.selectedFisicosFRPT = this.fisicoList22+"";
    //this.lerer();
 

  }

  // BORRAR
  lerer(): void {
    let antecedenteTrabajoObj = this.nombress;
    this.fisicoList = [];
    this.fisicoList.push(this.nombress);
  }


  saveOrEditEMR(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR CONSULTA MEDICA DE RETIRO";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarConsulta();
    } else {
      //this.getNombrePaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }

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

  /*
  //GUARDAR DATOS DE WEB
  saveExamenLaboratorio(): void {
    this.examenLaboratorio.hemograma = this.hemograma;
    this.examenLaboratorio.quimico = this.quimico;
    this.examenLaboratorio.serologia = this.serologia;
    this.examenLaboratorio.orina = this.orina;
    this.examenLaboratorio.heces = this.heces;
  }
  */

  guardarexamenMedicoRetiro(): void {
    //this.saveExamenLaboratorio();
    console.log("Inser Paceinte: " + this.paciente.nombre)
    this.examenMedicoRetiro.paciente = this.paciente;
    console.log("Insertado Paceinte 002: " + this.examenMedicoRetiro.paciente.codigo)

    this.examenMedicoRetiro.examenFisico = this.examenFisico;

    //this.examenMedicoRetiro.revisionActual = this.revisionActual;
    this.examenMedicoRetiro.examenGeneral = this.examenGeneralAdd;

    this.examenMedicoRetiro.riesgoRetiro =  this.selectedFisicosFRPT + ""; 

    this.service.createExamenMedicoRetiro(this.examenMedicoRetiro)
      .subscribe(data => {
        console.log(data.codigo)
        this.guardarHistorial();
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        alert(this.messageResponse);
        this.router.navigate(["list-examen-medico-retiro"]);
      })
  }

  guardarHistorial(): void {
    this.historial.paciente = this.paciente;
    this.historial.antecedenteTrabajo = this.antecedenteTrabajoadd;
    this.service.createHistorial(this.historial)
      .subscribe(data => {
        //console.log("DATA DE C.M ", data.enfermedadActual);
        this.historial = data;
        //alert("Se Agrego con Exito HISTORIAL !");
        //this.router.navigate(["list-consulta"]);
      })
  }

  editarConsulta(): void {
    let codigo = localStorage.getItem('codigo');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigoConslta " + codigoPaciente);
    this.codigoexamenMedicoRetiro = Number(codigo);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigoConslta222 " + codigoPaciente);
    this.service.getExamenMedicoRetiroCodigo(this.codigoexamenMedicoRetiro)
      .subscribe(data => {
        this.examenMedicoRetiro = data;
        this.examenFisico = data.examenFisico;
        this.examenGeneralAdd = data.examenGeneral;
        //this.sindrome = data.diagnostico.sindrome;

        this.fisicoList = [];
        this.fisicoList.push(data.riesgoRetiro+"");

        this.paciente = data.paciente;
        this.ceduNombApellPaciente = (String(data.paciente.nombre) + "  " + String(data.paciente.apellido));

      })
    /*
  this.service.getPacienteId(this.codigoPaciente)
    .subscribe(data => {
      this.paciente = data;
      this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
    })
    */
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


  openDialogInsertDiagnostico() {
    const dialogRef = this.dialog.open(this.myModalInsertDiagnostico, { width: '40%' });

    dialogRef.afterClosed().subscribe(result => {

      if (this.diagnostico.nombre || this.diagnostico.codigo == "") {
        this.service.insertDiagnostico(this.diagnostico)
          .subscribe(data => {
            this.diagnostico = data;
            this._snackBar.open('Diagostico Guardado!', 'Exitasamente', { duration: 4000 });
          })
      } else {
        this._snackBar.open('NO TIENE DATOS!', 'PARA INSERTAR', { duration: 4000 });
      }

    });
  }

  openDialogDiagnostico(): void {
    this.diagnosticoSelect = new Set<Diagnostico>();
    const dialogRef = this.dialog.open(this.myModalDiagnostico, { width: '50%', panelClass: 'icon-outside' });
    this.getAllDiagnostico();

    dialogRef.afterClosed().subscribe(result => {

      for (let diagnostic of this.diagnosticoSelect) {
        this.diagnostico = diagnostic;

        console.log('indexx: ', this.indexDiagnostico);

        if (this.indexDiagnostico == 1) {
          this.auxDiagnosrtico1 = "Diagnóstico 1: " + this.diagnostico.nombre + "  CIE 10: " + this.diagnostico.codigo;
          console.log('deoalgo diag: ', this.auxDiagnosrtico1);
        } else if (this.indexDiagnostico == 2) {
          this.auxDiagnosrtico2 = "Diagnóstico 2: " + this.diagnostico.nombre + "  CIE 10: " + this.diagnostico.codigo;
        } else if (this.indexDiagnostico == 3) {
          this.auxDiagnosrtico3 = "Diagnóstico 3: " + this.diagnostico.nombre + "  CIE 10: " + this.diagnostico.codigo;
        } else if (this.indexDiagnostico == 4) {
          this.auxDiagnosrtico4 = "Diagnóstico 4: " + this.diagnostico.nombre + "  CIE 10: " + this.diagnostico.codigo;
        } else if (this.indexDiagnostico == 5) {
          this.auxDiagnosrtico5 = "Diagnóstico 5: " + this.diagnostico.nombre + "  CIE 10: " + this.diagnostico.codigo;
        }
        this.indexDiagnostico++;

        console.log('indexx 222: ', this.indexDiagnostico);

        this.examenMedicoRetiro.diagnosticoCie = this.auxDiagnosticoGeneral

        this.examenMedicoRetiro.diagnosticoCie = this.auxDiagnosrtico1 + "\n" + this.auxDiagnosrtico2 +
          "\n" + this.auxDiagnosrtico3 + "\n" + this.auxDiagnosrtico4 + "\n" + this.auxDiagnosrtico5;

        this.diagnostico = new Diagnostico();

      }
    });
  }

  getAllDiagnostico = () => {
    this.service.getDiagnosticoFinal(this.diagnostico.nombre)
      .subscribe(data => {
        this.diagnosticos = data;
        this.dataSourceDiag.data = this.diagnosticos;
        console.log('res', data);
      })
  }



  /*
  actualizarexamenMedicoRetiro(): void {
    //console.log("Daifnostico " + this.diagnostico.codigo)
    //this.consulta.diagnostico = this.diagnostico;
    this.service.updateexamenMedicoRetiro(this.examenMedicoRetiro)
      .subscribe(data => {
        this.examenMedicoRetiro = data;
        alert("Se actualizo con exito...!!!");
        this.router.navigate(["list-pacientesparaconsulta"])
      })
  }
  
  guardarExamenFisco(): void {
    this.service.createExamenFisico(this.examenFisico)
      .subscribe(data => {
        console.log(this.examenFisico)
        //this.puestoTrabajo = data;
        alert("Se Agrego con Exito...!!!")
        //this.router.navigate(["list-paciente"])
      })
  }

  guardarExamenLaboratorio(): void {
    //console.log(this.examenLaboratorio.fecha)
    this.examenLaboratorio.hemograma = this.hemograma;
    this.examenLaboratorio.quimico = this.quimico;
    //this.examenLaboratorio.diagnostico = this.diagnostico;
    this.diagnostico.codigo = 1;
    //this.examenLaboratorio.diagnostico = this.diagnostico;
    try {
      this.service.createExamenLaboratorio(this.examenLaboratorio)
        .subscribe(data => {
          console.log(this.examenLaboratorio.fecha)
          this.examenLaboratorio = data;
          alert("Se Agrego con Exito...!!!");
          //this.router.navigate(["list-paciente"])
        })
    } catch (error) {
      console.error("Errorr: " + error)
    }
  }

  guardarElectrocardiograma(): void {
    try {
      this.service.createElectrocardiograma(this.electrocardiograma)
        .subscribe(data => {
          console.log("ESPI.. "+this.electrocardiograma.fecha)
          console.log("ESPI..  "+this.electrocardiograma.observaciones)
          this.electrocardiograma = data;
          this.examenMedicoRetiro.electrocardiograma = data;
          console.log("data 001.. "+ data.fecha)
          console.log("data 002..  "+ data.observaciones)
          alert("Se Agrego con Exito...!!!");
          //this.router.navigate(["list-paciente"])
        })
    } catch (error) {
      console.error("Errorr: " + error)
    }

  }

  */


  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("CODIO DE PACIENTE " + this.codigoPaciente);
    //console.log("codigooooo " + this.codigoPaciente)
    //console.log("000012 " + this.service.getPacienteId(this.codigoPaciente))

    let cedula = localStorage.getItem('cedula');
    let nombre = localStorage.getItem('nombre');
    let apellido = localStorage.getItem('apellido');
    //this.ceduNombApellPaciente = (String(nombre) + " " + String(apellido));
    //console.log("nombre " + this.ceduNombApellPaciente)
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.cargito = data.cargo.nombre;
        this.ceduNombApellPaciente = (String(data.nombre) + " " + String(data.apellido));
        console.log("01212 " + this.paciente.nombre);
        console.log("edad paciente " + data.edad);
        console.log("edad paciente " + data.sexo);
      })

  }


  btnCancelar(): void {
    localStorage.setItem('codigo', this.codigoPaciente + "");
    this.router.navigate(["list-pacientespara-emr"]);
  }

  calculoIndiceMasaCorporal() {
    this.peso = this.examenMedicoRetiro.peso;
    this.talla = this.examenMedicoRetiro.talla;

    this.examenMedicoRetiro.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    console.log('res_masaCorporal', this.examenMedicoRetiro.masaCorporal);

    if (this.examenMedicoRetiro.masaCorporal < 18.5) {
      this.examenMedicoRetiro.estadoNutricional = "PESO BAJO";
    } else if (this.examenMedicoRetiro.masaCorporal >= 18.5 && this.examenMedicoRetiro.masaCorporal < 30) {
      this.examenMedicoRetiro.estadoNutricional = "PESO NORMAL";
    } else if (this.examenMedicoRetiro.masaCorporal >= 30) {
      this.examenMedicoRetiro.estadoNutricional = "OBESIDAD";
    }

  }

  addAntecedenteTrabajo(): void {

    let antecedenteTrabajoObj = new AntecedenteTrabajo();
    antecedenteTrabajoObj.empresa = this.antecedenteTrabajo.empresa;
    antecedenteTrabajoObj.puestoTrabajo = this.antecedenteTrabajo.puestoTrabajo;
    antecedenteTrabajoObj.actividad = this.antecedenteTrabajo.actividad;
    antecedenteTrabajoObj.tiempoTrabajoMeses = this.antecedenteTrabajo.tiempoTrabajoMeses
    antecedenteTrabajoObj.riesgo = this.antecedenteTrabajo.riesgo;
    antecedenteTrabajoObj.observaciones = this.antecedenteTrabajo.observaciones;


    this.antecedenteTrabajoadd.push(antecedenteTrabajoObj);

    this.antecedenteTrabajo = new AntecedenteTrabajo();


    //this.consultaMedica.diagnosticos = this.diagnosticosadd;
    //this.historial.antecedenteTrabajo = this.antecedenteTrabajoadd;

    console.log("Tamaño de diagnostico" + this.antecedenteTrabajoadd.length);
    //this.consultaMedica.diagnosticoCie = "Nombre: " + this.diagnostico.nombre +" Codigo CIE 10: " + this.diagnostico.codigo + "\n";

  }


  addExamenGeneral(): void {

    let examenGeneralObj = new ExamenGeneral();
    examenGeneralObj.nombreExamen = this.examenGeneral.nombreExamen;
    examenGeneralObj.fecha = this.examenGeneral.fecha;
    examenGeneralObj.resultado = this.examenGeneral.resultado;

    this.examenGeneralAdd.push(examenGeneralObj);

    this.examenGeneral = new ExamenGeneral();

    console.log("Tamaño de diagnostico" + this.examenGeneralAdd.length);
    //this.consultaMedica.diagnosticoCie = "Nombre: " + this.diagnostico.nombre +" Codigo CIE 10: " + this.diagnostico.codigo + "\n";

  }


}
