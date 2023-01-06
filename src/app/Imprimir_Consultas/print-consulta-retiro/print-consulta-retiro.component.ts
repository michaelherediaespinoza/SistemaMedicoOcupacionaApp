import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { ServiceService } from 'src/app/Service/service.service';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ExamenMedicoRetiro } from 'src/app/Modelo/ExamenMedicoRetiro';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';

@Component({
  selector: 'app-print-consulta-retiro',
  templateUrl: './print-consulta-retiro.component.html',
  styleUrls: ['./print-consulta-retiro.component.css']
})
export class PrintConsultaRetiroComponent implements OnInit {

  factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo = new FactorRiesgoPuestoTrabajo();
  antecedenteTrabajo: AntecedenteTrabajo = new AntecedenteTrabajo();
  examenMedicoRetiro: ExamenMedicoRetiro = new ExamenMedicoRetiro();
  //revisionActual: RevisionActual = new RevisionActual();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
  examenFisico: ExamenFisico = new ExamenFisico();
  diagnostico: Diagnostico = new Diagnostico();
  historial: Historial = new Historial();
  paciente: Paciente = new Paciente();

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];

  codigoexamenMedicoRetiro: number;
  codigoPaciente: number;
  ceduNombApellPaciente: String;
  cargito: String;

  usuarioLogin: String;
  nombreUsuario: String;

  empresita: String;


  constructor(private router: Router, private service: ServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.viewConsulta();
    this.getHistorialPorPaciente();
    this.getNombrePaciente();
    this.getDatosUser();
  }


  viewConsulta(): void {
    let codigo = localStorage.getItem('codigoConsultaRetiro');
    let codigoPaciente = localStorage.getItem('codigoPaciente');
    console.log("codigoConslta " + codigoPaciente);
    this.codigoexamenMedicoRetiro = Number(codigo);
    this.codigoPaciente = Number(codigoPaciente);
    console.log("codigoConslta222 " + codigoPaciente);
    this.service.getExamenMedicoRetiroCodigo(this.codigoexamenMedicoRetiro)
      .subscribe(data => {
        this.examenMedicoRetiro = data;
        this.examenFisico = data.examenFisico;
        this.examenGeneralAdd = data.examenGeneral;
        //this.sindrome = data.diagnostico.sindrome;

        //this.fisicoList = [];
        //this.fisicoList.push(data.riesgoRetiro + "");

        //this.paciente = data.paciente;
        //this.ceduNombApellPaciente = (String(data.paciente.nombre) + "  " + String(data.paciente.apellido));

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

  getNombrePaciente(): void {
    let codigo = localStorage.getItem('codigoPaciente');
    this.codigoPaciente = Number(codigo);
    this.service.getPacienteId(this.codigoPaciente)
      .subscribe(data => {
        this.paciente = data;
        console.log("01212 " + this.paciente.nombre);
        this.ceduNombApellPaciente = (String(data.nombre) + "  " + String(data.apellido));
        this.cargito = data.cargo.nombre;
        this.empresita = data.cargo.departamento.empresa.nombre;
      })
  }

  btnCancelar(): void {
    localStorage.setItem('codigo', this.codigoPaciente + "");
    this.router.navigate(["list-consulta-preventiva"]);
  }

  getDatosUser(): void {
    let usuarioLogin = localStorage.getItem('usuariologin');
    this.usuarioLogin = String(usuarioLogin);

    this.service.getUsuarioLoginUP(this.usuarioLogin)
      .subscribe(data => {
        console.log("ENTRO USRER");
        //this.usuario = data;
        this.nombreUsuario = data.nombre;
      })
  }


}
