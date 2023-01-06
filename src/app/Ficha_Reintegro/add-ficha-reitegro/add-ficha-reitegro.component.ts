import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { ServiceService } from 'src/app/Service/service.service';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ConsultaReintegro } from 'src/app/Modelo/ConsultaReintegro';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ficha-reitegro',
  templateUrl: './add-ficha-reitegro.component.html',
  styleUrls: ['./add-ficha-reitegro.component.css']
})
export class AddFichaReitegroComponent implements OnInit {

  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalInsertDiagnostico", { static: false }) myModalInsertDiagnostico: TemplateRef<any>;

  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

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

  //electrocardiograma: Electrocardiograma = new Electrocardiograma();
  //examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();


  factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo = new FactorRiesgoPuestoTrabajo();
  antecedenteTrabajo: AntecedenteTrabajo = new AntecedenteTrabajo();
  consultaReintegro: ConsultaReintegro = new ConsultaReintegro();
  //revisionActual: RevisionActual = new RevisionActual();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
  examenFisico: ExamenFisico = new ExamenFisico();
  diagnostico: Diagnostico = new Diagnostico();
  historial: Historial = new Historial();
  paciente: Paciente = new Paciente();

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];


  diagnosticoSelect = new Set<Diagnostico>();
  //sindromeSelect = new Set<Sindrome>();

  //codigoexamenMedicoRetiro: number;
  codigoconsultaReintegro: number;
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

  selectedFisicosFRPT: String;
  selectedMecanicosFRPT: String;
  selectedQuimicosFRPT: String;
  selectedBiologicosFRPT: String;
  selectedErgonomicoFRPT: String;
  selectedPsicosocialFRPT: String;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR CONSULTA REINTEGRO";
    this.formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.fechitaActual = new Date(this.formattedDate);

    this.consultaReintegro.fecha = this.now;

    this.getNombrePaciente();
    this.getHistorialPorPaciente();
    this.saveOrEditCR();

  }


  saveOrEditCR(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR CONSULTA REINTEGRO";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarConsulta();
    } else {
      //his.getNombrePaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }

  }


  guardarconsultaReintegro(): void {
    console.log("Inser Paceinte Nombre: " + this.paciente.nombre)
    this.consultaReintegro.paciente = this.paciente;
    console.log("Insertado Paceinte 002: " + this.consultaReintegro.paciente.codigo)

    //this.consultaReintegro.revisionActual = this.revisionActual;
    this.consultaReintegro.examenGeneral = this.examenGeneralAdd;
    this.consultaReintegro.examenFisico = this.examenFisico;

    this.service.createConsultaReintegro(this.consultaReintegro)
      .subscribe(data => {
        console.log(data.codigo)
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        alert(this.messageResponse);
        this.router.navigate(["list-ficha-reitegro"]);
        //this.router.navigate(["list-paciente"])
      })
  }

  editarConsulta(): void {
    let codigo = localStorage.getItem('codigo');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigoConslta " + codigoPaciente);
    this.codigoconsultaReintegro = Number(codigo);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigoConslta Final " + this.codigoconsultaReintegro);
    this.service.getConsultaReintegroCodigo(this.codigoconsultaReintegro)
      .subscribe(data => {
        this.consultaReintegro = data;
        this.examenFisico = data.examenFisico;
        this.examenGeneralAdd = data.examenGeneral;
        this.paciente = data.paciente;
        this.ceduNombApellPaciente = (String(data.paciente.nombre) + "  " + String(data.paciente.apellido));
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

  selectDiaganosticoDialog(row: any) {
    this.diagnosticoSelect.clear();
    this.diagnosticoSelect.add(row)
    //this.dialog.close;
  }


  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("CODIO DE PACIENTE " + this.codigoPaciente);
    //console.log("codigooooo " + this.codigo2)
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

        this.consultaReintegro.diagnosticoCie = this.auxDiagnosticoGeneral

        this.consultaReintegro.diagnosticoCie = this.auxDiagnosrtico1 + "\n" + this.auxDiagnosrtico2 +
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

  btnCancelar(): void {
    localStorage.setItem('codigo', this.codigoPaciente + "");
    this.router.navigate(["list-ficha-reitegro"]);
  }

  calculoIndiceMasaCorporal() {
    this.peso = this.consultaReintegro.peso;
    this.talla = this.consultaReintegro.talla;

    this.consultaReintegro.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    console.log('res_masaCorporal', this.consultaReintegro.masaCorporal);

    if (this.consultaReintegro.masaCorporal < 18.5) {
      this.consultaReintegro.estadoNutricional = "PESO BAJO";
    } else if (this.consultaReintegro.masaCorporal >= 18.5 && this.consultaReintegro.masaCorporal < 30) {
      this.consultaReintegro.estadoNutricional = "PESO NORMAL";
    } else if (this.consultaReintegro.masaCorporal >= 30) {
      this.consultaReintegro.estadoNutricional = "OBESIDAD";
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
