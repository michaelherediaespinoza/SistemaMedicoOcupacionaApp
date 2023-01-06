import { Audiometria } from "./Audiometria";
import { Consulta } from "./Consulta";
import { Diagnostico } from "./Diagnostico";
import { Electrocardiograma } from "./Electrocardiograma";
import { Espirometria } from "./Espirometria";
import { ExamenFisico } from "./ExamenFisico";
import { ExamenLaboratorio } from "./ExamenLaboratorio";
import { Paciente } from "./Paciente";
import { Radiologia } from "./Radiologia";


//CONSULTA POSTOCUPACIONLA RETIRO
export class ExamenMedicoRetiro extends Consulta {

    
    biotipo: String;
    visionCercanaOjoDerecho: String;
    distanciaOjoDerecho: String;
    visionCercanaOjoIzquierdo: String;
    distanciaOjoIzquierdo: String;
    anamnesis: String;  //Text Area


    // PAQUITO ---------------------------------------------

    //va lado del paciente
    fechaIngresoLabores: String;
    fechaSalida: String;
    tiempoRetiroMeses: String;

    puestoTrabajoRetiro: String;
    actividadRetiro: String;
    riesgoRetiro: String;

    //Evaluacion medica Retiro
    evaluacionMedicaRetiro: String;  //COMBOBOX     SI O NO
    observacionesRetiro: String;

    paciente: Paciente;
    //diagnostico: Diagnostico;
    examenFisico: ExamenFisico;

    /*
    electrocardiograma:Electrocardiograma;
    espirometria:Espirometria;
    examenLaboratorio: ExamenLaboratorio;
    audiometria: Audiometria;
    radiologia: Radiologia;
    */
    

}