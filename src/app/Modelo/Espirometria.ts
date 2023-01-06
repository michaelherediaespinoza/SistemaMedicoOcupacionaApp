export class Espirometria{

    codigo: Number;
    fecha: Date;
    fvc: Number;
    fev1: Number;
    relacionFV1_FVC: Number;
    resultadoFVC: String; // NORMAL = 100, RESTRICTIVO mayor a 50 menor a 100, OBSTRUCTIVO = 0 - 50  
    resultadoFEV: String;
    resultado: String;
    observaciones: String; //textArea

}