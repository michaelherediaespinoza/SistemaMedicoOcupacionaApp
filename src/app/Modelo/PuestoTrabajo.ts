import { Consulta } from "./Consulta";
import { ConsultaMedica } from "./ConsultaMedica";

export class PuestoTrabajo {

    id: number;
    tipoDeCambio: String;
    diasDeCambio: number;
    puestoSugerido: String;
    condicionGeneral: String;
    resultado: String;
    valoracion: String;
    consultaMedica: ConsultaMedica;


}
