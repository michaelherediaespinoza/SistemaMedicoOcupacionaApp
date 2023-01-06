import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConsultaComponent } from './Consulta/add-consulta/add-consulta.component';
import { EditConsultaComponent } from './Consulta/edit-consulta/edit-consulta.component';
import { ListConsultaComponent } from './Consulta/list-consulta/list-consulta.component';
import { ListPacientesparaconsultaComponent } from './Consulta/list-pacientesparaconsulta/list-pacientesparaconsulta.component';
import { AddConsultaPreventivaComponent } from './Consulta_Preventiva/add-consulta-preventiva/add-consulta-preventiva.component';
import { EditConsultaPreventivaComponent } from './Consulta_Preventiva/edit-consulta-preventiva/edit-consulta-preventiva.component';
import { ListConsultaPreventivaComponent } from './Consulta_Preventiva/list-consulta-preventiva/list-consulta-preventiva.component';
import { ListPacientesparaconsultaPreventivaComponent } from './Consulta_Preventiva/list-pacientesparaconsulta-preventiva/list-pacientesparaconsulta-preventiva.component';
import { LoginComponent } from './Login/login/login.component';
import { AddPacienteComponent } from './Paciente/add-paciente/add-paciente.component';
import { EditPacienteComponent } from './Paciente/edit-paciente/edit-paciente.component';
import { ListPacienteComponent } from './Paciente/list-paciente/list-paciente.component';
import { AddAccidenteComponent } from './Accidente/add-accidente/add-accidente.component';
import { ListAccidenteComponent } from './Accidente/list-accidente/list-accidente.component';
import { ListPacientesAccidenteComponent } from './Accidente/list-pacientes-accidente/list-pacientes-accidente.component';
import { AddUsuarioComponent } from './Usuario/add-usuario/add-usuario.component';
import { ListUsuarioComponent } from './Usuario/list-usuario/list-usuario.component';
import { ListExamenMedicoRetiroComponent } from './Exam_Medico_Retiro/list-examen-medico-retiro/list-examen-medico-retiro.component';
import { AddExamenMedicoRetiroComponent } from './Exam_Medico_Retiro/add-examen-medico-retiro/add-examen-medico-retiro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListPacientesparaEmrComponent } from './Exam_Medico_Retiro/list-pacientespara-emr/list-pacientespara-emr.component';
import { AddConsultaPreocupacionalComponent } from './Consulta_Preocupacional/add-consulta-preocupacional/add-consulta-preocupacional.component';
import { ListPacientesConsultaPreocupacionalComponent } from './Consulta_Preocupacional/list-pacientes-consulta-preocupacional/list-pacientes-consulta-preocupacional.component';
import { ListConsultaPreocupacionalComponent } from './Consulta_Preocupacional/list-consulta-preocupacional/list-consulta-preocupacional.component';
import { ResporteConsultaMedicaComponent } from './Reportes/resporte-consulta-medica/resporte-consulta-medica.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddFichaReitegroComponent } from './Ficha_Reintegro/add-ficha-reitegro/add-ficha-reitegro.component';
import { ListFichaReitegroComponent } from './Ficha_Reintegro/list-ficha-reitegro/list-ficha-reitegro.component';
import { ListPacientesFichaReitegroComponent } from './Ficha_Reintegro/list-pacientes-ficha-reitegro/list-pacientes-ficha-reitegro.component';
import { AddHistorialComponent } from './Historial/add-historial/add-historial.component';
import { ListHistorialComponent } from './Historial/list-historial/list-historial.component';
import { ListPacientesHistorialComponent } from './Historial/list-pacientes-historial/list-pacientes-historial.component';
import { CanActivateGuard } from './can-activate.guard';
import { AddExamenInicialComponent } from './Examen_Inicial/add-examen-inicial/add-examen-inicial.component';
import { ListExamenInicialComponent } from './Examen_Inicial/list-examen-inicial/list-examen-inicial.component';
import { AddExamenMedicoInicialComponent } from './Examen_Medico_Inicial/add-examen-medico-inicial/add-examen-medico-inicial.component';
import { ListExamenMedicoInicialComponent } from './Examen_Medico_Inicial/list-examen-medico-inicial/list-examen-medico-inicial.component';
import { ListPacientesEmiComponent } from './Examen_Medico_Inicial/list-pacientes-emi/list-pacientes-emi.component';

