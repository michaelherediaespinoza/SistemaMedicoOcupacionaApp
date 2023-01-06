import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-paciente',
  templateUrl: './list-paciente.component.html',
  styleUrls: ['./list-paciente.component.css']
})
export class ListPacienteComponent implements OnInit {

  pacientes: Paciente[];
  dataSource = new MatTableDataSource<Paciente>();
  displayedColumns: string[] = ['codigo', 'cedula', 'nombre', 'apellido', 'edad', 'sexo', 'tipoSangre', 'telefono', 'acciones'];

  @ViewChild("listpacientefocus") focusListPaciente: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllPacientes();
  }

  getAllPacientes = () => {
    this.service.getPacientes()
      .subscribe(data => {
        this.pacientes = data;
        this.dataSource.data = this.pacientes;
        console.log('res', data);
      })
  }

  ngAfterViewInit() {
    this.focusListPaciente.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('res', filterValue.trim().toLowerCase());
  }

  Editar(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    this.router.navigate(["edit-paciente"]);
  }

  GetCodigoPaciente(paciente: Paciente): void {
    localStorage.setItem('codigo', paciente.codigo.toString());
    localStorage.setItem('nombre', paciente.nombre.toString());
    this.router.navigate(['add-consulta']);
  }

  Delete(paciente: Paciente) {
    if (window.confirm('Esta seguro de Eliminar el Paciente ' + paciente.nombre + " " + paciente.apellido)) {
      this.service.deletePaciente(paciente)
        .subscribe(data => {
          this.pacientes = this.pacientes.filter(p => p !== paciente);
          this._snackBar.open('Paciente Eliminado', 'Exitosamente', { duration: 4000 });
          //alert("Usuario Eliminado..." + data.nombre);
          this.getAllPacientes();
        })
    }
  }

  addNewPaciente(): void {
    this.router.navigate(["add-paciente"]);
  }


  title = 'htmltopdf';

  @ViewChild('pdfTable') pdfTable: ElementRef;

  public downloadPDF(): void {
    const doc = new jsPDF('landscape');

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {
      content: [
        html
      ],
      styles: {
        red: { // we define the class called "red"
          color: 'red'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  /*
    public downloadAsPDF() {
      const doc = new jsPDF();
     
      const pdfTable = this.pdfTable.nativeElement;
     
      var html = htmlToPdfmake(pdfTable.innerHTML);
       
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).open(); 
    }
    */

}


