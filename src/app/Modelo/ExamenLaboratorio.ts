import { Diagnostico } from "./Diagnostico";
import { Heces } from "./Heces";
import { Hemograma } from "./Hemograma";
import { Orina } from "./Orina";
import { Quimico } from "./Quimico";
import { Serologia } from "./Serologia";

export class ExamenLaboratorio{

    codigo: Number;
    fecha: Date;

    //diagnostico:Diagnostico;

    hemograma:Hemograma;
    quimico: Quimico;
    serologia:Serologia;
    orina:Orina;
    heces:Heces;

    
}