import { Paciente } from "./Paciente";

export class Accidente {

    codigo: Number;
    fechaAccidente: Date;
    horaAccidente: String;
    fechaAtencion: Date;
    horaAtencion: String;
    regionAfectada: String;
    parteAfectada: String;
    naturalezaLesion: String;
    reincidente: String;    // combox
    diasIncapacidad: number;
    enviadoA: String;   // combox
    escala: number;
    tipoAccidente: String; // combox
    gradoAccidente: String;
    medicoAtiende: String;
    supervisor: String;
    observacionesMedicas: String; //TEXT aREA
    observacionesAccidente: String;  // Text Area


    //Detalle Seguridad Integral    (TAP)

    defectosMaquinaEquipo: String;  // combox (SI, NO)
    fallosHumanos: String;  // combox (SI, NO)
    cumplido: String;     // combox (SI, NO)
    objetoInvolucrado: String;      // Text Area
    descripcionAccidente: String;   // Text Area
    accionesCorrectivas: String;    // Text Area

    paciente: Paciente;




}