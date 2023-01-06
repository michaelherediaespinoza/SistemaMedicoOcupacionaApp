export class Audiometria {

    codigo: Number;
    fecha: Date;

    // VALORES  TAP DE  General

    oidoDerechaA500Hz: number;
    oidoDerechaA1000Hz: number;
    oidoDerechaA2000Hz: number;
    oidoDerechaA3000Hz: number;
    oidoDerechaA4000Hz: number;

    oidoIzquierdoA500Hz: number;
    oidoIzquierdoA1000Hz: number;
    oidoIzquierdoA2000Hz: number;
    oidoIzquierdoA3000Hz: number;
    oidoIzquierdoA4000Hz: number;

    valorExposicion: number;
    horaExposicion: number;


    // VALORES  TAP DE  SAL

    valorSalOidoI: number;
    valorSalOidoD: number;
    resultadoSalI: String;
    resultadoSalD: String;


    // VALORES  TAP DE  PGA

    valorPgaOidoI: number;
    valorPgaOidoD: number;
    perdidaPgaOidoI: number;
    perdidaPgaOidoD: number
    perdidaPgaTotal: number;



    resultado: String;
    observacion: String;



    
    // VALORES  TAP DE  ELI
    
    valorEliOidoI: number;
    valorEliOidoD: number;
    resultadoEliI: String;
    resultadoEliD: String;

}