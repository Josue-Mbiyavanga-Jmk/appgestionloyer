// Modèle de base
export interface ILocationBase {
    loyer: number;
    garantie: number;
    dureeMoisGarantie: number;
    dateDebut: number;
    dateFin: number;
    localID: number;
    localName: string;
    locataireID: number;
    locataireName: string;
    createAt: number;
    updateAt: number;
    createBy: number;
    status: number;
}
// Modèle custom pour insert
export interface ILocationCustom {
    loyer: number;
    garantie: number;
    dureeMoisGarantie: number;
    dateDebut: number;
    localID: number;
    locataireID: number;
    createBy: number;
}
// Modèle avec id
export interface ILocation extends ILocationBase {
    id: number;
}