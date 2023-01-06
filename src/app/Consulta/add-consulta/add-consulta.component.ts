import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/Modelo/Consulta';
import { ServiceService } from 'src/app/Service/service.service';

import { DatePipe, formatDate } from '@angular/common';
import { Paciente } from 'src/app/Modelo/Paciente';
import { MatDialog } from '@angular/material/dialog';
import { Sindrome } from 'src/app/Modelo/Sindrome';
import { MatTableDataSource } from '@angular/material/table';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { PuestoTrabajo } from 'src/app/Modelo/PuestoTrabajo';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { Historial } from 'src/app/Modelo/Historial';

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.component.html',
  styleUrls: ['./add-consulta.component.css'],
  providers: [DatePipe]
})
export class AddConsultaComponent implements OnInit {

  @ViewChild("addconsultafocus") addconsultafocus: ElementRef;

  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalInsertDiagnostico", { static: false }) myModalInsertDiagnostico: TemplateRef<any>;

  diagnosticosadd: Array<Diagnostico> = [];
  //diag: Diagnostico[];
  //antecedenteTrabajoadd: Array<Diagnostico> = [];

  //sindromes: Sindrome[];
  //dataSource = new MatTableDataSource<Sindrome>();
  //displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];

  diagnosticos: Diagnostico[];
  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];

  sindromeSelect = new Set<Sindrome>();
  diagnosticoSelect = new Set<Diagnostico>();

  paciente: Paciente = new Paciente();
  consultaMedica: ConsultaMedica = new ConsultaMedica();
  examenInicial: ExamenInicial = new ExamenInicial();
  sindrome: Sindrome = new Sindrome();

  diagnostico: Diagnostico = new Diagnostico();
  puestoTrabajo: PuestoTrabajo = new PuestoTrabajo();

  examenFisico: ExamenFisico = new ExamenFisico();
  historial: Historial = new Historial();

  formattedDate: any;
  ceduNombApellPaciente: String;

  codigoconsultaMedica: number;
  codigoPaciente: number;
  banderaEditcp: String;
  messageResponse: String;
  titulo: String;

  peso: number;
  talla: number;
  masaCorporal: number;
  fechitaActual: Date;
  fechitaActual2: Date;

  //nombreDiagnostico: String;

  now = new Date();

  //estadoNutrional: String;

  //codigoSindrome: String;
  //nombereSindrome: String;

  idMaxConsulta: number;

  cargo: String;


  auxDiagnosrtico1: String;
  auxDiagnosrtico2: String = "";
  auxDiagnosrtico3: String = "";
  auxDiagnosrtico4: String = "";
  auxDiagnosrtico5: String = "";
  auxDiagnosticoGeneral: String;
  indexDiagnostico = 1;

  constructor(private datePipe: DatePipe, private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR CONSULTA MÉDICA GENERAL";
    this.formattedDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    //this.fechitaActual = new Date(this.formattedDate);
    //let today = new Date().toISOString().slice(0, 10);

    //this.fechitaActual2 = new Date(today);

    this.consultaMedica.fecha = this.now;

    //this.getNombrePaciente();
    this.getHistorialPorPaciente();
    this.saveOrEditCM();
    //this.verExamenInicial();
    //this.selectedEstadoNutri;

  }

  ngAfterViewInit() {
    this.addconsultafocus.nativeElement.focus();
  }

  saveOrEditCM(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR CONSULTA MÉDICA GENERAL";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarConsultaMedica();
      //this.getHistorialPorPaciente();
    } else {
      this.getNombrePaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }

  editarConsultaMedica(): void {
    let codigo = localStorage.getItem('codigoConsultaGeneral');
    this.codigoconsultaMedica = Number(codigo);
    console.log("codigo Consulta Medica " + this.codigoconsultaMedica)
    console.log("000012 " + this.service.getConsultaId(this.codigoconsultaMedica))
    this.service.getConsultaId(this.codigoconsultaMedica)
      .subscribe(data => {
        this.consultaMedica = data;
        this.paciente = data.paciente;
        this.examenFisico = data.examenFisico;
        this.ceduNombApellPaciente = (String(data.paciente.cedula) + " " + String(data.paciente.nombre) + " " + String(data.paciente.apellido));

      })
  }

  getHistorialPorPaciente(): void {
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigo Paciente getHistorial" + codigoPaciente);
    this.codigoPaciente = Number(codigoPaciente);
    this.service.getHistorialCodigo(this.codigoPaciente).subscribe(data => {
      this.historial = data;
      //this.antecedenteTrabajoadd = data.antecedenteTrabajo;
    })
  }

  btnCancelar(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    this.router.navigate(["list-consulta"]);
  }

  /*
  openDialogSindromesPorCapitulo() {
    this.sindromeSelect = new Set<Sindrome>();
    const dialogRef = this.dialog.open(this.myModalSindrome, { width: '60%' });
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

  openDialogDiagnostico() {
    this.diagnosticoSelect = new Set<Diagnostico>();
    const dialogRef = this.dialog.open(this.myModalDiagnostico, { width: '40%', panelClass: 'icon-outside' });
    this.getAllDiagnosticos();

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

        this.consultaMedica.diagnosticoCie = this.auxDiagnosticoGeneral

        this.consultaMedica.diagnosticoCie = this.auxDiagnosrtico1 + "\n" + this.auxDiagnosrtico2 +
          "\n" + this.auxDiagnosrtico3 + "\n" + this.auxDiagnosrtico4 + "\n" + this.auxDiagnosrtico5;

        this.diagnostico = new Diagnostico();

      }
    });
  }

  /*
  dialogSindrome(row: any) {
    //this.dialog.after
    this.sindromeSelect.add(row)
    //this.dialog.close;
  }
  */

  selectDiaganosticoDialog(row: any) {
    this.diagnosticoSelect.clear();
    this.diagnosticoSelect.add(row)
    //this.dialog.close;
  }
  /*
 // NO UTILIZADO
 getAllSindromesPorCapitulo = () => {
   this.service.getSindromesPorCapitulo(this.sindrome.capitulo)
     .subscribe(data => {
       this.sindromes = data;
       this.dataSource.data = this.sindromes;
       console.log('res', data);
     })
 }

 //getDIASNOSTICOS POR SINDROME  NO UTILIZADO
 
 getAllDiagnostico = () => {
   this.service.getDiagnostico(this.sindrome.nombre)
     .subscribe(data => {
       this.diagnosticos = data;
       this.dataSourceDiag.data = this.diagnosticos;
       console.log('res', data);
     })
 }

  */

  getAllDiagnosticos = () => {
    this.service.getDiagnosticoFinal(this.diagnostico.nombre)
      .subscribe(data => {
        this.diagnosticos = data;
        this.dataSourceDiag.data = this.diagnosticos;
        console.log('res', data);
      })
  }

  /*
  guardarExamenInicialPaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("codigo paciente para exman INICIAL: " + this.codigoPaciente);
    this.paciente.codigo = this.codigoPaciente;
    this.examenInicial.paciente = this.paciente;
    this.service.createExamenInicial(this.examenInicial)
      .subscribe(data => {
        this.examenInicial = data;
        // alert("Examen Inicial realizado");
        //localStorage.setItem('codigo', this.paciente.codigo.toString());
        //this.router.navigate(["list-pacientesparaconsulta"]);
      })
  }
  */

  guardarConsulta(): void {
    console.log("PAXIENTE CODIGO PARA SAVE C.M", this.paciente.codigo);
    this.consultaMedica.paciente = this.paciente;
    this.consultaMedica.examenFisico = this.examenFisico;

    //this.consultaMedica.diagnostico = this.diagnostico;
    //this.puestoTrabajo.consultaMedica = this.consultaMedica;
    console.log("PAXIENTE CODIGO PARA SAVE C.M 002", this.consultaMedica.paciente.codigo);

    this.service.createConsultaMedica(this.consultaMedica)
      .subscribe(data => {
        console.log("DATA DE C.M ", data.enfermedadActual);
        this.consultaMedica = data;
        this.guardarHistorial();
        //alert("Se Agrego con Exito CONSU. MEDI. !");
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        alert(this.messageResponse);
        this.router.navigate(["list-consulta"]);
      })
  }

  guardarHistorial(): void {
    this.historial.paciente = this.paciente;
    this.service.createHistorial(this.historial)
      .subscribe(data => {
        //console.log("DATA DE C.M ", data.enfermedadActual);
        this.historial = data;
        //alert("Se Agrego con Exito HISTORIAL !");
        //this.router.navigate(["list-consulta"]);
      })
  }

  addDiagnostico(): void {

    let diagnosObj = new Diagnostico();
    diagnosObj.codigo = this.diagnostico.codigo;
    diagnosObj.nombre = this.diagnostico.nombre;

    this.diagnosticosadd.push(diagnosObj);

    //this.consultaMedica.diagnosticos = this.diagnosticosadd;

    console.log("Tamaño de diagnostico" + this.diagnosticosadd.length);
    //this.consultaMedica.diagnosticoCie = "Nombre: " + this.diagnostico.nombre +" Codigo CIE 10: " + this.diagnostico.codigo + "\n";

    for (let index = 0; index < this.diagnosticosadd.length; index++) {
      const element = this.diagnosticosadd[index];
      console.log("Nombre Diagnostico " + element.nombre);

      var auxDiag = element.nombre;

      this.consultaMedica.diagnosticoCie = "for: " + element.nombre;
      // this.consultaMedica.diagnosticoCie = "Nombre: " + element.nombre +
      //    " Codigo CIE 10: " + element.codigo ;

    }

    // console.log("nombre diagnostico" + this.diagnosticosadd[1].nombre);

    //this.diagnostico.codigo = 0;
    //this.diagnostico.nombre = "" ;
    this.diagnostico = new Diagnostico();



  }

  addAntecedenteTrabajo(): void {


  }



  /*
 this.service.createPuestoTrabajo(this.puestoTrabajo)
   .subscribe(data => {
     console.log("DATA DE PEUSTO TR", data);
    // this.puestoTrabajo = data;
     alert("Se Agrego con Exito PUESTO DE TRABAJO...!!!");
     this.router.navigate(["list-consulta"]);
     //this.router.navigate(["list-paciente"])
   })

 
 if (this.puestoTrabajo.valoracion != null ) {
   //this.puestoTrabajo.consulta = this.consulta;
   this.service.createPuestoTrabajo(this.puestoTrabajo)
     .subscribe(data => {
       console.log("DATA DE PEUSTO TR", data);
       this.puestoTrabajo = data;
       alert("Se Agrego con Exito PUESTO DE TRABAJO...!!!");
       //this.router.navigate(["list-paciente"])
     })

 } else if (this.puestoTrabajo.valoracion == null) {
   this.service.createConsulta(this.consulta)
   .subscribe(data => {
     console.log("DATA DE PEUSTO TR", data)
    // this.consulta = data;
     alert("Se Agrego con Exito SOLO CONSULTA...!!!")
     //this.router.navigate(["list-paciente"])
   })
 
 }
 */
  //this.router.navigate(["list-consulta"]);



  public getConsultaIdMax(): void {
    this.service.getConsultaIdMax()
      .subscribe(data => {
        this.consultaMedica = data;
        this.idMaxConsulta = data.codigo;
        alert("COIGO DE CONSULTA 001" + data);
        alert("COIGO DE CONSULTA 002" + this.puestoTrabajo.consultaMedica);
        console.log("ID MAX CONSULTAAAA 00000003333", data.codigo)
        console.log("ID MAX CONSULTAAAA 000000044", this.idMaxConsulta)

        console.log("codigo de consulta " + this.consultaMedica.codigo);

        this.puestoTrabajo.consultaMedica = this.consultaMedica;

        this.service.createPuestoTrabajo(this.puestoTrabajo)
          .subscribe(data => {
            console.log("DATA DE PEUSTO TR", this.puestoTrabajo)
            this.puestoTrabajo = data;
            alert("Se Agrego con Exito PUESTO DE TRABAJO...!!!")
            //this.router.navigate(["list-paciente"])
          })
      })
  }


  calculoIndiceMasaCorporal() {
    this.peso = this.consultaMedica.peso;
    this.talla = this.consultaMedica.talla;
    //this.masaCorporal = this.consulta.masaCorporal;

    this.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    this.consultaMedica.masaCorporal = this.masaCorporal;
    console.log('res_masaCorporal', this.masaCorporal);

    if (this.masaCorporal < 18.5) {
      this.consultaMedica.estadoNutricional = "BAJO PESO";
    } else if (this.masaCorporal >= 18.5 && this.masaCorporal < 24.9) {
      this.consultaMedica.estadoNutricional = "PESO NORMAL";
    } else if (this.masaCorporal >= 25 && this.masaCorporal < 29.9) {
      this.consultaMedica.estadoNutricional = "SOBREPESO";
    } else if (this.masaCorporal >= 30 && this.masaCorporal < 34.5) {
      this.consultaMedica.estadoNutricional = "OBESIDAD GRADO I";
    } else if (this.masaCorporal >= 35 && this.masaCorporal < 39.9) {
      this.consultaMedica.estadoNutricional = "OBESIDAD GRADO II";
    } else if (this.masaCorporal > 40) {
      this.consultaMedica.estadoNutricional = "OBESIDAD GRADO III";
    }
  }

  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    //console.log("codigooooo " + this.codigoPaciente)
    console.log("resiviedo Cod Paci " + this.codigoPaciente)

    //let cedula = localStorage.getItem('cedula');
    //let nombre = localStorage.getItem('nombre');
    //let apellido = localStorage.getItem('apellido');
    //this.ceduNombApellPaciente = (String(cedula) + "   " + String(nombre) + "  " + String(apellido));
    //console.log("nombre " + this.ceduNombApellPaciente)

    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.cargo = data.cargo.nombre;
        console.log("01212 " + this.paciente.nombre)
        this.ceduNombApellPaciente = (String(data.cedula) + " " + String(data.nombre) + " " + String(data.apellido));
      })
  }
  public demo1TabIndex = 0;
  public bntSiguienteTab() {
    const tabCount = 3;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }

  /*
  verExamenInicial(): void {
    console.log("01212 VERCONSULTA " + this.paciente.nombre);
    this.service.getExamenInicialCodigo(this.codigoPaciente)
      .subscribe(data => {
        if (data == null)
          this._snackBar.open('Paciente no tiene examen de Inicio..!', 'Examen Inicial', { duration: 3000 });
        else
          this.examenInicial = data;
      })
  }
  */

}

