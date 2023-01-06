import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaMedica } from 'src/app/Modelo/ConsultaMedica';
import { ServiceService } from 'src/app/Service/service.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Paciente } from 'src/app/Modelo/Paciente';
import { Sindrome } from 'src/app/Modelo/Sindrome';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { DatePipe } from '@angular/common';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { Usuario } from 'src/app/Modelo/Usuario';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.component.html',
  styleUrls: ['./list-consulta.component.css'],
  providers: [DatePipe]
})
export class ListConsultaComponent implements OnInit {

  @ViewChild("listconsultafocus") listconsultafocus: ElementRef;
  @ViewChild("myModalDatosCertificado", { static: false }) myModalDatosCertificado: TemplateRef<any>;

  codigoPaciente: number;
  usuarioLogin: String;
  nombrePaciente: String;
  ceduNombApellPaciente: String;
  consultas: ConsultaMedica[];
  //pacientes: Paciente[];
  dataSourceConsulta = new MatTableDataSource<ConsultaMedica>();
  displayedColumnsConsulta: string[] = ['codigo', 'fecha', 'peso', 'talla', 'masaCorporal', 'estadoNutricional', 'temperatura', 'motivoConsulta', 'enfermedadActual', 'acciones'];

  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // clases para IMPRIMIR
  paciente: Paciente = new Paciente();
  consultaMedica: ConsultaMedica = new ConsultaMedica();
  sindrome: Sindrome = new Sindrome();
  diagnostico: Diagnostico = new Diagnostico();
  usuario: Usuario = new Usuario();


  recortarFecha: String;
  recortarSoloFecha: String;
  diasTotalReposo: number;
  diaActual: number;
  diasReposo: number;
  fechaDiaMesAnio: String;
  fechaDiaMesAnioSumadoDiasReposo: String;
  mesLetras: String;
  mesLetrasConsulta: String;

  nombreUsuario: String;
  rolUsuario: String;

  descripcionCertificadoReposo: string;

  //i: number;

  constructor(private date: DatePipe, private router: Router, private service: ServiceService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.getNombrePaciente();
    //this.getAllPacientes();
    //this.ListarConsultaPorPaciente();
    this.listarConsultasPorPaciente();

  }

  ngAfterViewInit() {
    this.listconsultafocus.nativeElement.focus();
  }

