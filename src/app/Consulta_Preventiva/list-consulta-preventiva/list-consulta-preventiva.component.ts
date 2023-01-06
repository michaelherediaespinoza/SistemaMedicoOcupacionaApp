import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaPreventiva } from 'src/app/Modelo/ConsultaPreventiva';
import { ServiceService } from 'src/app/Service/service.service';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { Hemograma } from 'src/app/Modelo/Hemograma';
import { Sindrome } from 'src/app/Modelo/Sindrome';
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


import jsPDF from 'jspdf';
import 'jspdf-autotable';
//declare var jsPDF: any;

@Component({
  selector: 'app-list-consulta-preventiva',
  templateUrl: './list-consulta-preventiva.component.html',
  styleUrls: ['./list-consulta-preventiva.component.css']
})
export class ListConsultaPreventivaComponent implements OnInit {

  formattedDate: any;
  fechita: Date;

  codigoPaciente: number;
  ceduNombApellPaciente: String;
  consultasPreventivas: ConsultaPreventiva[];
  //pacientes: Paciente[];
  dataSourceConsultaPreventiva = new MatTableDataSource<ConsultaPreventiva>();
  displayedColumnsConsultaPreventiva: string[] = ['codigo', 'fecha', 'peso', 'talla', 'masaCorporal', 'estadoNutricional', 'enfermedadActual', 'tratamiento', 'acciones1', 'acciones2'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  consultaPreventiva: ConsultaPreventiva = new ConsultaPreventiva();
  electrocardiograma: Electrocardiograma = new Electrocardiograma();
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

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNombrePaciente();
    this.listarConsultasPreventivasPorPaciente();
  }

  listarConsultasPreventivasPorPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    console.log("Codigo para listaConsulta..  " + codigo);
    //let nomPac = localStorage.getItem('nombre');
    //this.nombrePaciente = nomPac;
    this.codigoPaciente = Number(codigo);
    console.log("Codigo para listaConsulta22..  " + this.codigoPaciente);
    this.service.getConsultasPreventivasPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.consultasPreventivas = data;
        this.dataSourceConsultaPreventiva.data = this.consultasPreventivas;
        console.log("Consultass 0001 " + data);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConsultaPreventiva.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo " + this.codigoPaciente);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        this.codigoPaciente = this.paciente.codigo;
      })

    /*
  let codigo = localStorage.getItem('codigo');
  this.codigoPaciente = Number(codigo);
  console.log("codigooooo " + this.codigoPaciente)
  //console.log("000012 " + this.service.getPacienteId(this.codigoPaciente))

  let cedula = localStorage.getItem('cedula');
  let nombre = localStorage.getItem('nombre');
  let apellido = localStorage.getItem('apellido');
  this.ceduNombApellPaciente = (String(cedula) + "   " + String(nombre) + "  " + String(apellido));
  */
  }

  editarConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    localStorage.setItem('codigoConsulta', consultaPreventiva.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-consulta-preventiva"]);
    //this.router.navigate(["edit-consulta-preventiva"]);
  }

  deleteConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    if (window.confirm('Yes, please...')) {
      //window.open("exit.html", "Thanks for Visiting!");
      this.service.deleteConsultaPreventiva(consultaPreventiva)
        .subscribe(data => {
          this.consultasPreventivas = this.consultasPreventivas.filter(p => p !== consultaPreventiva);
          this._snackBar.open('Consulta Preventiva', 'Eliminado', { duration: 2000 });
          this.listarConsultasPreventivasPorPaciente();
        })
    }
  }

  addNewConsultaPreventiva(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-consulta-preventiva"]);

  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }

  redirectCertificadoAptitud(consultaPreventiva: ConsultaPreventiva): void {
    localStorage.setItem('codigoConsultaPreocupacional', consultaPreventiva.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('tipoConsultaParaCA', "ConsultaPeriodica");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    this.router.navigate(["add-certificado-aptitud"]);
  }

  redirectImprimirConsulta(consultaPreventiva: ConsultaPreventiva): void {
    localStorage.setItem('codigoConsultaPeriodica', consultaPreventiva.codigo.toString());
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    this.router.navigate(["print-consulta-periodica"]);
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientesparaconsulta-preventiva"]);
  }


  getConsultaPreventivaPorCodigoReporte(consultaPreventiva: ConsultaPreventiva): void {
    this.service.getConsultaPreventivaCodigo(consultaPreventiva.codigo)
      .subscribe(data => {
        this.consultaPreventiva = data;
        this.examenFisico = data.examenFisico;
        //this.sindrome = data.diagnostico.sindrome;
        // this.diagnostico = data.diagnostico;
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

        this.paciente = data.paciente;

        this.verExamenInicial(this.codigoPaciente);

        this.imprimirConsultaPreventivaPorConsulta();
        //this.ceduNombApellPaciente = (String(data.paciente.cedula) + "   " + String(data.paciente.nombre) + "  " + String(data.paciente.apellido));

      })
  }

  verExamenInicial(codigoPaci: number): void {
    this.service.getExamenInicialCodigo(codigoPaci)
      .subscribe(data => {
        if (data == null)
          this._snackBar.open('Paciente no tiene examen de Inicio..!', 'Examen Inicial', { duration: 3000 });
        else
          this.examenInicial = data;
      })
  }

  imprimirConsultaPreventivaPorConsulta(): void {
    const doc = new jsPDF('p', 'pt', 'a4');

    // Optional - set properties on the document
    doc.setProperties({
      title: 'Consulta Preventiva',
      subject: 'Medicina Ocupacional',
      author: 'Medico Ocupacional Farmasol',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Johnny Michael'
    });

    doc.setFont("helvetica");
    doc.setFillColor(0, 0, 255);
    doc.setFontSize(14);
    doc.text("CONSULTA MEDICA PREVENTIVA", 20, 30);

    doc.setFont("normal");
    doc.text("Paciente " + this.paciente.cedula + " " + this.paciente.nombre + " " + this.paciente.apellido, 20, 50);

    doc.setLineWidth(0.1);
    doc.line(100, 20, 100, 60); // vertical line
    doc.setDrawColor(255, 0, 0); // draw red lines

    doc.setFont("normal");
    doc.text("Peso " + this.examenInicial.peso + " Talla " + this.examenInicial.talla + " Masa Corporal " + this.examenInicial.masaCorporal +
      " Estado Nutricional " + this.examenInicial.estadoNutricional, 20, 70);

    doc.setFont("normal");
    doc.text("TAS / TAD " + this.consultaPreventiva.presionArterial + " Respiración " + this.consultaPreventiva.respiracion + " Temperatura " + this.consultaPreventiva.temperatura, 20, 90);

    doc.setFont("normal");
    doc.text(" Tipo beneficiario " + this.consultaPreventiva.tipoBeneficiario, 20, 110);

    doc.line(20, 20, 60, 20); // horizontal line

    doc.save('Consulta Medica.pdf');
  }


  imprimirAllConsultasPreventivasPorPaciente(): void {

    const doc = new jsPDF('p', 'pt', 'a4');

    // Optional - set properties on the document
    doc.setProperties({
      title: 'Consulta Preventiva',
      subject: 'Medicina Ocupacional',
      author: 'Medico Ocupacional Farmasol',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Johnny Michael'
    });

    for (let i = 0; i < this.consultasPreventivas.length; i++) {
      const element = this.consultasPreventivas[i];

      /*
      // Or use javascript directly:
      doc.autoTable({
        head: [['Codigo', 'Anamnesis', 'Diagnostico']],
        body: [
          [element.codigo, element.anamnesis, element.diagnostico.nombre],
        ],
      })
      */

    }

    doc.save('Consultas_Medicas.pdf');

  }



}

/*
for (let i = 0; i < this.consultasPreventivas.length; i++) {
  const element = this.consultasPreventivas[i];


  // Or use javascript directly:
  doc.autoTable({
    head: [['Name', 'Email', 'Country']],
    body: [

      [element.codigo, element.anamnesis, 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // ...
    ],
  })

}

*/