// Modèle de base
export interface ISiteBase {
    name: string;
    createAt: number;
    updateAt: number;
    createBy: number;
    status: number;

}
// Custome modèle pour insert
export interface ISiteCustom {
    name: string;
    createBy: number;

}
// Modèle avec id
export interface ISite extends ISiteBase {
    id: number;
}