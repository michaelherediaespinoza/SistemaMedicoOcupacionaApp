import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accidente } from 'src/app/Modelo/Accidente';
import { Paciente } from 'src/app/Modelo/Paciente';
import { ServiceService } from 'src/app/Service/service.service';
import { Historial } from 'src/app/Modelo/Historial';

@Component({
  selector: 'app-add-historial',
  templateUrl: './add-historial.component.html',
  styleUrls: ['./add-historial.component.css']
})
export class AddHistorialComponent implements OnInit {

  historial: Historial = new Historial();
  paciente: Paciente = new Paciente();

  ceduNombApellPaciente: String;
  formattedDate: any;

  codigoPaciente: number;
  banderaEditcp: String;
  titulo: String;

  getPacienteCodigo: number;
  messageResponse: String;

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {

    this.saveOrEditHistorial();

  }

  saveOrEditHistorial(): void {
    let val1 = localStorage.getItem('actualizar');
    this.banderaEditcp = String(val1);
    console.log("varr 222: " + this.banderaEditcp);
    if (this.banderaEditcp == "true") {
      this.titulo = "ACTUALIZAR HISTORIAL DEL PACIENTE";
      this.messageResponse = "Actualización Exitosa..!"
      this.editarHistorial();
      this.getDatosPaciente();
    } else {
      this.getDatosPaciente();
      //this.messageResponse = "Datos Guardados Exitosamente..!"
    }
  }

  guardarHistorialPaciente(): void {
    this.historial.paciente = this.paciente;
    this.service.createHistorial(this.historial)
      .subscribe(data => {
        this.historial = data;
        alert(this.messageResponse);
        //localStorage.setItem('codigo', this.paciente.codigo.toString());
        this.router.navigate(["list-pacientes-historial"]);
      })
  }

  editarHistorial(): void {
    let codigo = localStorage.getItem('codigo');
    // let codigoPaciente = localStorage.getItem('codigoPaciente');
    //console.log("codigoConslta " + codigoPaciente);
    this.getPacienteCodigo = Number(codigo);
    //this.codigoPaciente = Number(codigoPaciente);
    //console.log("codigoConslta222 " + codigoPaciente);
    this.service.getHistorialCodigo(this.getPacienteCodigo)
      .subscribe(data => {
        if (data == null)
          this.messageResponse = "Datos Guardados Exitosamente..!"
        else
          this.historial = data;
        //console.log("varr 222: " + data);
        //this.paciente = data.paciente;
        //this.getDatosPaciente();
        // this.ceduNombApellPaciente = (String(data.paciente.cedula) + "   " + String(data.paciente.nombre) + "  " + String(data.paciente.apellido));
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
    this.router.navigate(["list-pacientes-historial"]);
  }

}

