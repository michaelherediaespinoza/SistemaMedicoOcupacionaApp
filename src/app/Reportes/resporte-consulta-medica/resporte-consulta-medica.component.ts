import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ServiceService } from 'src/app/Service/service.service';
import { Usuario } from 'src/app/Modelo/Usuario';
import { Accidente } from 'src/app/Modelo/Accidente';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { ConsultaPreocupacional } from 'src/app/Modelo/ConsultaPreocupacional';
import { ConsultaPreventiva } from 'src/app/Modelo/ConsultaPreventiva';
import { ExamenMedicoRetiro } from 'src/app/Modelo/ExamenMedicoRetiro';
import { ConsultaReintegro } from 'src/app/Modelo/ConsultaReintegro';

@Component({
  selector: 'app-resporte-consulta-medica',
  templateUrl: './resporte-consulta-medica.component.html',
  styleUrls: ['./resporte-consulta-medica.component.css']
})
export class ResporteConsultaMedicaComponent implements OnInit {

  @ViewChild('pdfTableConsultaMedicaGeneral') pdfTableConsultaMedicaGeneral: ElementRef;
  @ViewChild('pdfTableConsultaInicio') pdfTableConsultaInicio: ElementRef;
  @ViewChild('pdfTableConsultaPeriodica') pdfTableConsultaPeriodica: ElementRef;
  @ViewChild('pdfTableConsultaRetiro') pdfTableConsultaRetiro: ElementRef;
  @ViewChild('pdfTableConsultaReintegro') pdfTableConsultaReintegro: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  texto: String;
  usuarios: Usuario[];
  usuario: Usuario = new Usuario();

  accidente: Accidente;
  accidentes: Accidente[];

  consultaMedica: ConsultaMedica;
  consultaMedicas: ConsultaMedica[];

  consultaPreocupacional: ConsultaPreocupacional;
  consultaPreocupacionales: ConsultaPreocupacional[];

  consultaPreventiva: ConsultaPreventiva;
  consultaPreventivas: ConsultaPreventiva[];

  examenMedicoRetiro: ExamenMedicoRetiro;
  examenMedicoRetiros: ExamenMedicoRetiro[];

  consultaReintegro: ConsultaReintegro;
  consultaReintegros: ConsultaReintegro[];

  fechaFin: String;
  fechaInicio: String;

  fechaInicioConsultaMedica: String;
  fechaFinConsultaMedica: String;

  fechaInicioConsultaInicio: String;
  fechaFinConsultaInicio: String;
  
  fechaInicioConsultaPeriodica: String;
  fechaFinConsultaPeriodica: String;
  
  fechaInicioConsultaSalida: String
  fechaFinConsultaSalida: String;


  fechaInicioConsultaReingetro: String;
  fechaFinConsultaReingetro: String;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.texto = "HOLA"
    //this.getAllUsuarios();
  }

  getAllUsuarios = () => {
    this.service.getUsuarios()
      .subscribe(data => {
        this.usuarios = data;
        this.usuarios.forEach(element => {
          console.log('nombre user', element.nombre);
          this.usuario.nombre = element.nombre;
          this.usuario.username = element.username;
        });

      })
  }

  reporteAccidentePorFecha(): void {
    this.service.getAccidentesPorFecha(this.fechaInicio, this.fechaFin)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.accidentes = data;
        //console.log("FECHA 2 " + data.toLocaleString);
      })
  }

  reporteConsultaMedicaGeneralPorFecha(): void {
    this.service.getConsultaMedicaPorFecha(this.fechaInicioConsultaMedica, this.fechaFinConsultaMedica)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.consultaMedicas = data;
        //console.log("FECHA 2 " + data.toLocaleString);

      })
  }

  reporteConsultaPreocupacionalPorFecha(): void {
    this.service.getPreocupacionalPorFecha(this.fechaInicioConsultaInicio, this.fechaFinConsultaInicio)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.consultaPreocupacionales = data;
        //console.log("FECHA 2 " + data.toLocaleString);

      })
  }

  reporteConsultaPeriodicaPorFecha(): void {
    this.service.getPeriodicaPorFecha(this.fechaInicioConsultaPeriodica, this.fechaFinConsultaPeriodica)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.consultaPreventivas = data;
        //console.log("FECHA 2 " + data.toLocaleString);

      })
  }

  reporteConsultaRetiroPorFecha(): void {
    this.service.getRetiroPorFecha(this.fechaInicioConsultaSalida, this.fechaFinConsultaSalida)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.examenMedicoRetiros = data;
        //console.log("FECHA 2 " + data.toLocaleString);

      })
  }

  reporteConsultaReintegroPorFecha(): void {
    this.service.getReintegroPorFecha(this.fechaInicioConsultaReingetro, this.fechaFinConsultaReingetro)
      .subscribe(data => {
        // console.log("FECHA 2 " + data.length);
        this.consultaReintegros = data;
        //console.log("FECHA 2 " + data.toLocaleString);

      })
  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }


  public openPDF(): void {

    //this.reporteAccidentePorFecha();

    document.getElementById('htmlData');

    // let DATA = document.getElementById('htmlData');

    html2canvas(document.body).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('angular-demo.pdf');

    });
  }

  title = 'htmltopdf';



  public downloadPDFConsultaMedicaGeneral(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTableConsultaMedicaGeneral = this.pdfTableConsultaMedicaGeneral.nativeElement;

    var html = htmlToPdfmake(pdfTableConsultaMedicaGeneral.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }

  public downloadPDFconsultaInicio(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTablepdfTableConsultaInicio = this.pdfTableConsultaInicio.nativeElement;

    var html = htmlToPdfmake(pdfTablepdfTableConsultaInicio.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }

  public downloadPDFconsultaPeriodica(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTableConsultaPeriodica = this.pdfTableConsultaPeriodica.nativeElement;

    var html = htmlToPdfmake(pdfTableConsultaPeriodica.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }


  public downloadPDFconsultaRetiro(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTableConsultaRetiro = this.pdfTableConsultaRetiro.nativeElement;

    var html = htmlToPdfmake(pdfTableConsultaRetiro.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }


  public downloadPDFconsultaReintegro(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTableConsultaReintegro = this.pdfTableConsultaReintegro.nativeElement;

    var html = htmlToPdfmake(pdfTableConsultaReintegro.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }



  public downloadPDF(): void {
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        {
          text: 'LISTA DE ACCIDENTES DESDE ' + this.fechaInicio + " a " + this.fechaFin,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        html
      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }





  createPdf(): void {
    const pdfDefinition: any = {
      content: [
        {
          text: 'CERTIFICADO DE REPOSO',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.usuario.nombre,
              style: 'name'
            },
            {
              text: 'Email : ' + 'Date: ${new Date().toLocaleString()}'
            },
            {
              text: 'Email : ' + this.usuario.username,
            },
            {
              text: 'Contant No : ' + this.usuario.username,
            }
            ]
          ]
        }
      ]
    }
    // const documentDefinition = { content: pdfDefinition };
    pdfMake.createPdf(pdfDefinition).open();
  }


}
