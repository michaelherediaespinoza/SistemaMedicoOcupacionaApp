import { AntecedenteTrabajo } from "./antecedenteTrabajo";
import { Paciente } from "./Paciente";

export class Historial {

    //ANTECEDENTES PERSONALES Y FAMILIARES
    fuma: String;
    bebe: String;
    observacion: String;
    antecedenteOcupacional: String;    //txtArea
    alergia: String;                   //txtArea
    enfermedadCronica: String;          //txtArea
    hospitalizacion: String;    //txtArea
    intervencion: String;     //txtArea



    // --------------------------PAQUITO-----------------------------------------------

    codigo: number;

    antecedentePersonal: String;
    antecedenteFamiliar: String;     //txtArea

    //antecedenteTrabajo: Array<AntecedenteTrabajo>;
    antecedenteTrabajo: Array<AntecedenteTrabajo> = [];
    paciente: Paciente;

    //ANTECEDENTES GINECO OBSTETRICOS
    menarquia: number;
    ciclos: String;
    fum: String;
    gesta: number;
    para: number;
    cesarea: number;
    ab: number;
    hv: number;
    hm: number;


    vidaSexualActiva: String;
    planificacionFamiliar: String;
    tipoMetodo: String;

    //papnicolao
    pap: String;
    tiempoPap: String;
    resultadoPap: String;


    colposcopia: String;
    tiempoColposcopia: String;
    resultadoColposcopia: String;


    ecoMamario: String;
    tiempoEcoMamario: String;
    resultadoEcoMamario: String;


    mamografia: String;
    tiempoMamografia: String;
    resultadoMamografia: String;

    //ANTECEDENTES REPORDUCTIVOS MASCULINOS
    antigenoProstatico: String;
    tiempoAntigenoProstatico: String;
    resultadoAntigenoProstatico: String;

    ecoProstatico: String;
    tiempoEcoProstatico: String;
    resultadoEcoProstatico: String;


    //HABITOS TOXICOS
    tabaco: String;
    tabaco_TiempoMeses: String;
    tabaco_Cantidad: number;
    tabaco_ExConsumidor: String;
    tabaco_TiempoAbstinenciaMeses: String;

    alcohol: String;
    alcohol_tiempoMeses: String;
    alcohol_Cantidad: number;
    alcohol_ExConsumidor: String;
    alcohol_TiempoAbstinenciaMeses: String;
    
    drogas: String; 
    drogas_tiempoMeses: String;
    drogas_Cantidad: number;
    drogas_ExConsumidor: String;
    drogas_TiempoAbstinenciaMeses: String;



    //ESTILO DE VIDA

    actividadFisica: String;
    descripcionActividad: String;
    tiempoActividad: String;
    //cantidadActividad: String;

    medicacionHabitual: String;
    descripcionMedicacion: String;
    tiempoMedicacion: String;
    //cantidadMedicacion: number;


    // ANRENCEDENTE TRABAJO

    accidenteTrabajoCalificadoPorIess: String;
    accidenteEspecificar: String;
    accidenteTrabajoFechaCalificado: String;
    observacionesAccidente: String;

    enfermedadProfesionalCalificadoPorIess: String;
    enfermedadEspecificar: String;
    enferemedadProfesionalFechaCalificado: String;
    enfermedadProfesionalObservaciones: String;


}