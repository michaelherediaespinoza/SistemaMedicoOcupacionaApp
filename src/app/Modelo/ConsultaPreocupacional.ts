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

export class ConsultaPreocupacional extends Consulta {

    //visionCercanaOjoDerecho: String;
    //distanciaOjoDerecho: String;
    //visionCercanaOjoIzquierdo: String;
    //distanciaOjoIzquierdo: String;
    //observacion: String;  //Text Area
    //condicionGeneral: String;    //combobox  (Buna, Mala)
    //biotipo: String;
    //aprobado: String;   //combobox  (SI, NO)

    

    actividadExtraLaboral: String;

    
    observacion: String;    //Text Area
    limitacion: String;


    factorRiesgoPuestoTrabajo: FactorRiesgoPuestoTrabajo;
    revisionActual: RevisionActual;
    
    paciente: Paciente;
    diagnostico: Diagnostico;
    examenFisico: ExamenFisico;
    electrocardiograma: Electrocardiograma;
    espirometria: Espirometria;
    examenLaboratorio: ExamenLaboratorio;
    audiometria: Audiometria;
    radiologia: Radiologia;

}