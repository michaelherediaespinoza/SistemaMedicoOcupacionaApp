import { Audiometria } from "./Audiometria";
import { Consulta } from "./Consulta";
import { Diagnostico } from "./Diagnostico";
import { Electrocardiograma } from "./Electrocardiograma";
import { Espirometria } from "./Espirometria";
import { ExamenFisico } from "./ExamenFisico";
import { ExamenLaboratorio } from "./ExamenLaboratorio";
import { Paciente } from "./Paciente";
import { Radiologia } from "./Radiologia";

export class ExamenMedicoInicial extends Consulta {

    biotipo: String;
    visionCercanaOjoDerecho: String;
    distanciaOjoDerecho: String;
    visionCercanaOjoIzquierdo: String;
    distanciaOjoIzquierdo: String;
    condicionGeneral: String;    //combobox  (Buna, Mala)
    aprobado: String;   //combobox  (SI, NO)
    anamnesis: String;  //Text Area

    paciente: Paciente;
    diagnostico: Diagnostico;
    examenFisico: ExamenFisico;  //AGRREAR LAS 6 ATRIBUTOS MAS
    //electrocardiograma:Electrocardiograma;
    espirometria:Espirometria;
    examenLaboratorio: ExamenLaboratorio;
    audiometria: Audiometria;
    radiologia: Radiologia;

}