import { Audiometria } from "./Audiometria";
import { Consulta } from "./Consulta";
import { Diagnostico } from "./Diagnostico";
import { Electrocardiograma } from "./Electrocardiograma";
import { Espirometria } from "./Espirometria";
import { ExamenFisico } from "./ExamenFisico";
import { ExamenLaboratorio } from "./ExamenLaboratorio";
import { FactorRiesgoPuestoTrabajo } from "./FactorRiesgoPuestoTrabajo";
import { Paciente } from "./Paciente";
import { Radiologia } from "./Radiologia";
import { RevisionActual } from "./RevisionActual";

export class ConsultaPreventiva extends Consulta {

    //anamnesis:String;

    //codigo:number;

    incidentes: String;

    //APTITUD MEDICA
    observacionAptitudPeriodica: String;
    limitacionAptitudPeriodica: String;

    factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo;
    revisionActual: RevisionActual;

    // Examen General
    // Viene de PAPA CONSULTA

    paciente:Paciente;
    examenFisico:ExamenFisico;
    //diagnostico:Diagnostico;
    //diagnosticoExamenLaboratorio:Diagnostico;
    
    electrocardiograma:Electrocardiograma;
    espirometria:Espirometria;
    examenLaboratorio: ExamenLaboratorio;
    audiometria: Audiometria;
    radiologia: Radiologia;

}