import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../Modelo/Paciente';
import { Consulta } from '../Modelo/Consulta';
import { Sindrome } from '../Modelo/Sindrome';
import { Diagnostico } from '../Modelo/Diagnostico';
import { ExamenFisico } from '../Modelo/ExamenFisico';
import { PuestoTrabajo } from 'src/app/Modelo/PuestoTrabajo';
import { Cargo } from '../Modelo/Cargo';
import { ConsultaPreventiva } from '../Modelo/ConsultaPreventiva';
import { ExamenLaboratorio } from '../Modelo/ExamenLaboratorio';
import { Electrocardiograma } from '../Modelo/Electrocardiograma';
import { ConsultaMedica } from '../Modelo/ConsultaMedica';
import { Accidente } from '../Modelo/Accidente';
import { Usuario } from '../Modelo/Usuario';
import { Rol } from '../Modelo/Rol';
import { ExamenMedicoRetiro } from '../Modelo/ExamenMedicoRetiro';
import { ConsultaPreocupacional } from '../Modelo/ConsultaPreocupacional';
import { ConsultaReintegro } from '../Modelo/ConsultaReintegro';
import { Historial } from '../Modelo/Historial';
import { ExamenInicial } from '../Modelo/ExamenInicial';
import { ExamenMedicoInicial } from '../Modelo/ExamenMedicoInicial';
import { CertificadoAptitud } from '../Modelo/CertificadoAptitud';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //URL PACIENTE

  UrlList = 'SistemaMedicoOcupacional/srv/pacientes/listarPacientes';
  UrlInsert = 'SistemaMedicoOcupacional/srv/pacientes/registrarPaciente';
  UrlListId = 'SistemaMedicoOcupacional/srv/pacientes/pacientesPorCodigo';
  UrlUpdate = 'SistemaMedicoOcupacional/srv/pacientes/actualizarPaciente';
  UrlDelete = 'SistemaMedicoOcupacional/srv/pacientes/eliminarPaciente';
  //UrlUpdate='SistemaMedicoOcupacional/srv/pacientes/actualizarPacienteId';

  //URL USUARIO

  UrlListUsuarios = 'SistemaMedicoOcupacional/srv/usuario/listaUsuarios';
  UrlInsertUsuario = 'SistemaMedicoOcupacional/srv/usuario/registrarUsuario';
  UrlDeleteUsuario = 'SistemaMedicoOcupacional/srv/usuario/eliminarUsuario';
  UrlUsuarioPorCodigo = 'SistemaMedicoOcupacional/srv/usuario/usuarioPorCodigo';

  UrlLoginUsuario = 'SistemaMedicoOcupacional/srv/usuario/login';


  //URL CONSULTA

  UrlInsertConsulta = 'SistemaMedicoOcupacional/srv/consultaMedica/registrarConsultaMedica';
  UrlGetIdMax = 'SistemaMedicoOcupacional/srv/consulta/getMaxIdConsulta';
  UrlDeleteConsulta = 'SistemaMedicoOcupacional/srv/consultaMedica/eliminarConsultaMedica';
  UrlListConsultaId = 'SistemaMedicoOcupacional/srv/consultaMedica/consultaMedicaPorCodigo';
  //UrlListConsultaMedicasPorPaciente = 'SistemaMedicoOcupacional/srv/consultaMedica/listaConsultasMedicasPorPaciente';
  UrlConsultaUpdate = 'SistemaMedicoOcupacional/srv/consultaMedica/actualizarConsultaMedica';


  UrlListConsultaMedicaPorPaciente = 'SistemaMedicoOcupacional/srv/consultaMedica/listaConsultasMedicasPorPaciente';


  //URL PUESTO DE TRABAJO 

  UrlInsertPuestoTrabajo = 'SistemaMedicoOcupacional/srv/consultaMedica/registrarPuestoTrabajo';
  UrlPuestoTrabajoUpdate = 'SistemaMedicoOcupacional/srv/consultaMedica/actualizarPuesto';


  //URL SINDROME

  UrlListSindromes = 'SistemaMedicoOcupacional/srv/consultaMedica/listaSindromesPorCapitulo';


  //URL DIAGNOSTICO

  UrlListDiagnostico = 'SistemaMedicoOcupacional/srv/consultaMedica/listaDiagnostico';

  UrlListDiagnosticos = 'SistemaMedicoOcupacional/srv/consultaMedica/listaDiagnosticos';

  UrlInsertDiagnostico = 'SistemaMedicoOcupacional/srv/consultaMedica/registrarDiagnostico';


  //URL Cargo

  UrlListCargos = 'SistemaMedicoOcupacional/srv/pacientes/listarCargos';
  UrlInsertCargo= 'SistemaMedicoOcupacional/srv/cargo/registrarCargo';


  //URL Cargo

  UrlListRoles = 'SistemaMedicoOcupacional/srv/rol/listaRoles';


  //URL EXAMEN CONSULTA REINTEGRO

  UrlInsertConsultaReintegro = 'SistemaMedicoOcupacional/srv/consultaReintegro/registrarConsultaReintegro';

  UrlConsultaReintegroPorCodigo = 'SistemaMedicoOcupacional/srv/consultaReintegro/consultaReintegroPorCodigo';

  UrlConsultaReintegroPorPaciente = 'SistemaMedicoOcupacional/srv/consultaReintegro/listaConsultasReintegroPorPaciente';

  UrlDeleteConsultaReintegro = 'SistemaMedicoOcupacional/srv/consultaReintegro/eliminarConsultaReintegro';

  UrlConsultaReintegroUpdate = 'SistemaMedicoOcupacional/srv/consultaReintegro/actualizarConsultaReintegro';



  //URL EXAMEN MEDICO RETIRO

  UrlInsertExamenMedicoRetiro = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/registrarExamenMedicoRetiro';

  UrlExamenMedicoRetiroPorCodigo = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/examenMedicoRetiroPorCodigo';

  UrlExamenMedicoRetiroPorPaciente = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/listaExamenesMedicoRetiroPorPaciente';

  UrlDeleteExamenMedicoRetiro = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/eliminarExamenMedicoRetiro';

  UrlExamenMedicoRetiroUpdate = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/actualizarExamenMedicoRetiro';


  //URL CONSULTA PREOCUPACIONAL

  UrlInsertConsultaPreocupacional = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/registrarConsultaPreocupacional';

  UrlConsultaPreocupacionalPorCodigo = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/consultaPreocupacionalPorCodigo';

  UrlConsultaPreocupacionalPorPaciente = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/listaConsultasPreocupacionalPorPaciente';

  UrlDeleteConsultaPreocupacional = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/eliminarConsultaPreocupacional';

  UrlConsultaPreocupacionalUpdate = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/actualizarConsultaPreocupacional';



  //URL CONSULTA PREVENTIVA y EXAMENES

  UrlInsertConsultaPreventiva = 'SistemaMedicoOcupacional/srv/consultaPreventiva/registrarConsultaPreventiva';

  UrlInsertExamenLaboratorio = 'SistemaMedicoOcupacional/srv/consultaPreventiva/registrarExamenLaboratorio';

  UrlInsertElectrocardiograma = 'SistemaMedicoOcupacional/srv/consultaPreventiva/registrarElectrocardiograma';

  UrlListConsultaPreventivasPorPaciente = 'SistemaMedicoOcupacional/srv/consultaPreventiva/listaConsultasPreventivaPorPaciente';
  //UrlListConsultaPreventivasPorPaciente = 'SistemaMedicoOcupacional/srv/consultaPeriodica/listaConsultasPreventivaPorPaciente';

  UrlConsultaPreventivaUpdate = 'SistemaMedicoOcupacional/srv/consultaPreventiva/actualizarConsultaPreventiva';

  UrlConsultaPreventivaPorCodigo = 'SistemaMedicoOcupacional/srv/consultaPreventiva/consultaPreventivaPorCodigo';

  UrlDeleteConsultaPreventiva = 'SistemaMedicoOcupacional/srv/consultaPreventiva/eliminarConsultaPreventiva';


  //ACCIDENTESS

  UrlInsertAccidente = 'SistemaMedicoOcupacional/srv/accidente/registrarAccidente';

  UrlAccidentePorCodigo = 'SistemaMedicoOcupacional/srv/accidente/accidentePorCodigo';

  UrlListAccidente = 'SistemaMedicoOcupacional/srv/accidente/listaAccidentesPorPaciente';

  UrlDeleteAccidente = 'SistemaMedicoOcupacional/srv/accidente/eliminarAccidente';


  //ACCIDENTESS

  UrlInsertHistorial = 'SistemaMedicoOcupacional/srv/historial/registrarHistorial';

  UrlHistorialPorCodigo = 'SistemaMedicoOcupacional/srv/historial/historialPorPaciente';

  UrlListHistorialPorPaciente = 'SistemaMedicoOcupacional/srv/historial/listaHistorialPorPaciente';

  UrlDeleteHistorial = 'SistemaMedicoOcupacional/srv/historial/eliminarHistorial';


  // EXAMEN INICIAL

  UrlInsertexamenInicial = 'SistemaMedicoOcupacional/srv/examenInicial/registrarExamenInicial';

  UrlExamenInicialPorCodigo = 'SistemaMedicoOcupacional/srv/examenInicial/examenInicialPorPaciente';


  // EXAMEN MEDICO INICIAL

  UrlInsertExamenMedicoInicial = 'SistemaMedicoOcupacional/srv/examenMedicoInicial/registrarExamenMedicoInicial';

  UrlExamenMedicoInicialPorCodigo = 'SistemaMedicoOcupacional/srv/examenMedicoInicial/examenMedicoInicialPorPaciente';

  UrlListExamenMedicoInicialPorPaciente = 'SistemaMedicoOcupacional/srv/examenMedicoInicial/listaExamenMedicoInicialPorPaciente';

  UrlDeleteExamenMedicoInicial = 'SistemaMedicoOcupacional/srv/examenMedicoInicial/eliminarExamenMedicoInicial';



  //RESPORTES CONSULTAS DE ACCIDDNTES POR FECHA

  UrlListAccidentesPorFecha = 'SistemaMedicoOcupacional/srv/accidente/listAccidentesReporteFecha';

  UrlListConsultaMedicaPorFecha = 'SistemaMedicoOcupacional/srv/consultaMedica/ReporteConsultasMedicaPorFecha';

  UrlListPreocupacionalPorFecha = 'SistemaMedicoOcupacional/srv/consultaPreocupacional/ReporteConsultasPreocupacionalPorFecha';

  UrlListperiodicaPorFecha = 'SistemaMedicoOcupacional/srv/consultaPreventiva/ReporteConsultasPreventivaPorFecha';

  UrlListRetiroPorFecha = 'SistemaMedicoOcupacional/srv/examenMedicoRetiro/ReporteExamenesMedicoRetiroPorFecha';

  UrlListReintegroPorFecha = 'SistemaMedicoOcupacional/srv/consultaReintegro/ReporteConsultasReintegroPorFecha';


  //USUARIOS

  UrlUsuarioLogin = 'SistemaMedicoOcupacional/srv/usuario/getUsuarioLogin';



  // CERTIFICADO DE APTITUD

  UrlInsertCertificadoAptitud = 'SistemaMedicoOcupacional/srv/certificadoAptitud/registrarCertificadoAptitud';

  UrlCertificadoAptitudPorPaciente = 'SistemaMedicoOcupacional/srv/certificadoAptitud/listaCertificadosAptitudPorPaciente';

  UrlDeleteCertificadoAptitud = 'SistemaMedicoOcupacional/srv/certificadoAptitud/eliminarCertificadoAptitud';

  //UrlCertificadoAptitudPorCodigo = 'SistemaMedicoOcupacional/srv/certificadoAptitud/certificadoAptitudPorCodigo';

  UrlCertificadoAptitudPorCodigo = 'SistemaMedicoOcupacional/srv/certificadoAptitud/certificadoAptitudPorCodigo';

  
  // PACIENTES

  getPacientes() {
    return this.http.get<Paciente[]>(this.UrlList);
  }

  createPaciente(paciente: Paciente) {
    return this.http.post<Paciente>(this.UrlInsert, paciente);
  }

  getPacienteId(codigo: number) {
    return this.http.get<Paciente>(this.UrlListId + "?codigo=" + codigo);
  }

  updatePaciente(paciente: Paciente) {
    console.log("prueba_002  ", paciente);
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<Paciente>(this.UrlUpdate, paciente);
  }

  deletePaciente(paciente: Paciente) {
    return this.http.delete<Paciente>(this.UrlDelete + "?" + "codigo=" + paciente.codigo);
  }


  // WEBSERVICE DE USUARIO

  getUsuarios() {
    return this.http.get<Usuario[]>(this.UrlListUsuarios);
  }

  createUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.UrlInsertUsuario, usuario);
  }

  deleteUsuario(usuario: Usuario) {
    return this.http.delete<Usuario>(this.UrlDeleteUsuario + "?" + "codigo=" + usuario.codigo);
  }

  getUsuarioPorCodigo(codigo: number) {
    return this.http.get<Usuario>(this.UrlUsuarioPorCodigo + "?codigo=" + codigo);
  }

  // WEBSERVICE DE USUAIRO LOGIN

  getUsuarioLogin(username: String, password: String) {
    return this.http.get<Usuario[]>(this.UrlLoginUsuario + "?username=" + username + "&password=" + password);
  }



  // WEBSERVICE DE ROL

  getRoles() {
    return this.http.get<Rol[]>(this.UrlListRoles);
  }



  // WEBSERVICE DE SINDROME

  getSindromesPorCapitulo(nombre: String) {
    return this.http.get<Sindrome[]>(this.UrlListSindromes + "?nombre=" + nombre);
  }



  // WEBSERVICE DE DIAGNOSTICO

  getDiagnostico(nombre: String) {
    return this.http.get<Diagnostico[]>(this.UrlListDiagnostico + "?nombre=" + nombre);
  }

  getDiagnosticoFinal(nombre: String) {
    return this.http.get<Diagnostico[]>(this.UrlListDiagnosticos + "?nombre=" + nombre);
  }

  insertDiagnostico(diagnostico: Diagnostico) {
    return this.http.post<Diagnostico>(this.UrlInsertDiagnostico, diagnostico);
  }



  // WEBSERVICE DE CARGO

  getCargos() {
    return this.http.get<Cargo[]>(this.UrlListCargos);
  }
  insertCargo(cargo: Cargo) {
    return this.http.post<Cargo>(this.UrlInsertCargo, cargo);
  }



  // WEBSERVICE DE CONSULTA

  createConsultaMedica(consultaMedica: ConsultaMedica) {
    return this.http.post<ConsultaMedica>(this.UrlInsertConsulta, consultaMedica);
  }

  getConsultasPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ConsultaMedica[]>(this.UrlListConsultaMedicaPorPaciente + "?codigo=" + codigo);
  }

  getConsultaIdMax() {
    return this.http.get<ConsultaMedica>(this.UrlGetIdMax);
  }

  deleteConsulta(consultaMedica: ConsultaMedica) {
    return this.http.delete<ConsultaMedica>(this.UrlDeleteConsulta + "?" + "codigo=" + consultaMedica.codigo);
  }

  getConsultaId(codigo: number) {
    return this.http.get<ConsultaMedica>(this.UrlListConsultaId + "?codigo=" + codigo);
  }

  updateConsulta(consultaMedica: ConsultaMedica) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<ConsultaMedica>(this.UrlConsultaUpdate, consultaMedica);
  }


  // PUESTO DE TRABAJO

  createPuestoTrabajo(puestoTrabajo: PuestoTrabajo) {
    return this.http.post<PuestoTrabajo>(this.UrlInsertPuestoTrabajo, puestoTrabajo);
  }

  updatePuestoTrabajo(puestoTrabajo: PuestoTrabajo) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<PuestoTrabajo>(this.UrlPuestoTrabajoUpdate, puestoTrabajo);
  }



  // WEBSERVICE DE CONSULTA REINTEGRO

  createConsultaReintegro(consultaReintegro: ConsultaReintegro) {
    return this.http.post<ConsultaReintegro>(this.UrlInsertConsultaReintegro, consultaReintegro);
  }

  getConsultaReintegroPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ConsultaReintegro[]>(this.UrlConsultaReintegroPorPaciente + "?codigo=" + codigo);
  }

  getConsultaReintegroCodigo(codigo: number) {
    return this.http.get<ConsultaReintegro>(this.UrlConsultaReintegroPorCodigo + "?codigo=" + codigo);
  }

  updateConsultaReintegro(consultaReintegro: ConsultaReintegro) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<ConsultaReintegro>(this.UrlConsultaReintegroUpdate, consultaReintegro);
  }

  deleteConsultaReintegro(consultaReintegro: ConsultaReintegro) {
    return this.http.delete<ConsultaReintegro>(this.UrlDeleteConsultaReintegro + "?" + "codigo=" + consultaReintegro.codigo);
  }



  // WEBSERVICE DE EXAMEN MEDICO DE RETIRO

  createExamenMedicoRetiro(examenMedicoRetiro: ExamenMedicoRetiro) {
    return this.http.post<ExamenMedicoRetiro>(this.UrlInsertExamenMedicoRetiro, examenMedicoRetiro);
  }

  getExamenMedicoRetiroPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ExamenMedicoRetiro[]>(this.UrlExamenMedicoRetiroPorPaciente + "?codigo=" + codigo);
  }

  getExamenMedicoRetiroCodigo(codigo: number) {
    return this.http.get<ExamenMedicoRetiro>(this.UrlExamenMedicoRetiroPorCodigo + "?codigo=" + codigo);
  }

  updateExamenMedicoRetiro(examenMedicoRetiro: ExamenMedicoRetiro) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<ExamenMedicoRetiro>(this.UrlExamenMedicoRetiroUpdate, examenMedicoRetiro);
  }

  deleteExamenMedicoRetiro(examenMedicoRetiro: ExamenMedicoRetiro) {
    return this.http.delete<ExamenMedicoRetiro>(this.UrlDeleteExamenMedicoRetiro + "?" + "codigo=" + examenMedicoRetiro.codigo);
  }


  // WEBSERVICE DE CONSULTA PREOCUPACIONAL

  createConsultaPreocupacional(consultaPreocupacional: ConsultaPreocupacional) {
    return this.http.post<ConsultaPreocupacional>(this.UrlInsertConsultaPreocupacional, consultaPreocupacional);
  }

  getConsultaPreocupacionalPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ConsultaPreocupacional[]>(this.UrlConsultaPreocupacionalPorPaciente + "?codigo=" + codigo);
  }

  getConsultaPreocupacionalCodigo(codigo: number) {
    return this.http.get<ConsultaPreocupacional>(this.UrlConsultaPreocupacionalPorCodigo + "?codigo=" + codigo);
  }

  updateConsultaPreocupacional(consultaPreocupacional: ConsultaPreocupacional) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<ConsultaPreocupacional>(this.UrlConsultaPreocupacionalUpdate, consultaPreocupacional);
  }

  deleteConsultaPreocupacional(consultaPreocupacional: ConsultaPreocupacional) {
    return this.http.delete<ConsultaPreocupacional>(this.UrlDeleteConsultaPreocupacional + "?" + "codigo=" + consultaPreocupacional.codigo);
  }



  // WEBSERVICE DE CONSULTA PREVENTIVA

  createConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    return this.http.post<ConsultaPreventiva>(this.UrlInsertConsultaPreventiva, consultaPreventiva);
  }

  createElectrocardiograma(electrocardiograma: Electrocardiograma) {
    return this.http.post<Electrocardiograma>(this.UrlInsertElectrocardiograma, electrocardiograma);
  }

  getConsultasPreventivasPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ConsultaPreventiva[]>(this.UrlListConsultaPreventivasPorPaciente + "?codigo=" + codigo);
  }

  getConsultaPreventivaCodigo(codigo: number) {
    return this.http.get<ConsultaPreventiva>(this.UrlConsultaPreventivaPorCodigo + "?codigo=" + codigo);
  }

  updateConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    //console.log("prueba_002  ", paciente)
    //console.log("prueba_003  ", this.UrlUpdate+"?"+"codigo="+persona.codigo, persona);
    return this.http.put<ConsultaPreventiva>(this.UrlConsultaPreventivaUpdate, consultaPreventiva);
  }

  deleteConsultaPreventiva(consultaPreventiva: ConsultaPreventiva) {
    return this.http.delete<ConsultaPreventiva>(this.UrlDeleteConsultaPreventiva + "?" + "codigo=" + consultaPreventiva.codigo);
  }


  // WEBSERVICE DE EXAMENES

  createExamenLaboratorio(examenLaboratorio: ExamenLaboratorio) {
    return this.http.post<ExamenLaboratorio>(this.UrlInsertExamenLaboratorio, examenLaboratorio);
  }


  // EXAMEN  FISICO

  createExamenFisico(examenFisico: ExamenFisico) {
    return this.http.post<ExamenFisico>(this.UrlInsertPuestoTrabajo, examenFisico);
  }


  // CRUD ACCIDENTE

  getAccidenteCodigo(codigo: number) {
    return this.http.get<Accidente>(this.UrlAccidentePorCodigo + "?codigo=" + codigo);
  }

  createAccidente(acciente: Accidente) {
    return this.http.post<Accidente>(this.UrlInsertAccidente, acciente);
  }

  getAccidentePorPaciente(codigo: number) {
    return this.http.get<Accidente[]>(this.UrlListAccidente + "?codigo=" + codigo);
  }

  deleteAccidente(accidente: Accidente) {
    return this.http.delete<Accidente>(this.UrlDeleteAccidente + "?" + "codigo=" + accidente.codigo);
  }


  // CRUD HISTORIAL

  getHistorialCodigo(codigo: number) {
    return this.http.get<Historial>(this.UrlHistorialPorCodigo + "?codigo=" + codigo);
  }

  createHistorial(historial: Historial) {
    return this.http.post<Historial>(this.UrlInsertHistorial, historial);
  }

  getHistorialPorPaciente(codigo: number) {
    return this.http.get<Historial[]>(this.UrlListHistorialPorPaciente + "?codigo=" + codigo);
  }

  deleteHistorial(historial: Historial) {
    return this.http.delete<Historial>(this.UrlDeleteHistorial + "?" + "codigo=" + historial.codigo);
  }


  // EXAMEN INICIAL

  getExamenInicialCodigo(codigo: number) {
    return this.http.get<ExamenInicial>(this.UrlExamenInicialPorCodigo + "?codigo=" + codigo);
  }

  createExamenInicial(examenInicial: ExamenInicial) {
    return this.http.post<ExamenInicial>(this.UrlInsertexamenInicial, examenInicial);
  }

  // EXAMEN MEDICO INICIAL

  getExamenMedicoInicialCodigo(codigo: number) {
    return this.http.get<ExamenMedicoInicial>(this.UrlExamenInicialPorCodigo + "?codigo=" + codigo);
  }

  createExamenMedicoInicial(examenMedicoInicial: ExamenMedicoInicial) {
    return this.http.post<ExamenMedicoInicial>(this.UrlInsertExamenMedicoInicial, examenMedicoInicial);
  }

  getExamenesMedicoInicialPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<ExamenMedicoInicial[]>(this.UrlListExamenMedicoInicialPorPaciente + "?codigo=" + codigo);
  }

  deleteExamenMedicoInicial(examenMedicoInicial: ExamenMedicoInicial) {
    return this.http.delete<ExamenMedicoInicial>(this.UrlDeleteExamenMedicoInicial + "?" + "codigo=" + examenMedicoInicial.codigo);
  }



  // REPPORTES DE CONSULTAS 

      // ACCIDENTE POR FECHA

  getAccidentesPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<Accidente[]>(this.UrlListAccidentesPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }

  // MEDICA GENERAL POR FECHA
  getConsultaMedicaPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<ConsultaMedica[]>(this.UrlListConsultaMedicaPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }

  // PREOCUPACIONAL POR FECHA
  getPreocupacionalPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<ConsultaPreocupacional[]>(this.UrlListPreocupacionalPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }

  // PERIODICA POR FECHA
  getPeriodicaPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<ConsultaPreventiva[]>(this.UrlListperiodicaPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }

  // RETIRO POR FECHA
  getRetiroPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<ExamenMedicoRetiro[]>(this.UrlListRetiroPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }

  // RENTEGRO POR FECHA
  getReintegroPorFecha(fechaInicio: String, fechaFin: String) {
    return this.http.get<ConsultaReintegro[]>(this.UrlListReintegroPorFecha + "?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }





  // USUARIO 

  getUsuarioLoginUP(username: String) {
    return this.http.get<Usuario>(this.UrlUsuarioLogin + "?username=" + username);
  }


  // CERTIFICADO APTITUD


  createCertificadoAptitud(certificadoAptitud: CertificadoAptitud) {
    return this.http.post<CertificadoAptitud>(this.UrlInsertCertificadoAptitud, certificadoAptitud);
  }

  getCertificadoAptitudPorPaciente(codigo: number) {
    //console.log("000121111 " + this.http.get<Consulta[]>(this.UrlListConsultaPorPaciente+"?codigo="+codigo));
    return this.http.get<CertificadoAptitud[]>(this.UrlCertificadoAptitudPorPaciente + "?codigo=" + codigo);
  }

  deleteCertificadoAptitud(certificadoAptitud: CertificadoAptitud) {
    return this.http.delete<CertificadoAptitud>(this.UrlDeleteCertificadoAptitud + "?" + "codigo=" + certificadoAptitud.codigo);
  }

  getCertificadoAptitudCodigo(codigo: number) {
    return this.http.get<CertificadoAptitud>(this.UrlCertificadoAptitudPorCodigo + "?codigo=" + codigo);
  }

}
