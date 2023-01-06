import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/Modelo/Cargo';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrls: ['./edit-paciente.component.css']
})
export class EditPacienteComponent implements OnInit {

  @ViewChild("myModalCargo", { static: false }) myModalCargo: TemplateRef<any>;
  @ViewChild("editpaciente") focusEditPaciente: ElementRef;

  cargoSelect = new Set<Cargo>();
  formattedDate: any;

  paciente: Paciente = new Paciente();
  cargo: Cargo = new Cargo();

  cargos: Cargo[];
  dataSourceCargo = new MatTableDataSource<Cargo>();
  displayedColumnsCargo: string[] = ['codigo', 'nombre'];

  //paciente :Paciente= new Paciente();
  //persona :Persona;
  codigo2: number;

  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.Editar();
    this.formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.paciente.fechaIngresoEmpresa = this.formattedDate;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    this.focusEditPaciente.nativeElement.focus();
  }

  Editar() {
    let codigo = localStorage.getItem('codigo');
    this.codigo2 = Number(codigo);
    console.log("codigooooo " + this.codigo2)
    console.log("000012 " + this.service.getPacienteId(this.codigo2))
    this.service.getPacienteId(this.codigo2)
      .subscribe(data => {
        this.paciente = data;
        //this.paciente.cargo.nombre = data.cargo.nombre;
        this.cargo = data.cargo;
        console.log("Nombre de Cargo " + this.paciente.cargo.nombre)
      })
  }

actualizarPaciente(paciente: Paciente) {
    console.log("prueba_001  ", this.codigo2)
    this.paciente.cargo = this.cargo;
    this.service.updatePaciente(paciente)
      .subscribe(data => {
        this.paciente = data;
        this._snackBar.open('Paciente Actualizado!', 'Exitosamente', { duration: 4000 });
        //alert("Se actualizo con exito...!!!");
        this.router.navigate(["list-paciente"])
      })

  }

  openDialogCargo() {
    this.cargoSelect = new Set<Cargo>();
    const dialogRef = this.dialog.open(this.myModalCargo, { width: '60%', panelClass: 'icon-outside', });
    this.getAllCargos();

    dialogRef.afterClosed().subscribe(result => {

      for (let carg of this.cargoSelect) {
        this.cargo = carg;
      }

    });
  }

  getAllCargos = () => {
    this.service.getCargos()
      .subscribe(data => {
        this.cargos = data;
        this.dataSourceCargo.data = this.cargos;
        // console.log('res', data);
      })
  }

  selectCargoDialog(row: any) {
    this.cargoSelect.clear();
    this.cargoSelect.add(row)
    //this.dialog.close;
  }

  volverAtras(): void {
    this.router.navigate(["list-paciente"])
  }
  
}
