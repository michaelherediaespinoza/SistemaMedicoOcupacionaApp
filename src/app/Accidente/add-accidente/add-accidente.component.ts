import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accidente } from 'src/app/Modelo/Accidente';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add-accidente',
  templateUrl: './add-accidente.component.html',
  providers: [DatePipe],
  styleUrls: ['./add-accidente.component.css']
})
export class AddAccidenteComponent implements OnInit {

  accidente: Accidente = new Accidente();
  paciente: Paciente = new Paciente();

  ceduNombApellPaciente: String;
  formattedDate: any;
  formattedTime: any;
  fechitaActual: Date;

  codigoPaciente: number;
  banderaEditcp: String;
  titulo: String;

  getAccidenteCodigo: number;
  messageResponse: String;

  now = new Date();
  todaysDataTime = '';

  constructor(private router: Router, private service: ServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.titulo = "REGISTRAR ACCIDENTE";
    this.formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.todaysDataTime = formatDate(this.now, 'hh:mm:ss a', 'en');
    this.fechitaActual = new Date(this.formattedDate);

    this.accidente.fechaAtencion = this.now;;
    this.accidente.fechaAccidente = this.now;;

    this.accidente.horaAccidente = this.todaysDataTime;
    this.accidente.horaAtencion = this.todaysDataTime;;

    this.saveOrEditAccidentes();

  }

  saveOrEditAccidentes(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR ACCIDENTE";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarAccidente();
    } else {
      this.getDatosPaciente();
      this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }

  guardarAccidente(): void {
    this.accidente.paciente = this.paciente;
    this.service.createAccidente(this.accidente)
      .subscribe(data => {
        this.accidente = data;
        alert(this.messageResponse);
        localStorage.setItem('codigo', this.paciente.codigo.toString());
        this.router.navigate(["list-accidente"]);
      })
  }

  editarAccidente(): void {
    let codigo = localStorage.getItem('codigo');
    // let codigoPaciente = localStorage.getItem('codigoPaciente');
    //console.log("codigoConslta " + codigoPaciente);
    this.getAccidenteCodigo = Number(codigo);
    //this.codigoPaciente = Number(codigoPaciente);
    //console.log("codigoConslta222 " + codigoPaciente);
    this.service.getAccidenteCodigo(this.getAccidenteCodigo)
      .subscribe(data => {
        this.accidente = data;
        this.paciente = data.paciente;
        this.ceduNombApellPaciente = (String(data.paciente.cedula) + "   " + String(data.paciente.nombre) + "  " + String(data.paciente.apellido));
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

  cancelarAcciente(): void {
    this.router.navigate(["list-pacientes-accidente"]);
  }

}
