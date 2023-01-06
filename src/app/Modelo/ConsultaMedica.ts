import { Consulta } from "./Consulta";
import { Diagnostico } from "./Diagnostico";
import { ExamenFisico } from "./ExamenFisico";
import { Paciente } from "./Paciente";
import { PuestoTrabajo } from "./PuestoTrabajo";


export class ConsultaMedica extends Consulta {

    //codigo:number;
    //dotEPP:String;
    //actividaLaboral:String;
    //diasReposo:number;
    //cirugiaMenor:String;
    //interConsulta:String;
    //enfermedadActual:String;
    //motivoConsulta: String;
    //enfermedadActual: String;
    diasReposo: number;

    //diagnosticos: Array<Diagnostico> = [];
    

    paciente: Paciente;
    //diagnostico: Diagnostico;
    //puestoTrabajo: PuestoTrabajo;
    examenFisico: ExamenFisico;
      


}