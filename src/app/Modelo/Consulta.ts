import { Diagnostico } from "./Diagnostico";
import { ExamenGeneral } from "./ExamenGeneral";
import { Paciente } from "./Paciente";
import { PuestoTrabajo } from "./PuestoTrabajo";

export class Consulta {

    codigo: number;
    fecha: Date;
    peso: number;
    talla: number;
    masaCorporal: number
    estadoNutricional: String;

    pulso: number;  //FRECUENCIA CARDIACA
    presionArterial: String; // TAS/TD
    saturacionDeOxigeno: number;
    respiracion: number;
    temperatura: number;
    primeraConsultaAnio: String;
    motivoConsulta: String;    //consulta
    enfermedadActual: String;
    tratamiento: String;

    diagnosticoCie: String;
    presuntivo: String;
    definitivo: String;


    // ESTO NO VA ELIMINAR

    condicionDental:String
    protesis:String
    capacidadVisual:String;
    correccion:String;
    capacidadAuditiva:String
    tipoConsulta:String;
    tipoBeneficiario:string;
    numReceta:number;

    examenGeneral: Array<ExamenGeneral> = [];

    
    apto: String;
    aptoObservacion: String;
    aptoLimitacion: String;
    noApto: String;



}