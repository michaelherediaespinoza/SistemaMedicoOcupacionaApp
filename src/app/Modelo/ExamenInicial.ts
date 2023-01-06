import { Paciente } from "./Paciente";

export class ExamenInicial{

    codigo: Number;
    peso:number;
    talla:number;
    masaCorporal:number
    estadoNutricional:String;
    condicionDental:String
    protesis:String
    capacidadVisual:String;
    correccion:String;
    capacidadAuditiva:String

    paciente: Paciente;
}