  /*
    getAllPacientes = () => {
      this.service.getPacientes()
        .subscribe(data => {
          this.pacientes = data;
          this.dataSource.data = this.pacientes;
          console.log('res', data);
        })
    }
  */
  listarConsultasPorPaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    this.service.getConsultasPorPaciente(this.codigoPaciente)
      .subscribe(data => {
        this.consultas = data;
        this.dataSourceConsulta.data = this.consultas;
        //console.log("Consultass 0001 " + data);
      })
  }

  dateFormat(date: Date): string {
    return date.toString().split('T')[0];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConsulta.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  /*
  GetCodigoPaciente(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    this.router.navigate(['add-consulta']);
  }
  */

  getNombrePaciente() {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    console.log("codigooooo " + this.codigoPaciente);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        this.codigoPaciente = this.paciente.codigo;
      })
  }


  editarConsulta(consultaMedica: ConsultaMedica): void {
    localStorage.setItem('codigoConsultaGeneral', consultaMedica.codigo.toString());
    console.log("codigoo Paciete enviado para Edit .. " + this.codigoPaciente);
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    localStorage.setItem('actualizar', "true");
    this.router.navigate(["add-consulta"]);
  }

  deleteConsulta(consultaMedica: ConsultaMedica) {
    if (window.confirm('Yes, please...')) {
      this.service.deleteConsulta(consultaMedica)
        .subscribe(data => {
          this.consultas = this.consultas.filter(p => p !== consultaMedica);
          alert("Usuario Eliminado..." + data.codigo);
          this.listarConsultasPorPaciente();
        })
    }
  }

  addNewConsultaMedica(): void {
    localStorage.setItem('codigoPaciente', this.codigoPaciente + "");
    console.log("codigoo Paciete enviado .. " + this.codigoPaciente);
    localStorage.setItem('actualizar', "false");
    this.router.navigate(["add-consulta"]);
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientesparaconsulta"]);
  }

  openDialogSindromesPorCapitulo(): void {
    const dialogRef = this.dialog.open(this.myModalDatosCertificado, { width: '50%', panelClass: 'icon-outside' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.descripcionCertificadoReposo = result;
      console.log('Descripcion: ' + this.descripcionCertificadoReposo);
    });
  }

  calcularDiasReposo(): void {
    this.diasReposo = this.consultaMedica.diasReposo;
    let text = this.consultaMedica.fecha;
    this.recortarFecha = text + "";
    this.recortarSoloFecha = this.recortarFecha.substr(0, 10);
    this.diaActual = Number(this.recortarFecha.substr(8, 2));

    this.diasTotalReposo = this.diasReposo + this.diaActual;

    var array_fechasol = this.recortarSoloFecha.split("-")
    var ano = parseInt(array_fechasol[0]);
    var mes = parseInt(array_fechasol[1]) - 1;
    var dia = parseInt(array_fechasol[2]);
    //mes = mes -1;
    var mesConsulta = parseInt(array_fechasol[1]) - 1;

    var proporcionalesDias;

    if (this.diasTotalReposo > 31) {
      proporcionalesDias = this.diasTotalReposo - 30;
      this.diasTotalReposo = proporcionalesDias;
      mes = mes + 1;
    }

    for (var i = 0; i < this.meses.length; i++) {
      if (i == mes) {
        this.mesLetras = this.meses[i];
        i = this.meses.length
      }
    }

    for (var i = 0; i < this.meses.length; i++) {
      if (i == mesConsulta) {
        this.mesLetrasConsulta = this.meses[i];
        i = this.meses.length
      }
    }

    this.fechaDiaMesAnio = dia + " de " + this.mesLetrasConsulta + " del " + ano + "";
    this.fechaDiaMesAnioSumadoDiasReposo = this.diasTotalReposo - 1 + " de " + this.mesLetras + " del " + ano + "";


    console.log("fecha de consult medica: " + this.recortarSoloFecha);
    console.log("fecha RECORTADA: " + this.diaActual);
    console.log("fecha sumatoria: " + this.diasTotalReposo);
    console.log("fecha dia mes anio: " + this.fechaDiaMesAnio);

  }

  inprimirCertificadoReposo(consultaMedica: ConsultaMedica): void {
    this.service.getConsultaId(consultaMedica.codigo)
      .subscribe(data => {
        this.consultaMedica = data;
        //this.sindrome = data.diagnostico.sindrome;
        //this.diagnostico = data.diagnostico;
        this.paciente = data.paciente;

        this.getDatosUser();
        this.calcularDiasReposo();
        alert("Certificado Generado!");
        this.createPdfCertificado();
      })
  }

  getDatosUser(): void {
    let usuarioLogin = localStorage.getItem('usuariologin');
    this.usuarioLogin = String(usuarioLogin);

    this.service.getUsuarioLoginUP(this.usuarioLogin)
      .subscribe(data => {
        console.log("ENTRO USRER");
        this.usuario = data;
        this.nombreUsuario = this.usuario.nombre;
        this.rolUsuario = this.usuario.rol.nombre;
        console.log("NAME USER " + this.usuario.nombre);
        console.log("ROL USER " + this.usuario.rol.nombre);

      })

  }

  async createPdfCertificado() {
    const pdfDefinition: any = {
      content: [
        {
          image: await this.getBase64ImageFromURL(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAawmmgW5YAGNUoboGb-tA6eEd8eWNQeMhJgxtqQ3OXC2bdIRX0H1BVxiOyz9_c-XVg&usqp=CAU"
          ),
          fit: [150, 150],
          alignment: 'right',
          // width: 150,
          // height: 150,
        },
        {
          text: 'CERTIFICADO MÉDICO DE REPOSO',
          decoration: 'underline',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: '#047886',
          margin: [0, 30, 0, 20]
        },
        {
          columns: [
            [
              {
                text: 'Cuenca, ' + this.fechaDiaMesAnio,
                bold: true,
                alignment: 'right',
                margin: [5, 10, 20, 30]
              },
              {
                text: 'Yo, ' + this.nombreUsuario + ", " + this.rolUsuario + " por medio de la presente",
                bold: true,
                alignment: 'left',
                margin: [5, 10, 20, 30]
              },
              {
                text: 'CERTIFICO:',
                bold: true,
                alignment: 'center',
                margin: [5, 10, 20, 30]
              },
              {
                text: 'Que el paciente ' + this.paciente.nombre + " " + this.paciente.apellido +
                  ' con Cl. : ' + this.paciente.cedula + ', el día ' + this.fechaDiaMesAnio +
                  ' acude a la valoración médica por presentar cuadro compatible con ' +
                  ' ' + ' ' + this.consultaMedica.diagnosticoCie + 'La misma que provoca dificultad para' +
                  ' realizar sus actividades laborales normales por lo cual se indica reposo físico por ' +
                  this.consultaMedica.diasReposo + ' dias y tratamiento farmaculógico.',
                bold: true,
                margin: [5, 10, 20, 30],
                //textAlign: 'justified'
                //alignment: 'justify'
              },
              {
                text: 'Reposo médico del : ' + this.fechaDiaMesAnio + '  al  ' + this.fechaDiaMesAnioSumadoDiasReposo,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Atentamente,',
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Doc. ' + this.nombreUsuario + '\n\n Médico Ocupacional',
                bold: true,
                margin: [5, 10, 20, 30],
              },

              /*
              {
                text: 'Cedula : ' + this.paciente.cedula,
                bold: true,
                margin: [5, 10, 20, 30]
              },
              {
                text: 'Departamento : ' + this.paciente.cargo.departamento.nombre,
                bold: true,
                margin: [5, 10, 20, 30]
              },
              {
                text: 'Por motivo de salud no concurrira a su trabajo desde',
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Dia : ' + this.fechaDiaMesAnio,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Hasta el día: ' + this.fechaDiaMesAnioSumadoDiasReposo,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Sindrome: ' + this.sindrome.nombre,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Diagnostico: ' + this.diagnostico.nombre,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              {
                text: 'Cuenca, a: ' + this.fechaDiaMesAnio,
                bold: true,
                margin: [5, 10, 20, 30],
              },
              */
              {

                text: '____________________________________' + "\n"
                  + 'FIRMA DEL MÉDICO ',
                alignment: 'center',
                margin: [50, 50, 50, 50],
                bold: true,

              }
            ]
          ]
        }
      ]
    }
    // const documentDefinition = { content: pdfDefinition };
    pdfMake.createPdf(pdfDefinition).open();
  }


  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

}
