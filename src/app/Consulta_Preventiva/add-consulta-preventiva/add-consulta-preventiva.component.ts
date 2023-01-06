import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';
import { FormControl } from '@angular/forms';
import { RevisionActual } from 'src/app/Modelo/RevisionActual';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';

@Component({
  selector: 'app-add-consulta-preventiva',
  templateUrl: './add-consulta-preventiva.component.html',
  styleUrls: ['./add-consulta-preventiva.component.css']
})
export class AddConsultaPreventivaComponent implements OnInit {

  @ViewChild("addconsultaperiodicafocus") addconsultaperiodicafocus: ElementRef;

  @ViewChild("myModalExamenElectrocardiograma", { static: false }) myModalExamenElectrocardiograma: TemplateRef<any>;
  @ViewChild("myModalExamenEspirometria", { static: false }) myModalExamenEspirometria: TemplateRef<any>;
  @ViewChild("myModalExamenLaboratorio", { static: false }) myModalExamenLaboratorio: TemplateRef<any>;
  @ViewChild("myModalExamenAudiometria", { static: false }) myModalExamenAudiometria: TemplateRef<any>;
  @ViewChild("myModalExamenRadiologia", { static: false }) myModalExamenRadiologia: TemplateRef<any>;
  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  //@ViewChild("myModalSindrome", { static: false }) myModalSindrome: TemplateRef<any>;

  @ViewChild("myModalInsertDiagnostico", { static: false }) myModalInsertDiagnostico: TemplateRef<any>;

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


  diagnosticoSelect = new Set<Diagnostico>();
  sindromeSelect = new Set<Sindrome>();

  displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];
  dataSource = new MatTableDataSource<Sindrome>();
  sindromes: Sindrome[];

  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];

  edades: number[] = [25, 30, 35, 40, 45, 50, 55, 60, 65];
  mujeres: number[] = [0, 2, 3, 5, 8, 12, 15, 17, 18];
  hombres: number[] = [0, 3, 7, 11, 15, 20, 26, 32, 38];

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


  codigoConsultaPreventiva: number;
  codigoPaciente: number;
  cargito: String;
  banderaEditcp: String;
  messageResponse: String;

  ceduNombApellPaciente: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;
  peso: number;
  talla: number;

  oidoMejor: number;
  oidoPeor: number;
  perdidaGlobalOidIqz: number
  perdidaGlobalOidDere: number

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

  i: number;
  edadPaciente: number;
  resultadoEliIzquierdo: number;
  pacienteSexo: String;
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
    this.titulo = "REGISTRAR CONSULTA PERIÓDICA";
    this.formattedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    this.fechitaActual = new Date(this.formattedDate);

    //this.consultaMedica.fecha = this.now;

    this.consultaPreventiva.fecha = this.now;
    this.examenLaboratorio.fecha = this.now;
    this.electrocardiograma.fecha = this.now;
    this.espirometria.fecha = this.now;
    this.audiometria.fecha = this.now;
    this.radiologia.fecha = this.now;

    //this.getNombrePaciente();
    //this.verExamenInicial();
    this.getHistorialPorPaciente();
    //this.getNombrePaciente();
    this.saveOrEditCP();

  }
  ngAfterViewInit() {
    this.addconsultaperiodicafocus.nativeElement.focus();
  }

  saveOrEditCP(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR CONSULTA PERIÓDICA";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarConsulta();
      //this.getHistorialPorPaciente();
    } else {
      this.getNombrePaciente();
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

  guardarConsultaPreventiva(): void {
    this.saveExamenLaboratorio();
    console.log("Inser Paceinte: " + this.paciente.nombre)
    this.consultaPreventiva.paciente = this.paciente;
    console.log("Insertado Paceinte 002: " + this.consultaPreventiva.paciente)
    //this.consultaPreventiva.diagnostico = this.diagnostico;
    this.consultaPreventiva.examenFisico = this.examenFisico;
    this.consultaPreventiva.examenLaboratorio = this.examenLaboratorio;
    this.consultaPreventiva.electrocardiograma = this.electrocardiograma;
    this.consultaPreventiva.espirometria = this.espirometria;
    this.consultaPreventiva.audiometria = this.audiometria;
    this.consultaPreventiva.radiologia = this.radiologia

    this.consultaPreventiva.revisionActual = this.revisionActual;
    this.consultaPreventiva.examenGeneral = this.examenGeneralAdd;

    this.factorRiesgoPuestoTrabajo.fisico = this.selectedFisicosFRPT + "";
    this.factorRiesgoPuestoTrabajo.mecanico = this.selectedMecanicosFRPT + "";
    this.factorRiesgoPuestoTrabajo.quimico = this.selectedQuimicosFRPT + "";
    this.factorRiesgoPuestoTrabajo.biologico = this.selectedBiologicosFRPT + "";
    this.factorRiesgoPuestoTrabajo.ergonomico = this.selectedErgonomicoFRPT + "";
    this.factorRiesgoPuestoTrabajo.psicosocial = this.selectedPsicosocialFRPT + "";
    this.consultaPreventiva.factorRiesgoPuestoTrabajo = this.factorRiesgoPuestoTrabajo;


    this.service.createConsultaPreventiva(this.consultaPreventiva)
      .subscribe(data => {
        console.log(data.codigo)
        //this.puestoTrabajo = data;
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        this.router.navigate(["list-consulta-preventiva"]);
        this.guardarHistorial();
        alert(this.messageResponse);
        //this.router.navigate(["list-paciente"])
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

  editarConsulta(): void {
    let codigoConsulta = localStorage.getItem('codigoConsulta');
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

  /*

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
  */

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

        this.consultaPreventiva.diagnosticoCie = this.auxDiagnosticoGeneral

        this.consultaPreventiva.diagnosticoCie = this.auxDiagnosrtico1 + "\n" + this.auxDiagnosrtico2 +
          "\n" + this.auxDiagnosrtico3 + "\n" + this.auxDiagnosrtico4 + "\n" + this.auxDiagnosrtico5;

        this.diagnostico = new Diagnostico();

      }

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
    this.service.getDiagnosticoFinal(this.diagnostico.nombre)
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


  btnCancelar(): void {
    localStorage.setItem('codigo', this.codigoPaciente + "");
    this.router.navigate(["list-consulta-preventiva"]);
  }

  /*
  actualizarConsultaPreventiva(): void {
    //console.log("Daifnostico " + this.diagnostico.codigo)
    //this.consulta.diagnostico = this.diagnostico;
    this.service.updateConsultaPreventiva(this.consultaPreventiva)
      .subscribe(data => {
        this.consultaPreventiva = data;
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
          this.consultaPreventiva.electrocardiograma = data;
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

    /*
    let cedula = localStorage.getItem('cedula');
    let nombre = localStorage.getItem('nombre');
    let apellido = localStorage.getItem('apellido');
    this.ceduNombApellPaciente = (String(nombre) + "  " + String(apellido));
    //console.log("nombre " + this.ceduNombApellPaciente)
    */

    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.edadPaciente = data.edad
        this.pacienteSexo = data.sexo;
        this.cargito = data.cargo.nombre;
        this.ceduNombApellPaciente = (String(data.nombre) + " " + String(data.apellido));
        //this.ceduNombApellPaciente = (String(nombre) + "  " + String(apellido));
        console.log("01212 " + this.paciente.nombre);
        console.log("edad paciente " + data.edad);
        console.log("edad paciente " + data.sexo);
      })
  }

  /*
  verExamenInicial(): void {
    console.log("codigo paciente para ecamen inicial: " + this.codigoPaciente);
    this.service.getExamenInicialCodigo(this.codigoPaciente)
      .subscribe(data => {
        if (data == null)
          this._snackBar.open('Paciente no tiene examen de Inicio..!', 'Examen Inicial', { duration: 3000 });
        else
          this.examenInicial = data;
      })
  }
  */

  calculoIndiceMasaCorporal() {
    this.peso = this.consultaPreventiva.peso;
    this.talla = this.consultaPreventiva.talla;

    this.consultaPreventiva.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    console.log('res_masaCorporal', this.consultaPreventiva.masaCorporal);

    if (this.consultaPreventiva.masaCorporal < 18.5) {
      this.consultaPreventiva.estadoNutricional = "PESO BAJO";
    } else if (this.consultaPreventiva.masaCorporal >= 18.5 && this.consultaPreventiva.masaCorporal < 30) {
      this.consultaPreventiva.estadoNutricional = "PESO NORMAL";
    } else if (this.consultaPreventiva.masaCorporal >= 30) {
      this.consultaPreventiva.estadoNutricional = "OBESIDAD";
    }

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

    console.log("oidoIzquierdoA500Hz " + this.audiometria.oidoIzquierdoA500Hz);
    console.log("oidoIzquierdoA100Hz " + this.audiometria.oidoIzquierdoA1000Hz);
    console.log("oidoIzquierdoA200Hz " + this.audiometria.oidoIzquierdoA2000Hz);

    this.audiometria.valorSalOidoI = (this.audiometria.oidoIzquierdoA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoIzquierdoA2000Hz) / 3;

    console.log("oidoIzquierdoA200Hz " + this.audiometria.valorSalOidoI);

    this.audiometria.valorSalOidoD = (this.audiometria.oidoDerechaA500Hz +
      this.audiometria.oidoDerechaA1000Hz +
      this.audiometria.oidoDerechaA2000Hz) / 3;

    if (this.audiometria.valorSalOidoI < 16) {
      this.audiometria.resultadoSalI = "A -NORMAL"
    } else if (this.audiometria.valorSalOidoI >= 16 && this.audiometria.valorSalOidoI <= 30) {
      this.audiometria.resultadoSalI = "B -LIMITES NORMALES"
    } else if (this.audiometria.valorSalOidoI >= 31 && this.audiometria.valorSalOidoI <= 45) {
      this.audiometria.resultadoSalI = "C -SORDERA MODERADA/LIGERA"
    } else if (this.audiometria.valorSalOidoI >= 46 && this.audiometria.valorSalOidoI <= 60) {
      this.audiometria.resultadoSalI = "D -SORDERA NOTABLE"
    } else if (this.audiometria.valorSalOidoI >= 61 && this.audiometria.valorSalOidoI <= 90) {
      this.audiometria.resultadoSalI = "E -GRAVE EMPEORAMIENTO"
    } else if (this.audiometria.valorSalOidoI > 90) {
      this.audiometria.resultadoSalI = "F -SORDERA PROFUNDA"
    }

    if (this.audiometria.valorSalOidoD < 16) {
      this.audiometria.resultadoSalD = "A -NORMAL"
    } else if (this.audiometria.valorSalOidoD >= 16 && this.audiometria.valorSalOidoD <= 30) {
      this.audiometria.resultadoSalD = "B -LIMITES NORMALES"
    } else if (this.audiometria.valorSalOidoD >= 31 && this.audiometria.valorSalOidoD <= 45) {
      this.audiometria.resultadoSalD = "C -SORDERA MODERADA/LIGERA"
    } else if (this.audiometria.valorSalOidoD >= 46 && this.audiometria.valorSalOidoD <= 60) {
      this.audiometria.resultadoSalD = "D -SORDERA NOTABLE"
    } else if (this.audiometria.valorSalOidoD >= 61 && this.audiometria.valorSalOidoD <= 90) {
      this.audiometria.resultadoSalD = "E -GRAVE EMPEORAMIENTO"
    } else if (this.audiometria.valorSalOidoD > 90) {
      this.audiometria.resultadoSalD = "F -SORDERA PROFUNDA"
    }

    // CALCULO P G A  

    this.audiometria.valorPgaOidoI = (this.audiometria.oidoIzquierdoA500Hz +
      this.audiometria.oidoIzquierdoA1000Hz +
      this.audiometria.oidoIzquierdoA2000Hz +
      this.audiometria.oidoIzquierdoA3000Hz);

    this.audiometria.valorPgaOidoD = (this.audiometria.oidoDerechaA500Hz +
      this.audiometria.oidoDerechaA1000Hz +
      this.audiometria.oidoDerechaA2000Hz +
      this.audiometria.oidoDerechaA3000Hz);

    this.perdidaGlobalOidIqz = ((this.audiometria.valorPgaOidoI / 4) * 1.5) - 25;
    this.perdidaGlobalOidDere = ((this.audiometria.valorPgaOidoD / 4) * 1.5) - 25;

    if (this.perdidaGlobalOidIqz < 0) {
      this.audiometria.perdidaPgaOidoI = 0;
    } else {
      this.audiometria.perdidaPgaOidoI = this.perdidaGlobalOidIqz;
    }
    if (this.perdidaGlobalOidDere < 0) {
      this.audiometria.perdidaPgaOidoD = 0;
    } else {
      this.audiometria.perdidaPgaOidoD = this.perdidaGlobalOidDere;
    }

    // CALCULO TOTAL de P.G. A

    if (this.audiometria.perdidaPgaOidoI > this.audiometria.perdidaPgaOidoD) {
      this.oidoPeor = this.audiometria.perdidaPgaOidoI
      this.oidoMejor = this.audiometria.perdidaPgaOidoD;
    } else {
      this.oidoMejor = this.audiometria.perdidaPgaOidoI;
      this.oidoPeor = this.audiometria.perdidaPgaOidoD;
    }

    console.log("oido mejor: " + this.oidoMejor);
    console.log("oido mejor: " + this.oidoPeor);

    this.audiometria.perdidaPgaTotal = (((5 * (this.oidoMejor) + (1 * (this.oidoPeor)))) / 6);


    // CALCULO ELI

    if (this.pacienteSexo === 'FEMENINO') {
      console.log("FEMENINO");
      for (this.i = 0; this.i < this.edades.length; this.i++) {
        if (this.edadPaciente == this.edades[this.i] || this.edadPaciente < this.edades[this.i + 1]) {
          this.audiometria.valorEliOidoI = this.audiometria.oidoIzquierdoA4000Hz - this.mujeres[this.i];
          this.audiometria.valorEliOidoD = this.audiometria.oidoDerechaA4000Hz - this.mujeres[this.i];
          this.i = this.edades.length;
        }
      }
    } else {
      console.log("masculino");
      for (this.i = 0; this.i < this.edades.length; this.i++) {
        if (this.edadPaciente == this.edades[this.i] || this.edadPaciente < this.edades[this.i + 1]) {
          this.audiometria.valorEliOidoI = this.audiometria.oidoIzquierdoA4000Hz - this.hombres[this.i];
          this.audiometria.valorEliOidoD = this.audiometria.oidoDerechaA4000Hz - this.hombres[this.i];
          this.i = this.edades.length;
        }
      }
    }

    if (this.audiometria.valorEliOidoI < 8) {
      this.audiometria.resultadoEliI = "A - NORMAL / EXCELENTE"
    } else if (this.audiometria.valorEliOidoI >= 8 && this.audiometria.valorEliOidoI <= 14) {
      this.audiometria.resultadoEliI = "B - NORMAL / BUENA"
    } else if (this.audiometria.valorEliOidoI >= 15 && this.audiometria.valorEliOidoI <= 22) {
      this.audiometria.resultadoEliI = "C - NORMAL"
    } else if (this.audiometria.valorEliOidoI >= 23 && this.audiometria.valorEliOidoI <= 29) {
      this.audiometria.resultadoEliI = "D - Sospecha Trauma Acustico"
    } else if (this.audiometria.valorEliOidoI > 29) {
      this.audiometria.resultadoEliI = "E - Claro Indicio Trauma Acustico "
    }

    if (this.audiometria.valorEliOidoD < 8) {
      this.audiometria.resultadoEliD = "A - NORMAL / EXCELENTE"
    } else if (this.audiometria.valorEliOidoD >= 8 && this.audiometria.valorEliOidoD <= 14) {
      this.audiometria.resultadoEliD = "B - NORMAL / BUENA"
    } else if (this.audiometria.valorEliOidoD >= 15 && this.audiometria.valorEliOidoD <= 22) {
      this.audiometria.resultadoEliD = "C - NORMAL"
    } else if (this.audiometria.valorEliOidoD >= 23 && this.audiometria.valorEliOidoD <= 29) {
      this.audiometria.resultadoEliD = "D - Sospecha Trauma Acustico"
    } else if (this.audiometria.valorEliOidoD >= 30) {
      this.audiometria.resultadoEliD = "E - Claro Indicio Trauma Acustico "
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
