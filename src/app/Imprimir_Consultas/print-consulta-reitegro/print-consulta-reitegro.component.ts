import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Diagnostico } from 'src/app/Modelo/Diagnostico';
import { ServiceService } from 'src/app/Service/service.service';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ConsultaReintegro } from 'src/app/Modelo/ConsultaReintegro';
import { ExamenGeneral } from 'src/app/Modelo/ExamenGeneral';
import { ExamenFisico } from 'src/app/Modelo/ExamenFisico';
import { Historial } from 'src/app/Modelo/Historial';
import { AntecedenteTrabajo } from 'src/app/Modelo/antecedenteTrabajo';
import { FactorRiesgoPuestoTrabajo } from 'src/app/Modelo/FactorRiesgoPuestoTrabajo';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-print-consulta-reitegro',
  templateUrl: './print-consulta-reitegro.component.html',
  styleUrls: ['./print-consulta-reitegro.component.css']
})
export class PrintConsultaReitegroComponent implements OnInit {

  
  factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo = new FactorRiesgoPuestoTrabajo();
  antecedenteTrabajo: AntecedenteTrabajo = new AntecedenteTrabajo();
  consultaReintegro: ConsultaReintegro = new ConsultaReintegro();
  //revisionActual: RevisionActual = new RevisionActual();
  examenGeneral: ExamenGeneral = new ExamenGeneral();
  examenFisico: ExamenFisico = new ExamenFisico();
  diagnostico: Diagnostico = new Diagnostico();
  historial: Historial = new Historial();
  paciente: Paciente = new Paciente();

  antecedenteTrabajoadd: Array<AntecedenteTrabajo> = [];
  examenGeneralAdd: Array<ExamenGeneral> = [];


  diagnosticoSelect = new Set<Diagnostico>();
  //sindromeSelect = new Set<Sindrome>();

  //codigoexamenMedicoRetiro: number;
  codigoconsultaReintegro: number;
  codigoPaciente: number;
  banderaEditcp: String;
  messageResponse: String;

  ceduNombApellPaciente: String;
  cargito: String;
  formattedDate: any;
  fechitaActual: Date;
  titulo: String;
  peso: number;
  talla: number;
  codigo2: number;

  now = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