import { AddCertificadoAptitudComponent } from './Certificado_Aptitud/add-certificado-aptitud/add-certificado-aptitud.component';
import { ListCertificadoAptitudComponent } from './Certificado_Aptitud/list-certificado-aptitud/list-certificado-aptitud.component';
import { ListPacientesCertificadoAptitudComponent } from './Certificado_Aptitud/list-pacientes-certificado-aptitud/list-pacientes-certificado-aptitud.component';
import { PrintConsultaPreocupacionalComponent } from './Imprimir_Consultas/print-consulta-preocupacional/print-consulta-preocupacional.component';
import { PrintConsultaPeriodicaComponent } from './Imprimir_Consultas/print-consulta-periodica/print-consulta-periodica.component';


const routes: Routes = [
  { path: 'list-paciente', component: ListPacienteComponent, canActivate: [CanActivateGuard] },
  { path: 'add-consulta-preocupacional', component: AddConsultaPreocupacionalComponent },
  { path: 'add-examen-medico-retiro', component: AddExamenMedicoRetiroComponent },
  { path: 'add-consulta-preventiva', component: AddConsultaPreventivaComponent },
  { path: 'add-ficha-reitegro', component: AddFichaReitegroComponent },
  { path: 'add-accidente', component: AddAccidenteComponent },
  { path: 'add-historial', component: AddHistorialComponent },
  { path: 'add-paciente', component: AddPacienteComponent },
  { path: 'add-usuario', component: AddUsuarioComponent },
  { path: 'add-examen-inicial', component: AddExamenInicialComponent },
  { path: 'add-examen-medico-inicial', component: AddExamenMedicoInicialComponent },
  { path: 'edit-paciente', component: EditPacienteComponent },
  { path: 'list-accidente', component: ListAccidenteComponent },
  { path: 'list-consulta', component: ListConsultaComponent },
  { path: 'add-consulta', component: AddConsultaComponent },
  { path: 'edit-consulta', component: EditConsultaComponent },
  { path: 'list-pacientes-consulta-preocupacional', component: ListPacientesConsultaPreocupacionalComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientesparaconsulta-preventiva', component: ListPacientesparaconsultaPreventivaComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientes-ficha-reitegro', component: ListPacientesFichaReitegroComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientesparaconsulta', component: ListPacientesparaconsultaComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientes-accidente', component: ListPacientesAccidenteComponent, canActivate: [CanActivateGuard] },
  { path: 'list-consulta-preventiva', component: ListConsultaPreventivaComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientes-historial', component: ListPacientesHistorialComponent, canActivate: [CanActivateGuard] },
  { path: 'list-pacientespara-emr', component: ListPacientesparaEmrComponent, canActivate: [CanActivateGuard] },
  { path: 'list-consulta-preocupacional', component: ListConsultaPreocupacionalComponent },
  { path: 'list-examen-medico-retiro', component: ListExamenMedicoRetiroComponent },
  { path: 'list-ficha-reitegro', component: ListFichaReitegroComponent },
  { path: 'list-historial', component: ListHistorialComponent },
  { path: 'list-usuario', component: ListUsuarioComponent },
  { path: 'list-pacientes-emi', component: ListPacientesEmiComponent, canActivate: [CanActivateGuard] },
  { path: 'list-examen-inicial', component: ListExamenInicialComponent },
  { path: 'list-examen-medico-inicial', component: ListExamenMedicoInicialComponent, canActivate: [CanActivateGuard] },
  { path: 'edit-consulta-preventiva', component: EditConsultaPreventivaComponent },
  { path: 'login', component: LoginComponent },

  { path: 'list-certificado-aptitud', component: ListCertificadoAptitudComponent },
  { path: 'add-certificado-aptitud', component: AddCertificadoAptitudComponent },
  { path: 'list-pacientes-certificado-aptitud', component: ListPacientesCertificadoAptitudComponent, canActivate: [CanActivateGuard] },

  { path: 'resporte-consulta-medica', component: ResporteConsultaMedicaComponent },
  { path: 'print-consulta-preocupacional', component: PrintConsultaPreocupacionalComponent },
  { path: 'print-consulta-periodica', component: PrintConsultaPeriodicaComponent },


  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
