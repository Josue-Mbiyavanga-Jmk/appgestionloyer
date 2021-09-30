// Modèle de base
export interface ILocalBase {
    name: string;
    description: string;
    type: string;
    createAt: number;
    updateAt: number;
    createBy: number;
    status: number;
    siteID: number;
    siteName: string;
}
// Custome modèle pour insert
export interface ILocaCustom {
    name: string;
    description: string;
    type: string;
    createBy: number;
    siteID: number;

}
// Modèle avec id
export interface ILocal extends ILocalBase {
    id: number;
}