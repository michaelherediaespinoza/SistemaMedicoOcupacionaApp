import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// componentes
import { ListPacienteComponent } from './Paciente/list-paciente/list-paciente.component';
import { AddPacienteComponent } from './Paciente/add-paciente/add-paciente.component';
import { EditPacienteComponent } from './Paciente/edit-paciente/edit-paciente.component';
import { ListConsultaComponent } from './Consulta/list-consulta/list-consulta.component';
import { AddConsultaComponent } from './Consulta/add-consulta/add-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ServiceService } from '../app/Service/service.service'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Login/login/login.component';
import { SharedModule } from './shared/shared.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditConsultaComponent } from './Consulta/edit-consulta/edit-consulta.component';
import { ListPacientesparaconsultaComponent } from './Consulta/list-pacientesparaconsulta/list-pacientesparaconsulta.component';
import { AddConsultaPreventivaComponent } from './Consulta_Preventiva/add-consulta-preventiva/add-consulta-preventiva.component';
import { ListConsultaPreventivaComponent } from './Consulta_Preventiva/list-consulta-preventiva/list-consulta-preventiva.component';
import { ListPacientesparaconsultaPreventivaComponent } from './Consulta_Preventiva/list-pacientesparaconsulta-preventiva/list-pacientesparaconsulta-preventiva.component';
import { EditConsultaPreventivaComponent } from './Consulta_Preventiva/edit-consulta-preventiva/edit-consulta-preventiva.component';
import { AddAccidenteComponent } from './Accidente/add-accidente/add-accidente.component';
import { ListAccidenteComponent } from './Accidente/list-accidente/list-accidente.component';
import { ListPacientesAccidenteComponent } from './Accidente/list-pacientes-accidente/list-pacientes-accidente.component';
import { AddExamenMedicoRetiroComponent } from './Exam_Medico_Retiro/add-examen-medico-retiro/add-examen-medico-retiro.component';
import { ListExamenMedicoRetiroComponent } from './Exam_Medico_Retiro/list-examen-medico-retiro/list-examen-medico-retiro.component';
import { AddUsuarioComponent } from './Usuario/add-usuario/add-usuario.component';
import { ListUsuarioComponent } from './Usuario/list-usuario/list-usuario.component';
import { ListPacientesparaEmrComponent } from './Exam_Medico_Retiro/list-pacientespara-emr/list-pacientespara-emr.component';
import { AddConsultaPreocupacionalComponent } from './Consulta_Preocupacional/add-consulta-preocupacional/add-consulta-preocupacional.component';
import { ListConsultaPreocupacionalComponent } from './Consulta_Preocupacional/list-consulta-preocupacional/list-consulta-preocupacional.component';
import { ListPacientesConsultaPreocupacionalComponent } from './Consulta_Preocupacional/list-pacientes-consulta-preocupacional/list-pacientes-consulta-preocupacional.component';
import { ResporteConsultaMedicaComponent } from './Reportes/resporte-consulta-medica/resporte-consulta-medica.component';
import { AddFichaReitegroComponent } from './Ficha_Reintegro/add-ficha-reitegro/add-ficha-reitegro.component';
import { ListFichaReitegroComponent } from './Ficha_Reintegro/list-ficha-reitegro/list-ficha-reitegro.component';
import { ListPacientesFichaReitegroComponent } from './Ficha_Reintegro/list-pacientes-ficha-reitegro/list-pacientes-ficha-reitegro.component';
import { AddHistorialComponent } from './Historial/add-historial/add-historial.component';
import { ListHistorialComponent } from './Historial/list-historial/list-historial.component';
import { ListPacientesHistorialComponent } from './Historial/list-pacientes-historial/list-pacientes-historial.component';
import { AddExamenInicialComponent } from './Examen_Inicial/add-examen-inicial/add-examen-inicial.component';
import { ListExamenInicialComponent } from './Examen_Inicial/list-examen-inicial/list-examen-inicial.component';
import { AddExamenMedicoInicialComponent } from './Examen_Medico_Inicial/add-examen-medico-inicial/add-examen-medico-inicial.component';
import { ListExamenMedicoInicialComponent } from './Examen_Medico_Inicial/list-examen-medico-inicial/list-examen-medico-inicial.component';
import { ListPacientesEmiComponent } from './Examen_Medico_Inicial/list-pacientes-emi/list-pacientes-emi.component';
import { AddCertificadoAptitudComponent } from './Certificado_Aptitud/add-certificado-aptitud/add-certificado-aptitud.component';
import { ListCertificadoAptitudComponent } from './Certificado_Aptitud/list-certificado-aptitud/list-certificado-aptitud.component';
import { ListPacientesCertificadoAptitudComponent } from './Certificado_Aptitud/list-pacientes-certificado-aptitud/list-pacientes-certificado-aptitud.component'

import {NgxPrintModule} from 'ngx-print';
import { PrintConsultaPreocupacionalComponent } from './Imprimir_Consultas/print-consulta-preocupacional/print-consulta-preocupacional.component';
import { PrintConsultaPeriodicaComponent } from './Imprimir_Consultas/print-consulta-periodica/print-consulta-periodica.component';
import { PrintConsultaRetiroComponent } from './Imprimir_Consultas/print-consulta-retiro/print-consulta-retiro.component';
import { PrintConsultaReitegroComponent } from './Imprimir_Consultas/print-consulta-reitegro/print-consulta-reitegro.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPacienteComponent,
    AddPacienteComponent,
    EditPacienteComponent,
    ListConsultaComponent,
    AddConsultaComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    EditConsultaComponent,
    ListPacientesparaconsultaComponent,
    AddConsultaPreventivaComponent,
    ListConsultaPreventivaComponent,
    ListPacientesparaconsultaPreventivaComponent,
    EditConsultaPreventivaComponent,
    AddAccidenteComponent,
    ListAccidenteComponent,
    ListPacientesAccidenteComponent,
    AddExamenMedicoRetiroComponent,
    ListExamenMedicoRetiroComponent,
    AddUsuarioComponent,
    ListUsuarioComponent,
    ListPacientesparaEmrComponent,
    AddConsultaPreocupacionalComponent,
    ListConsultaPreocupacionalComponent,
    ListPacientesConsultaPreocupacionalComponent,
    ResporteConsultaMedicaComponent,
    AddFichaReitegroComponent,
    ListFichaReitegroComponent,
    ListPacientesFichaReitegroComponent,
    AddHistorialComponent,
    ListHistorialComponent,
    ListPacientesHistorialComponent,
    AddExamenInicialComponent,
    ListExamenInicialComponent,
    AddExamenMedicoInicialComponent,
    ListExamenMedicoInicialComponent,
    ListPacientesEmiComponent,
    AddCertificadoAptitudComponent,
    ListCertificadoAptitudComponent,
    ListPacientesCertificadoAptitudComponent,
    PrintConsultaPreocupacionalComponent,
    PrintConsultaPeriodicaComponent,
    PrintConsultaRetiroComponent,
    PrintConsultaReitegroComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgbModule,
    NgxPrintModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
