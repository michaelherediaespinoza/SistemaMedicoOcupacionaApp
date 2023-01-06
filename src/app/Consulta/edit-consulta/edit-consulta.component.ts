import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

import { formatDate } from '@angular/common';
import { Paciente } from 'src/app/Modelo/Paciente';
import { MatDialog } from '@angular/material/dialog';
import { Sindrome } from 'src/app/Modelo/Sindrome';
import { MatTableDataSource } from '@angular/material/table';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { PuestoTrabajo } from 'src/app/Modelo/PuestoTrabajo';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-consulta',
  templateUrl: './edit-consulta.component.html',
  styleUrls: ['./edit-consulta.component.css']
})
export class EditConsultaComponent implements OnInit {

  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalSindrome", { static: false }) myModalSindrome: TemplateRef<any>;


  sindromes: Sindrome[];
  dataSource = new MatTableDataSource<Sindrome>();
  displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];

  diagnosticos: Diagnostico[];
  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];

  sindromeSelect = new Set<Sindrome>();
  diagnosticoSelect = new Set<Diagnostico>();

  paciente: Paciente = new Paciente();
  consultaMedica: ConsultaMedica = new ConsultaMedica();
  sindrome: Sindrome = new Sindrome();
  diagnostico: Diagnostico = new Diagnostico();
  puestoTrabajo: PuestoTrabajo = new PuestoTrabajo();

  examenInicial: ExamenInicial = new ExamenInicial();


  formattedDate: any;
  codigo2: number;
  ceduNombApellPaciente: String;

  peso: number;
  talla: number;
  masaCorporal: number;

  //para editar la consulta
  codigoConsulta: number;

  codigoPaciente: number;

  cargo: String;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.getAllPacientes();
    this.formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.consultaMedica.fecha = this.formattedDate;
    //this.GetNombrePaciente();
    //this.selectedEstadoNutri;

    this.editarConsulta();
    this.verExamenInicial();
    //this.consulta.diagnostico.sindrome.nombre

  }

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

  openDialogDiagnostico() {
    this.diagnosticoSelect = new Set<Diagnostico>();
    const dialogRef = this.dialog.open(this.myModalDiagnostico, { width: '60%', panelClass: 'icon-outside', });
    this.getAllDiagnostico();

    dialogRef.afterClosed().subscribe(result => {

      for (let diagnostic of this.diagnosticoSelect) {
        this.diagnostico = diagnostic;
      }

      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  /*
  dialogSindrome(row: any) {
    //this.dialog.after
    this.sindromeSelect.add(row)
    //this.dialog.close;
  }
  */

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


  calculoIndiceMasaCorporal() {
    this.peso = this.consultaMedica.peso;
    this.talla = this.consultaMedica.talla;
    //this.masaCorporal = this.consulta.masaCorporal;

    this.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    this.consultaMedica.masaCorporal = this.masaCorporal;
    console.log('res_masaCorporal', this.masaCorporal);

    if (this.masaCorporal < 18.5) {
      this.consultaMedica.estadoNutricional = "PESO BAJO";
    } else if (this.masaCorporal >= 18.5 && this.masaCorporal < 30) {
      this.consultaMedica.estadoNutricional = "PESO NORMAL";
    } else if (this.masaCorporal >= 30) {
      this.consultaMedica.estadoNutricional = "OBESIDAD";
    }

  }

  GetNombrePaciente() {
    let codigo = localStorage.getItem('codigo');
    this.codigo2 = Number(codigo);
    console.log("codigooooo " + this.codigo2)
    console.log("000012 " + this.service.getPacienteId(this.codigo2))

    let cedula = localStorage.getItem('cedula');
    let nombre = localStorage.getItem('nombre');
    let apellido = localStorage.getItem('apellido');
    this.ceduNombApellPaciente = (String(cedula) + "   " + String(nombre) + "  " + String(apellido));
    console.log("nombre " + this.ceduNombApellPaciente)

    this.service.getPacienteId(this.codigo2)
      .subscribe(data => {
        this.paciente = data;
        console.log("01212 " + this.paciente.nombre)
      })
  }


  editarConsulta() {
    let codigo = localStorage.getItem('codigo');
    this.codigoConsulta = Number(codigo);
    console.log("codigooooo " + this.codigoConsulta)
    console.log("000012 " + this.service.getConsultaId(this.codigoConsulta))
    this.service.getConsultaId(this.codigoConsulta)
      .subscribe(data => {
        this.consultaMedica = data;
        //this.sindrome = data.diagnostico.sindrome;
       // this.diagnostico = data.diagnostico;
        this.paciente = data.paciente;
        this.cargo = data.paciente.cargo.nombre;
        //console.log("antes del IF " + data.puestoTrabajo.valoracion)

        /*
        if (data.puestoTrabajo == null)
          this.puestoTrabajo.valoracion = "";
        //console.log("entro dento del IF " + data.puestoTrabajo)
        else
          this.puestoTrabajo = data.puestoTrabajo

        */

      })
  }

  verExamenInicial(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    this.service.getExamenInicialCodigo(this.codigoPaciente)
      .subscribe(data => {
        if (data == null)
          this._snackBar.open('Paciente no tiene examen de Inicio..!', 'Examen Inicial', { duration: 3000 });
        else
          this.examenInicial = data;
      })
  }

  actualizarConsulta(consultaMedica: ConsultaMedica) {
    //console.log("Daifnostico " + this.diagnostico.codigo)
    //this.consulta.diagnostico = this.diagnostico;
    this.service.updateConsulta(consultaMedica)
      .subscribe(data => {
        this.consultaMedica = data;
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        localStorage.setItem('nombre', this.paciente.nombre.toString());
        alert("Se actualizo con exito...!!!");
        this.router.navigate(["list-consulta"])
      })
  }

  // NO UTILIZADOOO
  actualizarPuesto(puestoTrabajo: PuestoTrabajo) {
    //console.log("Codigo Consulta " + this.consulta.codigo);
    puestoTrabajo.consultaMedica = this.consultaMedica;
    this.service.updatePuestoTrabajo(puestoTrabajo)
      .subscribe(data => {
        console.log("DATA DE PEUSTO TR", data);
        //this.puestoTrabajo = data;
        alert("Se Agrego con Exito PUESTO DE TRABAJO...!!!");
        //this.router.navigate(["list-paciente"])
      })
  }


}
