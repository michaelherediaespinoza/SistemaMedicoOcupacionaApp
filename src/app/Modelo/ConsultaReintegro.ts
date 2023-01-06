import { Consulta } from "./Consulta";
import { Audiometria } from "./Audiometria";
import { Diagnostico } from "./Diagnostico";
import { Electrocardiograma } from "./Electrocardiograma";
import { Espirometria } from "./Espirometria";
import { ExamenFisico } from "./ExamenFisico";
import { ExamenLaboratorio } from "./ExamenLaboratorio";
import { Paciente } from "./Paciente";
import { Radiologia } from "./Radiologia";

// CONSULTA REINTEGRO
export class ConsultaReintegro extends Consulta {

    biotipo: String;
    anamnesis: String;  //Text Area
    recomendacion: String;  //Text Area
    recuperacion: String;

    //  PAQUITO --------------------------------


    fechaUltimoDiaLaboral: String;
    fechaReingreso: String;
    totalDias: String;
    causaSalida: String;

    //APTITUD MEDICA PARA EL TRABAJO
        // apto, no apto = BIENE DE CONSULTA
    observacionAptitudReintegro: String 
    limitacionAptitudReintegro: String;
    reubicacionAptitudReintegro: String;

    paciente: Paciente;
   // diagnostico: Diagnostico;
    examenFisico: ExamenFisico; 

    //EEAMEN GENERAL = BIEN DE CONSULTA

    //NO TINE REVISION ACTUAL

    /*
    electrocardiograma:Electrocardiograma;
    espirometria:Espirometria;
    examenLaboratorio: ExamenLaboratorio;
    audiometria: Audiometria;
    radiologia: Radiologia;
    */


}