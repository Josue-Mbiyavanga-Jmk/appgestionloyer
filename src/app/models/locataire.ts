// Modèle de base
export interface ILocataireBase {
    prenom: string;
    nom: string;
    sexe: string;
    telephone: string;
    email: string;
    description: string;
    createAt: number;
    updateAt: number;
    createBy: number;
    status: number;
}
// Custom pour insert
export interface ILocataireCustom {
    prenom: string;
    nom: string;
    sexe: string;
    telephone: string;
    email: string;
    description: string;
    createBy: number;

}
// Modèle avec id
export interface ILocataire extends ILocataireBase {
    id: number;
}