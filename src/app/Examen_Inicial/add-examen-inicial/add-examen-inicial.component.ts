import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExamenInicial } from 'src/app/Modelo/ExamenInicial';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add-examen-inicial',
  templateUrl: './add-examen-inicial.component.html',
  styleUrls: ['./add-examen-inicial.component.css']
})
export class AddExamenInicialComponent implements OnInit {

  paciente: Paciente = new Paciente();
  examenInicial: ExamenInicial = new ExamenInicial();

  ceduNombApellPaciente: String;
  formattedDate: any;

  codigoPaciente: number;
  banderaEditcp: String;
  titulo: String;
  peso: number;
  talla: number;

  getPacienteCodigo: number;
  //messageResponse: String;

  constructor(private router: Router, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR EXAMEN INICIAL";
    this.getDatosPaciente();
    this.editarExamenInicial();
  }

  /*
  saveOrEditExamenInicial(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR EXAMEN INICIAL";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarExamenInicial();
      this.getDatosPaciente();
    } else {
      this.getDatosPaciente();
      //this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }
  */

  guardarExamenInicialPaciente(): void {
    console.log("codigo paciente: " + this.codigoPaciente);
    this.paciente.codigo = this.codigoPaciente;
    this.examenInicial.paciente = this.paciente;
    this.service.createExamenInicial(this.examenInicial)
      .subscribe(data => {
        this.examenInicial = data;
        alert("Examen Inicial realizado");
        //localStorage.setItem('codigo', this.paciente.codigo.toString());
        this.router.navigate(["list-pacientesparaconsulta"]);
      })
  }

  editarExamenInicial(): void {
    this.service.getExamenInicialCodigo(this.codigoPaciente)
      .subscribe(data => {
        if (data == null)
          this._snackBar.open('Paciente no tiene Examen de Inicio..!', 'Examen Inicial', { duration: 3000 });
        else
          this.examenInicial = data;
      })
  }

  getDatosPaciente(): void {
    let codigo = localStorage.getItem('codigo');
    this.codigoPaciente = Number(codigo);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        this.ceduNombApellPaciente = (String(data.cedula) + "   " + String(data.nombre) + "  " + String(data.apellido));
        console.log("01212 " + this.paciente.nombre)
      })
  }

  btnCancelar(): void {
    this.router.navigate(["list-pacientesparaconsulta"]);
  }


  calculoIndiceMasaCorporal() {
    this.peso = this.examenInicial.peso;
    this.talla = this.examenInicial.talla;

    this.examenInicial.masaCorporal = Math.round(this.peso / (this.talla * this.talla) * 100) / 100;
    console.log('res_masaCorporal', this.examenInicial.masaCorporal);

    if (this.examenInicial.masaCorporal < 18.5) {
      this.examenInicial.estadoNutricional = "PESO BAJO";
    } else if (this.examenInicial.masaCorporal >= 18.5 && this.examenInicial.masaCorporal < 30) {
      this.examenInicial.estadoNutricional = "PESO NORMAL";
    } else if (this.examenInicial.masaCorporal >= 30) {
      this.examenInicial.estadoNutricional = "OBESIDAD";
    }

  }

}