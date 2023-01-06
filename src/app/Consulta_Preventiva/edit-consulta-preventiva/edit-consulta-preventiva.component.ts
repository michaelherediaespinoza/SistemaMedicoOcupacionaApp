import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-edit-consulta-preventiva',
  templateUrl: './edit-consulta-preventiva.component.html',
  styleUrls: ['./edit-consulta-preventiva.component.css']
})
export class EditConsultaPreventivaComponent implements OnInit {
  
  @ViewChild("myModalExamenElectrocardiograma", { static: false }) myModalExamenElectrocardiograma: TemplateRef<any>;
  @ViewChild("myModalExamenEspirometria", { static: false }) myModalExamenEspirometria: TemplateRef<any>;
  @ViewChild("myModalExamenLaboratorio", { static: false }) myModalExamenLaboratorio: TemplateRef<any>;
  @ViewChild("myModalExamenRadiologia", { static: false }) myModalExamenRadiologia: TemplateRef<any>;
  @ViewChild("myModalDiagnostico", { static: false }) myModalDiagnostico: TemplateRef<any>;
  @ViewChild("myModalSindrome", { static: false }) myModalSindrome: TemplateRef<any>;

  displayedColumns: string[] = ['codigo', 'capitulo', 'nombre'];
  dataSource = new MatTableDataSource<Sindrome>();
  sindromes: Sindrome[];

  dataSourceDiag = new MatTableDataSource<Diagnostico>();
  displayedColumnsDiag: string[] = ['codigo', 'nombre'];
  diagnosticos: Diagnostico[];

  consultaPreventiva: ConsultaPreventiva = new ConsultaPreventiva();
  electrocardiograma: Electrocardiograma = new Electrocardiograma();
  examenLaboratorio: ExamenLaboratorio = new ExamenLaboratorio();
  examenFisico: ExamenFisico = new ExamenFisico();
  espirometria: Espirometria = new Espirometria();
  diagnostico: Diagnostico = new Diagnostico();
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

  ceduNombApellPaciente: String;
  codigoConsultaPreventiva: number;
  formattedDate: any;
  fechitaActual: Date;
  peso: number;
  talla: number;
  codigo2: number;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.editarConsulta();

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

  openDialogExamenRadiologia() {
    const dialogRef = this.dialog.open(this.myModalExamenRadiologia, { width: '50%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      //this.guardarElectrocardiograma(this.electrocardiograma);
      //console.log(this.examenLaboratorio.fecha)
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }


  openDialogExamenEspirometria() {
    const dialogRef = this.dialog.open(this.myModalExamenEspirometria, { width: '60%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      //this.guardarElectrocardiograma(this.electrocardiograma);
      //console.log(this.examenLaboratorio.fecha)
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  openDialogExamenElectrocardiograma() {
    const dialogRef = this.dialog.open(this.myModalExamenElectrocardiograma, { width: '50%', panelClass: 'icon-outside', });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      //this.guardarElectrocardiograma(this.electrocardiograma);
      //console.log(this.examenLaboratorio.fecha)
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }
  
  openDialogExamenLaboratorio() {
    const dialogRef = this.dialog.open(this.myModalExamenLaboratorio, { width: 'auto', panelClass: 'icon-outside', });
    //this.getAllDiagnostico();

    dialogRef.afterClosed().subscribe(result => {
     //sthis.guardarExamenLaboratorio();
      console.log(this.examenLaboratorio.fecha)
      console.log("HELLOO..  ", `Dialog result: ${result}`);
    });
  }

  editarConsulta(): void{
     let codigo = localStorage.getItem('codigo');
     this.codigoConsultaPreventiva = Number(codigo);
    // console.log("codigooooo " + this.codigoConsulta)
    // console.log("000012 " + this.service.getConsultaId(this.codigoConsulta))
     this.service.getConsultaPreventivaCodigo(this.codigoConsultaPreventiva)
       .subscribe(data => {
         this.consultaPreventiva = data;
         this.consultaPreventiva.examenFisico = data.examenFisico;
         //this.consultaPreventiva.diagnostico = data.diagnostico;
         //console.log("antes del IF " + data.puestoTrabajo.valoracion)        
       })
   }

   actualizarConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    //console.log("Daifnostico " + this.diagnostico.codigo)
    //this.consulta.diagnostico = this.diagnostico;
    this.service.updateConsultaPreventiva(consultaPreventiva)
      .subscribe(data => {
        this.consultaPreventiva = data;
        alert("Se actualizo con exito...!!!");
        this.router.navigate(["list-pacientesparaconsulta"])
      })
  }








  calculoIndiceMasaCorporal(): void {
    this.peso = this.consultaPreventiva.peso;
    this.talla = this.consultaPreventiva.talla;
    //this.masaCorporal = this.consulta.masaCorporal;

    //this.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    //this.consultaPreventiva.masaCorporal = this.masaCorporal;
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

}
